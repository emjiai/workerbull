import React from 'react'
import Link from 'next/link'

export const metadata = {
  title: 'Affiliate Terms | AI Startup Launch',
  description: 'Terms and conditions for participating in the AI Startup Launch affiliate program.',
}

export default function AffiliateTermsPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl text-gray-800">
      <h1 className="text-3xl font-bold mb-6">Affiliate Program Terms &amp; Conditions</h1>

      <p className="mb-4">Thank you for your interest in becoming an affiliate for AI Startup Launch. These Terms &amp; Conditions ("Terms") govern your participation in our affiliate program ("Program"). By joining the Program, you agree to comply with and be bound by the Terms below.</p>

      <h2 className="text-xl font-semibold mt-8 mb-2">1. Enrollment &amp; Approval</h2>
      <ul className="list-disc pl-6 space-y-2">
        <li>Submit an Affiliate Request through our website. We review each application and may approve or reject it at our sole discretion.</li>
        <li>Once approved, you will receive a unique coupon code that provides your audience with a <strong>10% discount</strong> on all courses and consultation bookings.</li>
      </ul>

      <h2 className="text-xl font-semibold mt-8 mb-2">2. Commission</h2>
      <ul className="list-disc pl-6 space-y-2">
        <li>You earn a <strong>20% commission</strong> on the net revenue of every qualifying purchase made with your coupon code.</li>
        <li>Commissions are calculated on the order subtotal after discounts and before taxes or fees.</li>
      </ul>

      <h2 className="text-xl font-semibold mt-8 mb-2">3. Tracking &amp; Attribution</h2>
      <ul className="list-disc pl-6 space-y-2">
        <li>Sales are attributed to you when customers use your unique coupon code during checkout.</li>
        <li>Only purchases completed with the code qualify for commissions; referrals without the code are not tracked.</li>
      </ul>

      <h2 className="text-xl font-semibold mt-8 mb-2">4. Payouts</h2>
      <ul className="list-disc pl-6 space-y-2">
        <li>Commission payments are processed monthly, within 15 days after the end of each calendar month.</li>
        <li>Payouts are made via PayPal or bank transfer once your outstanding balance reaches USD 50.</li>
      </ul>

      <h2 className="text-xl font-semibold mt-8 mb-2">5. Prohibited Activities</h2>
      <ul className="list-disc pl-6 space-y-2">
        <li>No spamming, misleading claims, or unethical marketing practices.</li>
        <li>You may not purchase products through your own coupon code for personal use.</li>
        <li>Paid search bidding on our branded keywords is not allowed without written permission.</li>
      </ul>

      <h2 className="text-xl font-semibold mt-8 mb-2">6. Termination</h2>
      <p className="mb-4">We reserve the right to suspend or terminate your participation at any time for breach of these Terms or for activity that we deem harmful to our brand.</p>

      <h2 className="text-xl font-semibold mt-8 mb-2">7. Modification</h2>
      <p className="mb-4">We may update these Terms occasionally. Continued participation after any changes constitutes acceptance of the revised Terms.</p>

      <p className="mt-8">Questions? Contact us at <Link href="mailto:info@soosbuilder.com" className="text-purple-600 hover:underline">affiliates@soosbuilder.com</Link>.</p>
    </div>
  )
}