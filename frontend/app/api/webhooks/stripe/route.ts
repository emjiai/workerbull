import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import dbConnect from '@/lib/mongodb'
import Booking from '@/models/Booking'
import Registration from '@/models/Registration'
import MasterclassRegistration from '@/models/MasterclassRegistration'
import { sendEmail, emailTemplates } from '@/lib/email'
import { formatDateWithOrdinal, getNextMasterclassDate } from '@/lib/utils'

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET

export async function POST(request: NextRequest) {
  const body = await request.text()
  const sig = request.headers.get('stripe-signature')

  console.log('Webhook received:', {
    hasSignature: !!sig,
    hasSecret: !!endpointSecret,
    bodyLength: body.length,
    environment: process.env.NODE_ENV
  })

  if (!sig || !endpointSecret) {
    console.error('Missing stripe signature or webhook secret:', {
      signature: !!sig,
      secret: !!endpointSecret
    })
    return NextResponse.json({ error: 'Missing signature' }, { status: 400 })
  }

  let event

  try {
    event = stripe.webhooks.constructEvent(body, sig, endpointSecret)
    console.log('Webhook signature verified successfully')
  } catch (err: any) {
    console.error('Webhook signature verification failed:', {
      error: err.message,
      signature: sig?.substring(0, 20) + '...',
      secretExists: !!endpointSecret,
      secretPrefix: endpointSecret?.substring(0, 10) + '...'
    })
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  try {
    await dbConnect()

    switch (event.type) {
      case 'checkout.session.completed':
        const session = event.data.object
        
        // Check if this is a booking payment
        const booking = await Booking.findOne({ 
          stripePaymentId: session.id 
        })

        if (booking) {
          // Update payment status
          booking.paymentStatus = 'completed'
          await booking.save()

          // Send confirmation email
          const emailTemplate = emailTemplates.booking(booking.name, {
            date: booking.date.toLocaleDateString(),
            time: booking.time,
            duration: booking.duration,
            topic: booking.topic,
            type: booking.consultationType,
          })

          await sendEmail({
            to: booking.email,
            subject: emailTemplate.subject,
            html: emailTemplate.html,
          })

          console.log(`Payment completed for booking ${booking._id}`)
        } else {
          console.log('Looking for registration with session ID:', session.id)
          const registration = await Registration.findOne({ 
            stripePaymentId: session.id 
          })

          if (registration) {
            console.log('Registration found:', registration.email, registration.name)
            
            // Update payment status
            registration.paymentStatus = 'completed'
            await registration.save()
            console.log('Registration payment status updated')

            // Send confirmation email
            try {
              const emailTemplate = emailTemplates.registration(registration.name, {
                startDate: formatDateWithOrdinal(registration.courseStartDate),
                amount: registration.amount,
              })

              console.log('Sending registration email to:', registration.email)
              await sendEmail({
                to: registration.email,
                subject: emailTemplate.subject,
                html: emailTemplate.html,
              })
              console.log('Registration email sent successfully')
            } catch (emailError) {
              console.error('Failed to send registration email:', emailError)
            }

            console.log(`Payment completed for registration ${registration._id}`)
          } else {
            console.log('Looking for masterclass registration with session ID:', session.id)
            const mcRegistration = await MasterclassRegistration.findOne({ stripePaymentId: session.id })

            if (mcRegistration) {
              mcRegistration.paymentStatus = 'completed'
              await mcRegistration.save()

              try {
                const emailTemplate = emailTemplates.masterclass(mcRegistration.name, mcRegistration.masterclassDate)
                await sendEmail({
                  to: mcRegistration.email,
                  subject: emailTemplate.subject,
                  html: emailTemplate.html,
                })
              } catch (err) {
                console.error('Failed to send masterclass email:', err)
              }

              console.log(`Payment completed for masterclass registration ${mcRegistration._id}`)
            } else {
              console.error(`No booking, registration, or masterclass registration found for session ${session.id}`)
            }
          }
        }
        break

      case 'checkout.session.expired':
        const expiredSession = event.data.object
        
        // Check if this is a booking session
        const expiredBooking = await Booking.findOne({ 
          stripePaymentId: expiredSession.id 
        })

        if (expiredBooking) {
          expiredBooking.status = 'cancelled'
          expiredBooking.paymentStatus = 'pending'
          await expiredBooking.save()
          console.log(`Session expired for booking ${expiredBooking._id}`)
        } else {
          // Check if this is a registration session
          const expiredRegistration = await Registration.findOne({ 
            stripePaymentId: expiredSession.id 
          })

          if (expiredRegistration) {
            expiredRegistration.paymentStatus = 'pending'
            await expiredRegistration.save()
            console.log(`Session expired for registration ${expiredRegistration._id}`)
          }
        }
        break

      default:
        console.log(`Unhandled event type ${event.type}`)
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Error processing webhook:', error)
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    )
  }
}

export const runtime = 'nodejs'