import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import Registration from '@/models/Registration'
import { stripe, formatAmountForStripe } from '@/lib/stripe'
import { validateEmail, validatePhone, getNextCourseStartDate } from '@/lib/utils'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, coupon } = body

    // Validation
    if (!name || !email || !phone) {
      return NextResponse.json(
        { error: 'All fields are required' },
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

    await dbConnect()

    // Create registration record
    const courseStartDate = getNextCourseStartDate()
    let amount = 497 // Course price in dollars
    if (coupon) {
      amount = Math.round(amount * 0.9) // 10% discount
    }

    const registration = await Registration.create({
      name,
      email: email.toLowerCase(),
      phone,
      amount,
      courseStartDate,
      paymentStatus: 'pending',
      coupon,
    })

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Generative AI in the Workplace - Course',
              description: '4-week intensive program with lifetime access',
              images: [`${process.env.NEXT_PUBLIC_APP_URL}/course-image.png`],
            },
            unit_amount: formatAmountForStripe(amount),
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/register`,
      customer_email: email,
      metadata: {
        registrationId: registration._id.toString(),
        type: 'course_registration',
        coupon: coupon || '',
      },
    })

    // Update registration with Stripe session ID
    registration.stripePaymentId = session.id
    await registration.save()

    return NextResponse.json({
      success: true,
      sessionId: session.id,
      registrationId: registration._id,
    })
  } catch (error) {
    console.error('Registration error:', error)
    return NextResponse.json(
      { error: 'Failed to process registration' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    // Simple auth check for admin
    const authHeader = request.headers.get('authorization')
    if (authHeader !== `Bearer ${process.env.ADMIN_PASSWORD}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    await dbConnect()

    const registrations = await Registration.find({})
      .sort({ createdAt: -1 })
      .limit(100)

    const stats = {
      total: await Registration.countDocuments(),
      completed: await Registration.countDocuments({ paymentStatus: 'completed' }),
      pending: await Registration.countDocuments({ paymentStatus: 'pending' }),
      totalRevenue: await Registration.aggregate([
        { $match: { paymentStatus: 'completed' } },
        { $group: { _id: null, total: { $sum: '$amount' } } },
      ]).then(result => result[0]?.total || 0),
    }

    return NextResponse.json({
      success: true,
      stats,
      data: registrations,
    })
  } catch (error) {
    console.error('Registration fetch error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch registrations' },
      { status: 500 }
    )
  }
}