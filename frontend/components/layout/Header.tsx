'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import MobileMenu from './MobileMenu'
import AffiliateModal from './AffiliateModal'
import { motion } from 'framer-motion'
import React from 'react'
import Image from 'next/image'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [showAffiliate, setShowAffiliate] = useState(false)

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/curriculum', label: 'Curriculum' },
    { href: '/register', label: 'Register' },
    { href: '/book', label: 'Consultation' },
    { href: '/masterclass', label: 'One Day Masterclass' },
  ]

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
            >
              <Image
                src="/workerbulllogo.png"
                alt="WorkerBull logo"
                width={132}
                height={132}
                priority
              />
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-gray-700 hover:text-purple-600 transition-colors font-medium relative group"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-600 transition-all group-hover:w-full"></span>
              </Link>
            ))}
            <button
              onClick={() => setShowAffiliate(true)}
              className="text-gray-700 hover:text-purple-600 transition-colors font-medium"
            >
              Become an Affiliate
            </button>
            <Link
              href="/waitlist"
              className="bg-gradient-to-r from-[#28264C] via-[#4E5174] to-[#A40033] text-white px-6 py-2 rounded-full hover:shadow-lg transition-all duration-300 transform hover:scale-105"
            >
              Join Waitlist
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <MobileMenu 
        isOpen={isMenuOpen} 
        onClose={() => setIsMenuOpen(false)} 
        onAffiliate={() => setShowAffiliate(true)}
        navItems={navItems} 
      />

      {showAffiliate && <AffiliateModal onClose={() => setShowAffiliate(false)} />}
    </header>
  )
}