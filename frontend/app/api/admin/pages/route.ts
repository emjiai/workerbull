import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import Page from '@/models/Page'

// Simple auth middleware
const isAuthenticated = (request: NextRequest) => {
  const authHeader = request.headers.get('authorization')
  return authHeader === `Bearer ${process.env.ADMIN_PASSWORD}`
}

export async function GET(request: NextRequest) {
  if (!isAuthenticated(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    await dbConnect()
    const pages = await Page.find({}).sort({ updatedAt: -1 })
    
    return NextResponse.json({
      success: true,
      pages,
    })
  } catch (error) {
    console.error('Pages fetch error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch pages' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  if (!isAuthenticated(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await request.json()
    const { title, slug, content, metaDescription, isPublished } = body

    if (!title || !slug || !content) {
      return NextResponse.json(
        { error: 'Title, slug, and content are required' },
        { status: 400 }
      )
    }

    await dbConnect()

    // Check if slug already exists
    const existingPage = await Page.findOne({ slug })
    if (existingPage) {
      return NextResponse.json(
        { error: 'A page with this slug already exists' },
        { status: 400 }
      )
    }

    const page = await Page.create({
      title,
      slug,
      content,
      metaDescription,
      isPublished,
      lastEditedBy: 'Admin',
    })

    return NextResponse.json({
      success: true,
      page,
    })
  } catch (error) {
    console.error('Page creation error:', error)
    return NextResponse.json(
      { error: 'Failed to create page' },
      { status: 500 }
    )
  }
}