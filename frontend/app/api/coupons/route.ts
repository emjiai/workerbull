import { NextRequest, NextResponse } from 'next/server'
import Coupon from '@/models/Coupon'
import dbConnect from '@/lib/mongodb'
import { sendEmail } from '@/lib/email'

export async function GET(_req: NextRequest) {
  try {
    await dbConnect()
    const coupons = await Coupon.find({}).select('owner_id firstName lastName email coupon discount createdAt')
    return NextResponse.json({ success: true, data: coupons })
  } catch (error) {
    console.error('Fetch coupons error:', error)
    return NextResponse.json({ error: 'Failed to fetch coupons' }, { status: 500 })
  }
}

function generateCode() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  let code = ''
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return code
}

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization')
    if (authHeader !== `Bearer ${process.env.ADMIN_PASSWORD}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { owner_id, firstName, lastName, email, coupon, discount } = body

    if (!owner_id || !firstName || !lastName || !email || !discount) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 })
    }

    if (discount <= 0 || discount > 100) {
      return NextResponse.json({ error: 'Invalid discount value' }, { status: 400 })
    }

    await dbConnect()

    let finalCode = coupon ? coupon.toUpperCase() : generateCode()

    // ensure uniqueness
    while (await Coupon.findOne({ coupon: finalCode })) {
      finalCode = generateCode()
    }

    const newCoupon = await Coupon.create({
      owner_id,
      firstName,
      lastName,
      email,
      coupon: finalCode,
      discount,
    })

    // send confirmation email
    const template = {
      subject: `🎉 Your Coupon Code: ${finalCode}`,
      html: `<p>Hi ${firstName},</p><p>Your affiliate coupon code <strong>${finalCode}</strong> is now active with a ${discount}% discount.</p><p>Share it with your network!</p><p>Thanks,<br/>WorkerBull Team</p>`,
    }
    await sendEmail({ to: email, subject: template.subject, html: template.html })

    return NextResponse.json({ success: true, data: newCoupon })
  } catch (error) {
    console.error('Create coupon error:', error)
    return NextResponse.json({ error: 'Failed to create coupon' }, { status: 500 })
  }
}
