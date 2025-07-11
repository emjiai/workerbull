'use client'
import React, { useMemo } from 'react'
import { motion } from 'framer-motion'
import { getNextCourseStartDate } from '@/lib/utils'
import Link from 'next/link'
import { ArrowRight, Clock, Users, Zap } from 'lucide-react'
import { useState, useEffect } from 'react'


export default function CTA() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    // Set offer end date (7 days from now)
    const offerEndDate = new Date()
    offerEndDate.setDate(offerEndDate.getDate() + 7)

    const timer = setInterval(() => {
      const now = new Date().getTime()
      const distance = offerEndDate.getTime() - now

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        })
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const nextStart = useMemo(() => {
    const date = getNextCourseStartDate()
    return date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    })
  }, [])

  return (
    <section className="py-20 bg-gradient-to-r from-purple-600 to-pink-600 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-grid-pattern"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto"
        >
          <motion.div
            initial={{ scale: 0.9 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6"
          >
            <Zap size={16} />
            <span className="font-medium">Limited Time Offer</span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Launch Your AI-Powered Startup?
          </h2>
          
          <p className="text-xl mb-4 text-white/90">
            Join 100+ entrepreneurs who are building and scaling their startups 10x faster with AI
          </p>

          <p className="text-xl md:text-2xl mb-8 text-white/90">
            Next cohort starts on <span className="font-semibold">{nextStart}</span>
          </p>

          {/* Countdown Timer */}
          <div className="grid grid-cols-4 gap-4 max-w-md mx-auto mb-8">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white/10 backdrop-blur-sm rounded-lg p-4"
            >
              <div className="text-3xl font-bold">{timeLeft.days}</div>
              <div className="text-sm">Days</div>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white/10 backdrop-blur-sm rounded-lg p-4"
            >
              <div className="text-3xl font-bold">{timeLeft.hours}</div>
              <div className="text-sm">Hours</div>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white/10 backdrop-blur-sm rounded-lg p-4"
            >
              <div className="text-3xl font-bold">{timeLeft.minutes}</div>
              <div className="text-sm">Minutes</div>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white/10 backdrop-blur-sm rounded-lg p-4"
            >
              <div className="text-3xl font-bold">{timeLeft.seconds}</div>
              <div className="text-sm">Seconds</div>
            </motion.div>
          </div>

          {/* Price */}
          <div className="mb-8">
            <div className="text-2xl mb-2">
              <span className="line-through text-white/60">$997</span>
              <span className="text-5xl font-bold ml-4">$497</span>
            </div>
            <p className="text-white/80">Save $500 with Early Bird Pricing</p>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <Link
              href="/register"
              className="group bg-white text-purple-600 px-8 py-4 rounded-full font-semibold text-lg hover:shadow-2xl transition-all duration-300 flex items-center gap-2 transform hover:scale-105"
            >
              Secure Your Spot Now
              <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
            </Link>
            <Link
              href="/book"
              className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white/10 transition-all duration-300"
            >
              Book Free Consultation
            </Link>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <Clock size={18} />
              <span>Limited Spots Available</span>
            </div>
            <div className="flex items-center gap-2">
              <Users size={18} />
              <span>Only 10 Seats Left</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}