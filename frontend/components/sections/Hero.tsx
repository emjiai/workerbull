'use client'
import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Sparkles, Zap, Rocket, Brain, Target, TrendingUp } from 'lucide-react'
import { getNextCourseStartDate } from '@/lib/utils'

export default function Hero() {
  const formattedDate = React.useMemo(() => {
    const d = getNextCourseStartDate()
    return d.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    })
  }, [])

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#E8EAE7] via-[#F5F6F8] to-[#C1C8DF]">
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]"></div>
      </div>

      {/* Floating Elements */}
      <motion.div
        animate={{
          y: [0, -20, 0],
          rotate: [0, 10, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-20 left-10 text-purple-500 opacity-20"
      >
        <Sparkles size={60} />
      </motion.div>

      <motion.div
        animate={{
          y: [0, 20, 0],
          rotate: [0, -10, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute bottom-20 right-10 text-pink-500 opacity-20"
      >
        <Rocket size={80} />
      </motion.div>

      <motion.div
        animate={{
          x: [0, 30, 0],
          y: [0, -10, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-1/2 right-20 text-blue-500 opacity-20"
      >
        <Brain size={70} />
      </motion.div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 bg-purple-100 text-black-700 px-4 py-2 rounded-full text-sm font-medium mb-6"
          >
            <Zap size={16} />
            <span>Limited Early Bird Offer - 50% OFF</span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-5xl md:text-7xl font-bold mb-6"
          >
            Integrate Generative AI{' '}
            <span className="bg-gradient-to-r from-[#28264C] via-[#4E5174] to-[#A40033] bg-clip-text text-transparent">
              10x Faster
            </span>{' '}
            in Your Business
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed"
          >
            Learn how to build and integrate generative AI tools to automate tasks, improve workflows, and boost productivity in your business.
          </motion.p>

          {/* Feature Pills */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
            className="flex flex-wrap justify-center gap-3 mb-8"
          >
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm">
              <Target size={16} className="text-purple-600" />
              <span className="text-sm font-medium">Build AI Applications</span>
            </div>
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm">
              <TrendingUp size={16} className="text-pink-600" />
              <span className="text-sm font-medium">Automate Workflows</span>
            </div>
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm">
              <Brain size={16} className="text-purple-600" />
              <span className="text-sm font-medium">Learn with Case Studies</span>
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link
              href="/register"
              className="group bg-gradient-to-r from-[#28264C] via-[#4E5174] to-[#A40033] text-white px-8 py-4 rounded-full font-semibold text-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 transform hover:scale-105"
            >
              Enroll Now - Save $500
              <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
            </Link>
            <Link
              href="/curriculum"
              className="bg-white text-gray-700 px-8 py-4 rounded-full font-semibold text-lg border-2 border-gray-200 hover:border-purple-300 hover:shadow-lg transition-all duration-300"
            >
              View Curriculum
            </Link>
            <Link
              href="/register"
              className="bg-purple-100 text-black-700 px-8 py-4 rounded-full font-semibold text-lg border-2 border-purple-200 hover:bg-purple-200 hover:shadow-lg transition-all duration-300"
            >
              Start Date: {formattedDate}
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="grid grid-cols-3 gap-8 mt-16 max-w-2xl mx-auto"
          >
            <motion.div 
              className="text-center"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="text-3xl md:text-4xl font-bold text-black-600">10+</div>
              <div className="text-gray-600 mt-1">Organizations Trained</div>
            </motion.div>
            <motion.div 
              className="text-center"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="text-3xl md:text-4xl font-bold text-black-600">4</div>
              <div className="text-gray-600 mt-1">Weeks Program</div>
            </motion.div>
            <motion.div 
              className="text-center"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="text-3xl md:text-4xl font-bold text-green-600">95%</div>
              <div className="text-gray-600 mt-1">Success Rate</div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}