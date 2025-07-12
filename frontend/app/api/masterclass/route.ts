import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import MasterclassRegistration from '@/models/MasterclassRegistration'
import { stripe, formatAmountForStripe } from '@/lib/stripe'
import { validateEmail, validatePhone, getNextMasterclassDate } from '@/lib/utils'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, coupon } = body

    if (!name || !email || !phone) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 })
    }
    if (!validateEmail(email)) {
      return NextResponse.json({ error: 'Invalid email format' }, { status: 400 })
    }
    if (!validatePhone(phone)) {
      return NextResponse.json({ error: 'Invalid phone number format' }, { status: 400 })
    }

    await dbConnect()

    const masterclassDate = getNextMasterclassDate()
    let amount = 750 // USD
    if (coupon) {
      amount = Math.round(amount * 0.9)
    }

    const registration = await MasterclassRegistration.create({
      name,
      email: email.toLowerCase(),
      phone,
      amount,
      masterclassDate,
      paymentStatus: 'pending',
      coupon,
    })

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'One-Day Masterclass',
              description: '6-hour live session held on the first Saturday of each month',
              images: [`${process.env.NEXT_PUBLIC_APP_URL}/masterclass.png`],
            },
            unit_amount: formatAmountForStripe(amount),
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/masterclass/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/masterclass`,
      customer_email: email,
      metadata: {
        registrationId: registration._id.toString(),
        type: 'masterclass_registration',
        coupon: coupon || '',
      },
    })

    registration.stripePaymentId = session.id
    await registration.save()

    return NextResponse.json({ success: true, sessionId: session.id, registrationId: registration._id })
  } catch (error) {
    console.error('Masterclass registration error:', error)
    return NextResponse.json({ error: 'Failed to process registration' }, { status: 500 })
  }
}

// Admin fetch
export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization')
    if (authHeader !== `Bearer ${process.env.ADMIN_PASSWORD}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    await dbConnect()

    const registrations = await MasterclassRegistration.find({}).sort({ createdAt: -1 }).limit(100)

    const stats = {
      total: await MasterclassRegistration.countDocuments(),
      completed: await MasterclassRegistration.countDocuments({ paymentStatus: 'completed' }),
      pending: await MasterclassRegistration.countDocuments({ paymentStatus: 'pending' }),
      totalRevenue: await MasterclassRegistration.aggregate([
        { $match: { paymentStatus: 'completed' } },
        { $group: { _id: null, total: { $sum: '$amount' } } },
      ]).then(r => r[0]?.total || 0),
    }

    return NextResponse.json({ success: true, stats, data: registrations })
  } catch (error) {
    console.error('Masterclass fetch error:', error)
    return NextResponse.json({ error: 'Failed to fetch registrations' }, { status: 500 })
  }
}
