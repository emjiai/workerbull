'use client'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import React from 'react'

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
  navItems: Array<{ href: string; label: string }> 
  onAffiliate: () => void
}

export default function MobileMenu({ isOpen, onClose, navItems, onAffiliate }: MobileMenuProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 md:hidden"
            style={{ zIndex: 9998 }}
          />
          
          {/* Menu - Maximum isolation and z-index */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed right-0 top-0 h-full w-64 md:hidden"
            style={{ 
              zIndex: 9999,
              backgroundColor: 'transparent',
              boxShadow: '-4px 0 6px rgba(0, 0, 0, 0.1)',
              backdropFilter: 'none',
              WebkitBackdropFilter: 'none',
              isolation: 'isolate',
              position: 'fixed',
              transform: 'translateZ(0)'
            }}
          >
            {/* Content layer */}
            <div 
              className="relative h-full pt-14 pb-6" 
              style={{ 
                backgroundColor: 'transparent',
                zIndex: 2
              }}
            >
              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 rounded-lg bg-white hover:bg-gray-100 transition-colors shadow"
              >
                <svg 
                  className="w-6 h-6" 
                  fill="none" 
                  stroke="#374151" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              
              <nav className="mt-8 divide-y divide-gray-200 -mx-2">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={onClose}
                    className="block py-4 px-2 font-medium w-full text-center hover:bg-purple-50 transition-colors"
                    style={{
                      backgroundColor: '#ffffff',
                      color: '#374151'
                    }}
                  >
                    {item.label}
                  </Link>
                ))}
                <Link
                  href="/waitlist"
                  onClick={onClose}
                  className="block py-4 px-2 font-medium w-full text-center hover:bg-purple-50 transition-colors"
                  style={{
                    backgroundColor: '#ffffff',
                    color: '#374151'
                  }}
                >
                  Join Waitlist
                </Link>
                <button
                  onClick={() => {
                    onAffiliate();
                    onClose();
                  }}
                  className="block py-4 px-2 font-medium w-full text-center hover:bg-purple-50 transition-colors"
                  style={{ backgroundColor: '#ffffff', color: '#374151' }}
                >
                  Become an Affiliate
                </button>
              </nav>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}