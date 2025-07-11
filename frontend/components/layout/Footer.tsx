'use client'
import Link from 'next/link'
import { Twitter, Linkedin, Instagram, Youtube, Mail, Heart } from 'lucide-react'
import React from 'react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    course: [
      { href: '/curriculum', label: 'Curriculum' },
      { href: '/register', label: 'Register' },
      { href: '/waitlist', label: 'Join Waitlist' },
      { href: '/affiliate', label: 'Affiliate Terms' },
    ],
    support: [
      { href: '/book', label: 'Book Consultation' },
      { href: '/faq', label: 'FAQ' },
      { href: '/contact', label: 'Contact' },
      { href: '/about', label: 'About Us' },
    ],
    legal: [
      { href: '/privacy', label: 'Privacy Policy' },
      { href: '/terms', label: 'Terms of Service' },
      { href: '/refund', label: 'Refund Policy' },
    ],
  }

  const socialLinks = [
    { href: 'https://x.com/workerbulls', icon: Twitter, label: 'Twitter' },
    { href: 'https://www.linkedin.com/company/workerbulls', icon: Linkedin, label: 'LinkedIn' },
    { href: 'https://www.instagram.com/workerbulls', icon: Instagram, label: 'Instagram' },
    { href: 'https://www.youtube.com/@workerbulls', icon: Youtube, label: 'Youtube' },
    { href: 'mailto:info@workerbull.com', icon: Mail, label: 'Email' },
  ]

  return (
    <footer className="bg-gray-50 pt-16 pb-8">
      <div className="container mx-auto px-4">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand Section */}
          <div>
            <h3 className="text-2xl font-bold gradient-text mb-4">
            WorkerBull
            </h3>
            <p className="text-gray-600 mb-4">
              Empowering businesses to build and scale with AI.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow"
                  aria-label={social.label}
                >
                  <social.icon size={20} className="text-purple-600" />
                </a>
              ))}
            </div>
          </div>

          {/* Course Links */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Course</h4>
            <ul className="space-y-2">
              {footerLinks.course.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-600 hover:text-purple-600 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Support</h4>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-600 hover:text-purple-600 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Legal</h4>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-600 hover:text-purple-600 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-600 text-sm">
              {currentYear} WorkerBull Limited. All rights reserved.
            </p>
            <p className="text-gray-600 text-sm flex items-center gap-1">
              Made with <Heart size={16} className="text-red-500 fill-current" /> for entrepreneurs
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}