import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import Waitlist from '@/models/Waitlist'
import { sendEmail, emailTemplates } from '@/lib/email'
import { validateEmail, validatePhone } from '@/lib/utils'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, source } = body

    // Validation
    if (!name || !email) {
      return NextResponse.json(
        { error: 'Name and email are required' },
        { status: 400 }
      )
    }

    if (!validateEmail(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    if (phone && !validatePhone(phone)) {
      return NextResponse.json(
        { error: 'Invalid phone number format' },
        { status: 400 }
      )
    }

    await dbConnect()

    // Check if email already exists
    const existingEntry = await Waitlist.findOne({ email: email.toLowerCase() })
    if (existingEntry) {
      return NextResponse.json(
        { error: 'This email is already on the waitlist' },
        { status: 400 }
      )
    }

    // Create waitlist entry
    const waitlistEntry = await Waitlist.create({
      name,
      email: email.toLowerCase(),
      phone,
      source: source || 'website',
    })

    // Send confirmation email
    const emailTemplate = emailTemplates.waitlist(name)
    await sendEmail({
      to: email,
      subject: emailTemplate.subject,
      html: emailTemplate.html,
    })

    return NextResponse.json({
      success: true,
      message: 'Successfully added to waitlist',
      data: {
        id: waitlistEntry._id,
        name: waitlistEntry.name,
        email: waitlistEntry.email,
      },
    })
  } catch (error) {
    console.error('Waitlist error:', error)
    return NextResponse.json(
      { error: 'Failed to add to waitlist' },
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

    const waitlistEntries = await Waitlist.find({})
      .sort({ createdAt: -1 })
      .limit(100)

    return NextResponse.json({
      success: true,
      count: waitlistEntries.length,
      data: waitlistEntries,
    })
  } catch (error) {
    console.error('Waitlist fetch error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch waitlist' },
      { status: 500 }
    )
  }
}