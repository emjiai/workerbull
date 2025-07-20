'use client'
import Hero from '@/components/sections/Hero'
import Features from '@/components/sections/Features'
import Testimonials from '@/components/sections/Testimonials'
import CTA from '@/components/sections/CTA'
import Services from '@/components/sections/Services'

export default function Home() {
  return (
    <div className="overflow-hidden">
      <Hero />
      <Services />
      <Features />
      <Testimonials />
      <CTA />
    </div>
  )
}