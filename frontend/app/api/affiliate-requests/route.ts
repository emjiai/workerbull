import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import AffiliateRequest from '@/models/AffiliateRequest'

// Public submit
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { owner_id, firstName, lastName, email, reason } = body

    if (!owner_id || !firstName || !lastName || !email || !reason) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 })
    }

    await dbConnect()

    const newReq = await AffiliateRequest.create({
      owner_id,
      firstName,
      lastName,
      email,
      reason,
    })

    return NextResponse.json({ success: true, data: newReq })
  } catch (error) {
    console.error('Affiliate request error:', error)
    return NextResponse.json({ error: 'Failed to submit request' }, { status: 500 })
  }
}

// Admin fetch
export async function GET(request: NextRequest) {
  const authHeader = request.headers.get('authorization')
  if (authHeader !== `Bearer ${process.env.ADMIN_PASSWORD}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  try {
    await dbConnect()
    const requests = await AffiliateRequest.find({}).sort({ createdAt: -1 })
    return NextResponse.json({ success: true, data: requests })
  } catch (error) {
    console.error('Fetch affiliate requests error:', error)
    return NextResponse.json({ error: 'Failed to fetch' }, { status: 500 })
  }
}
