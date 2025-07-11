import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import dbConnect from '@/lib/mongodb'
import Page, { IPage } from '@/models/Page'
import AnimatedWrapper from '@/components/ui/AnimatedWrapper'

interface PageProps {
  params: { slug: string }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  await dbConnect()
  const page = await Page.findOne({ slug: params.slug, isPublished: true }).lean<IPage>()

  if (!page) {
    return {
      title: 'Page Not Found',
    }
  }

  return {
    title: page.title,
    description: page.metaDescription || `Read about ${page.title}`,
  }
}

async function getPage(slug: string): Promise<IPage | null> {
  await dbConnect()
  const page = await Page.findOne({ slug, isPublished: true }).lean<IPage>()
  return page
}

export default async function DynamicPage({ params }: PageProps) {
  const page = await getPage(params.slug)

  if (!page) {
    notFound()
  }

  return (
    <div className="min-h-screen py-20 bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <div className="container mx-auto px-4">
        <article className="max-w-4xl mx-auto">
          <AnimatedWrapper className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-8 gradient-text">
              {page.title}
            </h1>
            
            <div 
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: page.content }}
            />

            {page.updatedAt && (
              <div className="mt-12 pt-8 border-t border-gray-200">
                <p className="text-sm text-gray-500">
                  Last updated: {new Date(page.updatedAt).toLocaleDateString()}
                </p>
              </div>
            )}
          </AnimatedWrapper>
        </article>
      </div>
    </div>
  )
}