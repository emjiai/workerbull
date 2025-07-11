import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import Page from '@/models/Page'

// Simple auth middleware
const isAuthenticated = (request: NextRequest) => {
  const authHeader = request.headers.get('authorization')
  return authHeader === `Bearer ${process.env.ADMIN_PASSWORD}`
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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

    // Check if slug already exists (excluding current page)
    const existingPage = await Page.findOne({ 
      slug, 
      _id: { $ne: params.id } 
    })
    
    if (existingPage) {
      return NextResponse.json(
        { error: 'A page with this slug already exists' },
        { status: 400 }
      )
    }

    const page = await Page.findByIdAndUpdate(
      params.id,
      {
        title,
        slug,
        content,
        metaDescription,
        isPublished,
        lastEditedBy: 'Admin',
      },
      { new: true }
    )

    if (!page) {
      return NextResponse.json(
        { error: 'Page not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      page,
    })
  } catch (error) {
    console.error('Page update error:', error)
    return NextResponse.json(
      { error: 'Failed to update page' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  if (!isAuthenticated(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    await dbConnect()

    const page = await Page.findByIdAndDelete(params.id)

    if (!page) {
      return NextResponse.json(
        { error: 'Page not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Page deleted successfully',
    })
  } catch (error) {
    console.error('Page deletion error:', error)
    return NextResponse.json(
      { error: 'Failed to delete page' },
      { status: 500 }
    )
  }
}