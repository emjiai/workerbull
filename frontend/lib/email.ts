import nodemailer from 'nodemailer'
import { getNextCourseStartDate } from './utils'

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: parseInt(process.env.EMAIL_PORT || '587'),
  secure: process.env.EMAIL_PORT === '465', // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    // don't fail on invalid certs
    rejectUnauthorized: false,
    // additional options for handling certificate issues
    servername: process.env.EMAIL_HOST,
  },
  // Additional debugging options
  debug: process.env.NODE_ENV === 'development',
  logger: process.env.NODE_ENV === 'development',
})

export async function sendEmail({
  to,
  subject,
  html,
}: {
  to: string
  subject: string
  html: string
}) {
  try {
    const info = await transporter.sendMail({
      from: `"WorkerBull" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
    })
    
    console.log('Email sent:', info.messageId)
    return { success: true, messageId: info.messageId }
  } catch (error) {
    console.error('Email error:', error)
    return { success: false, error }
  }
}

export const emailTemplates = {
  waitlist: (name: string) => {
    const startDate = getNextCourseStartDate()
    const formattedDate = startDate.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    })
    return {
      subject: '🚀 Welcome to the Generative AI in the Workplace Waitlist!',
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
              <h1 style="color: #6B46C1; margin: 0;">WorkerBull</h1>
            </div>
            
            <h2 style="color: #333333; margin-bottom: 20px;">Welcome to the Waitlist, ${name}! 🎉</h2>
            
            <p style="color: #666666; line-height: 1.6; margin-bottom: 20px;">
              Thank you for joining our waitlist for <strong>"Generative AI in the Workplace"</strong>.
            </p>
            
            <p style="color: #666666; line-height: 1.6; margin-bottom: 20px;">
              You're now on the list to get exclusive early access when registration opens. As a waitlist member, you'll receive:
            </p>
            
            <ul style="color: #666666; line-height: 1.8; margin-bottom: 20px;">
              <li>🎯 <strong>40% Early Bird Discount</strong></li>
              <li>📚 Free AI Startup Toolkit (PDF)</li>
              <li>🔔 First notification when spots open</li>
              <li>💡 Weekly AI startup tips via email</li>
            </ul>
            
            <div style="background-color: #F3E8FF; padding: 20px; border-radius: 8px; margin: 30px 0;">
              <p style="color: #6B46C1; margin: 0; font-weight: bold;">
                📅 Course starts: ${formattedDate}<br>
                ⏰ Duration: 4 weeks<br>
                💰 Regular price: $997 (Your price: $597)
              </p>
            </div>
            
            <p style="color: #666666; line-height: 1.6; margin-bottom: 20px;">
              In the meantime, connect with us on social media for daily AI startup insights:
            </p>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="https://www.linkedin.com/company/theworkerbulls" style="display: inline-block; margin: 0 10px; color: #6B46C1; text-decoration: none;">LinkedIn</a>
              <a href="https://x.com/theworkerbulls" style="display: inline-block; margin: 0 10px; color: #6B46C1; text-decoration: none;">Twitter</a>
              <a href="https://www.youtube.com/@theworkerbulls" style="display: inline-block; margin: 0 10px; color: #6B46C1; text-decoration: none;">YouTube</a>
              <a href="https://www.instagram.com/theworkerbulls" style="display: inline-block; margin: 0 10px; color: #6B46C1; text-decoration: none;">Instagram</a>
            </div>
            
            <hr style="border: none; border-top: 1px solid #E5E7EB; margin: 30px 0;">
            
            <p style="color: #999999; font-size: 14px; text-align: center; margin: 0;">
              Best regards,<br>
              The WorkerBull Team<br>
              <a href="mailto:info@workerbull.comm" style="color: #6B46C1; text-decoration: none;">info@workerbull.com</a>
            </p>
          </div>
        </body>
        </html>
      `
    }
  },
  
  registration: (name: string, courseDetails: any) => ({
    subject: '✅ Registration Confirmed - Generative AI in the Workplace',
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
            <h1 style="color: #6B46C1; margin: 0;">WorkerBull</h1>
          </div>
          
          <h2 style="color: #333333; margin-bottom: 20px;">Congratulations ${name}! 🎊</h2>
          
          <p style="color: #666666; line-height: 1.6; margin-bottom: 20px;">
            Your registration for <strong>"Generative AI in the Workplace"</strong> is confirmed!
          </p>
          
          <div style="background-color: #10B981; color: white; padding: 20px; border-radius: 8px; margin: 30px 0; text-align: center;">
            <h3 style="margin: 0 0 10px 0;">Course Starts</h3>
            <p style="margin: 0; font-size: 24px; font-weight: bold;">${courseDetails.startDate}</p>
          </div>
          
          <h3 style="color: #333333; margin-top: 30px;">What's Next?</h3>
          
          <ol style="color: #666666; line-height: 1.8;">
            <li><strong>Save the date:</strong> Add ${courseDetails.startDate} to your calendar</li>
            <li><strong>Join our community:</strong> You'll receive a Slack invite 1 week before start</li>
            <li><strong>Pre-course materials:</strong> Check your email 3 days before for prep work</li>
            <li><strong>Live session link:</strong> Will be sent 24 hours before the first class</li>
          </ol>
          
          <h3 style="color: #333333; margin-top: 30px;">Course Schedule</h3>
          <ul style="color: #666666; line-height: 1.8;">
            <li>Duration: 4 Weeks</li>
            <li>Live Sessions: Tuesdays & Thursdays, 7 PM GMT</li>
            <li>Office Hours: Saturdays, 10 AM GMT</li>
            <li>All sessions are recorded for your convenience</li>
          </ul>
          
          <div style="background-color: #F3E8FF; padding: 20px; border-radius: 8px; margin: 30px 0;">
            <p style="color: #6B46C1; margin: 0;">
              <strong>Need help?</strong> Reply to this email or contact us at info@workerbull.com
            </p>
          </div>
          
          <hr style="border: none; border-top: 1px solid #E5E7EB; margin: 30px 0;">
          
          <p style="color: #999999; font-size: 14px; text-align: center; margin: 0;">
            Looking forward to seeing you in class!<br>
            The WorkerBull Team
          </p>
        </div>
      </body>
      </html>
    `
  }),
  
  masterclass: (name: string, masterclassDate: Date) => {
    const formattedDate = masterclassDate.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    })
    return {
      subject: '🎓 Your One-Day Masterclass Registration is Confirmed!',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="margin:0;padding:0;font-family:Arial,sans-serif;background-color:#f7f7f7;">
          <div style="max-width:600px;margin:0 auto;background-color:#ffffff;padding:40px;">
            <div style="text-align:center;margin-bottom:30px;">
              <h1 style="color:#6B46C1;margin:0;">WorkerBull</h1>
            </div>
            <h2 style="color:#333333;margin-bottom:20px;">Thank you for signing up, ${name}! 🎉</h2>
            <p style="color:#666666;line-height:1.6;margin-bottom:20px;">
              Your spot for the <strong>One-Day Masterclass</strong> is confirmed.
            </p>
            <div style="background-color:#F3E8FF;padding:20px;border-radius:8px;margin:30px 0;">
              <p style="color:#6B46C1;margin:0;font-weight:bold;">
                📅 Date: ${formattedDate}<br/>
                ⏰ Duration: 6 hours (10:00 AM – 4:00 PM GMT)<br/>
                💰 Amount Paid: $750
              </p>
            </div>
            <h3 style="color:#333333;">What to Expect</h3>
            <ul style="color:#666666;line-height:1.8;">
              <li>Hands-on sessions with industry experts</li>
              <li>Actionable frameworks &amp; templates</li>
              <li>Live Q&amp;A and networking</li>
            </ul>
            <p style="color:#666666;line-height:1.6;">We’ll send you the Zoom link and further details 24 hours before the event.</p>
            <hr style="border:none;border-top:1px solid #E5E7EB;margin:30px 0;" />
            <p style="color:#999999;font-size:14px;text-align:center;margin:0;">
              Need assistance? Reply to this email or contact <a href="mailto:info@workerbull.com" style="color:#6B46C1;text-decoration:none;">info@workerbull.com</a>
            </p>
          </div>
        </body>
        </html>
      `,
    }
  },
  
  booking: (name: string, bookingDetails: any) => ({
    subject: `📅 Consultation Booking Confirmed - ${bookingDetails.date}`,
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
            <h1 style="color: #6B46C1; margin: 0;">WorkerBull</h1>
          </div>
          
          <h2 style="color: #333333; margin-bottom: 20px;">Booking Confirmed, ${name}! 📅</h2>
          
          <p style="color: #666666; line-height: 1.6; margin-bottom: 20px;">
            Your ${bookingDetails.type} consultation has been successfully scheduled.
          </p>
          
          <div style="background-color: #F3E8FF; padding: 20px; border-radius: 8px; margin: 30px 0;">
            <h3 style="color: #6B46C1; margin: 0 0 15px 0;">Consultation Details</h3>
            <p style="color: #666666; margin: 5px 0;"><strong>Date:</strong> ${bookingDetails.date}</p>
            <p style="color: #666666; margin: 5px 0;"><strong>Time:</strong> ${bookingDetails.time}</p>
            <p style="color: #666666; margin: 5px 0;"><strong>Duration:</strong> ${bookingDetails.duration}</p>
            <p style="color: #666666; margin: 5px 0;"><strong>Type:</strong> ${bookingDetails.type}</p>
            <p style="color: #666666; margin: 5px 0;"><strong>Topic:</strong> ${bookingDetails.topic}</p>
          </div>
          
          <h3 style="color: #333333; margin-top: 30px;">How to Prepare</h3>
          <ul style="color: #666666; line-height: 1.8;">
            <li>Write down your key questions or challenges</li>
            <li>Have any relevant documents or data ready to share</li>
            <li>Test your camera and microphone before the call</li>
            <li>Find a quiet space with good internet connection</li>
          </ul>
          
          <div style="background-color: #FEF3C7; padding: 20px; border-radius: 8px; margin: 30px 0;">
            <p style="color: #92400E; margin: 0;">
              <strong>⏰ Important:</strong> The meeting link will be sent to this email address 1 hour before your consultation.
            </p>
          </div>
          
          <p style="color: #666666; line-height: 1.6;">
            Need to reschedule? Please let us know at least 24 hours in advance by replying to this email.
          </p>
          
          <hr style="border: none; border-top: 1px solid #E5E7EB; margin: 30px 0;">
          
          <p style="color: #999999; font-size: 14px; text-align: center; margin: 0;">
            Looking forward to speaking with you!<br>
            The WorkerBull Team<br>
            <a href="mailto:info@workerbull.com" style="color: #6B46C1; text-decoration: none;">info@workerbull.com</a>
          </p>
        </div>
      </body>
      </html>
    `
  })
}