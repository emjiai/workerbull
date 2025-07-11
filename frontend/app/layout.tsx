import type { Metadata } from 'next'
import { Outfit } from 'next/font/google'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { Toaster } from 'react-hot-toast'

const outfit = Outfit({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: 'Learn How to Use and Build Generative AI Apps for Workplace and Business',
  description: 'Master AI tools and strategies to accelerate your business growth. 6-week intensive program with expert consulting.',
  keywords: 'WorkerBull, startup course, AI tools, workplace automation, business automation',
  openGraph: {
    title: 'Learn How to Integrate and Use Generative AI Apps for Workplace and Business Automation',
    description: 'Master AI tools and strategies to accelerate your business growth.',
    images: ['/og-image.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Generative AI Apps for Workplace and Business',
    description: 'Master AI tools and strategies to accelerate your business growth',
    images: ['/og-image.png'],
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={outfit.className}>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </div>
        <Toaster 
          position="bottom-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#363636',
              color: '#fff',
            },
            success: {
              style: {
                background: '#10B981',
              },
            },
            error: {
              style: {
                background: '#EF4444',
              },
            },
          }}
        />
      </body>
    </html>
  )
}