# Launch Startup 10x Faster with AI - Course Platform

A modern, mobile-responsive Next.js application for managing and selling an AI startup course with waitlist management, paid registrations, consultation bookings, and dynamic page editing.

## Features

✨ **Core Features**
- 📱 Fully mobile-responsive design
- 📝 Waitlist management with email notifications
- 💳 Paid course registration with Stripe integration
- 📅 Free and paid consultation booking system
- 📚 6-week course curriculum display
- 📄 Dynamic page editor for custom content
- 📧 Automated email notifications
- 🔐 Simple admin authentication

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Database**: MongoDB with Mongoose
- **Payments**: Stripe
- **Email**: Nodemailer
- **Animations**: Framer Motion
- **State Management**: React Hooks
- **Type Safety**: TypeScript

## Setup Instructions

### Prerequisites

- Node.js 18+ 
- MongoDB database (local or cloud)
- Stripe account
- Email service (Gmail, SendGrid, etc.)

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd workerbull
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory:
   ```env
   # MongoDB
   MONGODB_URI=mongodb+srv://your-connection-string

   # Stripe
   STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key
   STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret

   # App URL
   NEXT_PUBLIC_APP_URL=http://localhost:3000

   # Email Configuration
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-app-specific-password

   # Admin
   ADMIN_PASSWORD=your-secure-admin-password
   NEXT_PUBLIC_ADMIN_PASSWORD=your-secure-admin-password
   ```

4. **Set up MongoDB**
   - Create a MongoDB database (Atlas or local)
   - Add the connection string to `MONGODB_URI`

5. **Set up Stripe**
   - Create a Stripe account at https://stripe.com
   - Get your API keys from the Stripe dashboard
   - Set up webhook endpoint: `https://yourdomain.com/api/webhook/stripe`
   - Add webhook events: `checkout.session.completed`, `payment_intent.payment_failed`

6. **Set up Email (Gmail example)**
   - Enable 2-factor authentication
   - Generate app-specific password
   - Add credentials to environment variables

7. **Run the development server**
   ```bash
   npm run dev
   ```

8. **Open the application**
   - Navigate to http://localhost:3000

## Project Structure

```
workerbull/
├── app/
│   ├── api/              # API routes
│   ├── admin/            # Admin pages
│   ├── book/             # Consultation booking
│   ├── curriculum/       # Course curriculum
│   ├── register/         # Course registration
│   ├── waitlist/         # Waitlist signup
│   ├── [slug]/           # Dynamic pages
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Home page
├── components/
│   ├── layout/           # Header, Footer, etc.
│   ├── sections/         # Page sections
│   ├── ui/               # Reusable UI components
│   └── forms/            # Form components
├── lib/
│   ├── mongodb.ts        # Database connection
│   ├── stripe.ts         # Stripe configuration
│   ├── email.ts          # Email service
│   └── utils.ts          # Utility functions
├── models/               # Mongoose models
├── public/               # Static assets
└── types/                # TypeScript types
```

## Usage

### Admin Access

1. Navigate to `/admin/pages`
2. Enter the admin password
3. Create and manage custom pages

### Stripe Testing

Use these test card numbers:
- Success: `4242 4242 4242 4242`
- Decline: `4000 0000 0000 0002`

### Email Templates

Email templates are defined in `lib/email.ts`. Customize them to match your brand.

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import to Vercel
3. Add environment variables
4. Deploy

### Other Platforms

The app can be deployed to any platform that supports Next.js:
- Railway
- Render
- DigitalOcean App Platform
- AWS Amplify

## API Endpoints

- `POST /api/waitlist` - Add to waitlist
- `POST /api/register` - Course registration
- `POST /api/book` - Book consultation
- `POST /api/webhook/stripe` - Stripe webhooks
- `GET/POST/PUT/DELETE /api/admin/pages` - Page management

## Customization

### Styling
- Colors: Edit Tailwind config and gradient classes
- Fonts: Update in `app/layout.tsx`
- Components: Modify files in `components/`

### Course Details
- Duration: Update in components and models
- Pricing: Change in registration components
- Curriculum: Edit `app/curriculum/page.tsx`

## Security

- Environment variables for sensitive data
- Admin authentication for page management
- Stripe webhook signature verification
- Input validation on all forms
- MongoDB connection pooling

## Support

For issues or questions:
1. Check the console for errors
2. Verify environment variables
3. Check MongoDB connection
4. Test Stripe webhook locally with Stripe CLI

## License

MIT License - feel free to use for your own projects!


## Stripe Test Cards

Use these test card numbers:
- Success: `4242 4242 4242 4242`
- Decline: `4000 0000 0000 0002`
- Processing: `4000 0000 0000 0010`
- Invalid: `4000 0000 0000 0003`

## Stripe Webhook

To test the webhook locally, use the Stripe CLI:

```bash
stripe login
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

This will forward the webhook events to your Next.js app.
