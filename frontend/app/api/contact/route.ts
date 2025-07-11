import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import ContactMessage from '@/models/ContactMessages'
import { sendEmail } from '@/lib/email'
import { validateEmail } from '@/lib/utils'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, subject, message } = body

    // Validation
    if (!name || !email || !subject || !message) {
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

    await dbConnect()

    // Save to database
    const contactMessage = await ContactMessage.create({
      name,
      email: email.toLowerCase(),
      subject,
      message,
    })

    // Send email notification to admin
    const adminEmailTemplate = {
      subject: `New Contact Form Submission: ${subject}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f7f7f7;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 40px;">
            <h2 style="color: #333333; margin-bottom: 20px;">New Contact Form Submission</h2>
            
            <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
              <p style="margin: 5px 0;"><strong>From:</strong> ${name}</p>
              <p style="margin: 5px 0;"><strong>Email:</strong> ${email}</p>
              <p style="margin: 5px 0;"><strong>Subject:</strong> ${subject}</p>
              <p style="margin: 5px 0;"><strong>Date:</strong> ${new Date().toLocaleString()}</p>
            </div>
            
            <div style="background-color: #ffffff; padding: 20px; border: 1px solid #e9ecef; border-radius: 8px;">
              <h3 style="color: #333333; margin-top: 0;">Message:</h3>
              <p style="color: #666666; line-height: 1.6; white-space: pre-wrap;">${message}</p>
            </div>
            
            <div style="margin-top: 30px; padding: 20px; background-color: #f3e8ff; border-radius: 8px;">
              <p style="margin: 0; color: #6b46c1;">
                <strong>Action Required:</strong> Please respond to this inquiry within 24 hours.
              </p>
            </div>
          </div>
        </body>
        </html>
      `
    }

    await sendEmail({
      to: 'info@soosbuilder.com',
      subject: adminEmailTemplate.subject,
      html: adminEmailTemplate.html,
    })

    // Send confirmation email to user
    const userEmailTemplate = {
      subject: 'We\'ve Received Your Message - AI Startup Launch',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f7f7f7;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 40px;">
            <div style="text-align: center; margin-bottom: 30px;">
              <h1 style="color: #6B46C1; margin: 0;">AI Startup Launch</h1>
            </div>
            
            <h2 style="color: #333333; margin-bottom: 20px;">Thank You for Reaching Out, ${name}!</h2>
            
            <p style="color: #666666; line-height: 1.6; margin-bottom: 20px;">
              We've received your message and appreciate you taking the time to contact us. Our team will review your inquiry and get back to you within 24 hours (business days).
            </p>
            
            <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #333333; margin-top: 0;">Your Message Summary:</h3>
              <p style="margin: 5px 0;"><strong>Subject:</strong> ${subject}</p>
              <p style="margin: 10px 0; color: #666666;">${message.substring(0, 200)}${message.length > 200 ? '...' : ''}</p>
            </div>
            
            <h3 style="color: #333333; margin-top: 30px;">While You Wait...</h3>
            <ul style="color: #666666; line-height: 1.8;">
              <li>Check out our <a href="${process.env.NEXT_PUBLIC_APP_URL}/faq" style="color: #6B46C1;">FAQ page</a> for instant answers</li>
              <li>Browse our <a href="${process.env.NEXT_PUBLIC_APP_URL}/curriculum" style="color: #6B46C1;">course curriculum</a></li>
              <li>Join our <a href="${process.env.NEXT_PUBLIC_APP_URL}/waitlist" style="color: #6B46C1;">waitlist</a> for exclusive updates</li>
            </ul>
            
            <hr style="border: none; border-top: 1px solid #E5E7EB; margin: 30px 0;">
            
            <p style="color: #999999; font-size: 14px; text-align: center; margin: 0;">
              Best regards,<br>
              The AI Startup Launch Team<br>
              <a href="mailto:info@soosbuilder.com" style="color: #6B46C1; text-decoration: none;">info@soosbuilder.com</a>
            </p>
          </div>
        </body>
        </html>
      `
    }

    await sendEmail({
      to: email,
      subject: userEmailTemplate.subject,
      html: userEmailTemplate.html,
    })

    return NextResponse.json({
      success: true,
      message: 'Message sent successfully',
      data: {
        id: contactMessage._id,
      },
    })
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Failed to send message' },
      { status: 500 }
    )
  }
}

// GET endpoint for admin to view messages
export async function GET(request: NextRequest) {
  try {
    // Simple auth check for admin
    const authHeader = request.headers.get('authorization')
    if (authHeader !== `Bearer ${process.env.ADMIN_PASSWORD}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    await dbConnect()

    const messages = await ContactMessage.find({})
      .sort({ createdAt: -1 })
      .limit(100)

    return NextResponse.json({
      success: true,
      count: messages.length,
      data: messages,
    })
  } catch (error) {
    console.error('Contact messages fetch error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch messages' },
      { status: 500 }
    )
  }
}