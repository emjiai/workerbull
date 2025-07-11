import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import Booking from '@/models/Booking'
import { stripe, formatAmountForStripe } from '@/lib/stripe'
import { sendEmail, emailTemplates } from '@/lib/email'
import { validateEmail, validatePhone } from '@/lib/utils'

// Simple auth middleware
const isAuthenticated = (request: NextRequest) => {
  const authHeader = request.headers.get('authorization')
  return authHeader === `Bearer ${process.env.ADMIN_PASSWORD}`
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { 
      name, 
      email, 
      phone, 
      consultationType, 
      date, 
      time, 
      duration, 
      topic, 
      description,
      coupon 
    } = body

    // Validation
    if (!name || !email || !phone || !consultationType || !date || !time || !topic) {
      return NextResponse.json(
        { error: 'All required fields must be provided' },
        { status: 400 }
      )
    }

    if (!validateEmail(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    if (!validatePhone(phone)) {
      return NextResponse.json(
        { error: 'Invalid phone number format' },
        { status: 400 }
      )
    }

    // Check if consultation type is valid
    if (!['free', 'paid'].includes(consultationType)) {
      return NextResponse.json(
        { error: 'Invalid consultation type' },
        { status: 400 }
      )
    }

    await dbConnect()

    // Check if the time slot is already booked
    const existingBooking = await Booking.findOne({
      date: new Date(date),
      time,
      status: { $in: ['scheduled', 'completed'] }
    })

    if (existingBooking) {
      return NextResponse.json(
        { error: 'This time slot is already booked' },
        { status: 400 }
      )
    }

    // Calculate amount based on consultation type and duration
    let amount = 0
    if (consultationType === 'paid') {
      const prices = {
        '30 minutes': 97,
        '60 minutes': 197,
        '90 minutes': 297,
      }
      amount = prices[duration as keyof typeof prices] || 97
      if (coupon) {
        amount = Math.round(amount * 0.9)
      }
    }

    // Create booking
    const booking = new Booking({
      name,
      email,
      phone,
      consultationType,
      date: new Date(date),
      time,
      duration,
      topic,
      description,
      coupon,
      amount,
      paymentStatus: consultationType === 'free' ? 'not_required' : 'pending',
      status: 'scheduled',
    })

    if (consultationType === 'paid') {
      // Create Stripe checkout session for paid consultations
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
          {
            price_data: {
              currency: 'usd',
              product_data: {
                name: `${duration} AI Startup Consultation`,
                description: `One-on-one consultation with our AI startup expert`,
              },
              unit_amount: formatAmountForStripe(amount),
            },
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: `${process.env.NEXT_PUBLIC_APP_URL}/booking-success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/book`,
        customer_email: email,
        metadata: {
          bookingId: booking._id.toString(),
          type: 'consultation_booking',
          coupon: coupon || '',
        },
      })

      // Update booking with Stripe session ID
      booking.stripePaymentId = session.id
      await booking.save()

      return NextResponse.json({
        success: true,
        sessionId: session.id,
        bookingId: booking._id,
      })
    } else {
      // Free consultation - save booking and send confirmation email
      await booking.save()

      // Send confirmation email
      const emailTemplate = emailTemplates.booking(name, {
        date: new Date(date).toLocaleDateString(),
        time,
        duration,
        topic,
        consultationType,
      })

      await sendEmail({
        to: email,
        subject: emailTemplate.subject,
        html: emailTemplate.html,
      })

      return NextResponse.json({
        success: true,
        message: 'Free consultation booked successfully',
        bookingId: booking._id,
      })
    }

  } catch (error) {
    console.error('Booking error:', error)
    return NextResponse.json(
      { error: 'Failed to process booking' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    // Simple auth check for admin
    if (!isAuthenticated(request)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    await dbConnect()

    const bookings = await Booking.find({})
      .sort({ createdAt: -1 })
      .limit(100)

    const stats = {
      total: await Booking.countDocuments(),
      scheduled: await Booking.countDocuments({ status: 'scheduled' }),
      completed: await Booking.countDocuments({ status: 'completed' }),
      cancelled: await Booking.countDocuments({ status: 'cancelled' }),
      revenue: await Booking.aggregate([
        { $match: { paymentStatus: 'completed' } },
        { $group: { _id: null, total: { $sum: '$amount' } } },
      ]).then(result => result[0]?.total || 0),
    }

    return NextResponse.json({
      success: true,
      stats,
      data: bookings,
    })
  } catch (error) {
    console.error('Booking fetch error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch bookings' },
      { status: 500 }
    )
  }
}