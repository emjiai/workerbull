
## Stripe Webhook

To test the webhook locally, use the Stripe CLI:

```bash
stripe login
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```
This will forward the webhook events to your Next.js app.

## Stripe Payment Setup Guide
A simple, step-by-step guide to configure Stripe payments for your AI Startup Course platform.
📋 Prerequisites

An email address for your Stripe account
Basic business information (name, address)
Bank account details (for receiving payments)


🚀 Step 1: Create Stripe Account

Go to Stripe

Visit https://stripe.com
Click "Start now" button


Sign Up

Enter your email
Create a password
Enter your business name (or your name)
Select your country


Verify Email

Check your email
Click the verification link from Stripe




🔑 Step 2: Get Your API Keys

Access Dashboard

Log into your Stripe account
You'll see the Stripe Dashboard


Find API Keys

Look at the top of the dashboard
Click "Developers" in the menu
Click "API keys" in the sidebar


Copy Your Keys
You'll see two types of keys:
Test Keys (for development):

Publishable key: pk_test_... (starts with pk_test)
Secret key: sk_test_... (starts with sk_test)

Live Keys (for real payments):

Publishable key: pk_live_... (starts with pk_live)
Secret key: sk_live_... (starts with sk_live)


Save Test Keys First
STRIPE_SECRET_KEY=sk_test_[your-test-secret-key]
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_[your-test-publishable-key]
⚠️ Important: Start with test keys for development!


🪝 Step 3: Set Up Webhooks
Webhooks let Stripe notify your app when payments complete.

Go to Webhooks

In Stripe Dashboard, click "Developers"
Click "Webhooks"
Click "Add endpoint"


Configure Endpoint
For Local Development:

Skip this for now (use Stripe CLI instead - see Step 6)

For Production:

Endpoint URL: https://yourdomain.com/api/webhook/stripe
Description: "Payment confirmations"


Select Events

Click "Select events"
Check these events:
✅ checkout.session.completed
✅ payment_intent.payment_failed
Click "Add events"


Create Webhook

Click "Add endpoint"
You'll see your webhook endpoint


Get Webhook Secret

Click on your webhook
Find "Signing secret"
Click "Reveal"
Copy the secret: whsec_...
Add to your .env.local:
STRIPE_WEBHOOK_SECRET=whsec_[your-webhook-secret]





💳 Step 4: Configure Payment Settings

Set Currency

Go to "Settings" → "Business settings"
Click "Customer emails"
Enable "Successful payments" (recommended)


Configure Checkout

Go to "Settings" → "Checkout and Payment Links"
Enable these options:
✅ Allow customers to adjust quantities
✅ Collect billing address
✅ Collect phone numbers


Set Business Details

Go to "Settings" → "Business settings"
Add your business name
Add support email
Add support phone (optional)




🧪 Step 5: Test Your Setup

Use Test Cards
Success: 4242 4242 4242 4242
Decline: 4000 0000 0000 0002

Expiry: Any future date (e.g., 12/34)
CVC: Any 3 digits (e.g., 123)
ZIP: Any 5 digits (e.g., 12345)

Make a Test Purchase

Go to your website
Try to register for the course
Use the test card above
Verify payment appears in Stripe Dashboard




💻 Step 6: Local Development with Stripe CLI
For testing webhooks locally:

Install Stripe CLI
Mac:
bashbrew install stripe/stripe-cli/stripe
Windows:
Download from https://stripe.com/docs/stripe-cli#install
Login to CLI
bashstripe login

Forward Webhooks
bashstripe listen --forward-to localhost:3000/api/webhook/stripe

Get Local Webhook Secret

The CLI will show: whsec_...
Use this for local development in .env.local




🚀 Step 7: Go Live
When ready for real payments:

Complete Business Verification

Stripe Dashboard → "Activate your account"
Provide:

Business type
Tax ID (EIN/SSN)
Bank account details
Business address




Switch to Live Keys

Get your live API keys
Update .env.local:
STRIPE_SECRET_KEY=sk_live_[your-live-secret-key]
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_[your-live-publishable-key]



Update Webhook

Create new webhook with your production URL
Get new webhook secret
Update in production environment




✅ Final Checklist
Before going live, ensure:

 Test payments work correctly
 Webhook receives events
 Customer receives confirmation email
 Payment appears in Stripe Dashboard
 Refund process tested
 Live keys are in production environment
 Production webhook is configured
 Business verification is complete


🆘 Troubleshooting
Payment not showing in dashboard?

Check if using test vs live keys
Verify webhook is receiving events
Check browser console for errors

Webhook not working?

Verify endpoint URL is correct
Check webhook secret matches
Use Stripe CLI for local testing

Getting declined cards?

Use approved test card numbers
Check if in test mode
Verify API keys match (test/live)


📞 Support

Stripe Support: https://support.stripe.com
Documentation: https://stripe.com/docs
Status Page: https://status.stripe.com


🎉 Success!
You've configured Stripe! Your platform can now:

Accept course payments ($497)
Process consultation bookings ($97-$297)
Handle refunds
Send automatic receipts

Remember to test everything thoroughly before accepting real payments!