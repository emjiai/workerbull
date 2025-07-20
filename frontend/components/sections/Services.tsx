'use client'
import React from 'react'
import { motion } from 'framer-motion'
import {
  Zap,
  GraduationCap,
  Briefcase,
  Sparkles,
} from 'lucide-react'

const services = [
  {
    icon: Zap,
    title: 'Build AI Automation Systems',
    description:
      'Design and build AI automation workflows and autonomous agentic systems that plan, execute, and adapt to streamline your business operations.',
    color: 'from-purple-500 to-purple-600',
  },
  {
    icon: GraduationCap,
    title: 'Employee Training on Using AI',
    description:
      'Equip your team with hands-on skills in prompt engineering, using AI tools, and best practices for building production-ready AI solutions to improve productivity.',
    color: 'from-blue-500 to-blue-600',
  },
  {
    icon: Briefcase,
    title:
      'Consulting on AI Integration',
    description:
      'Identify high-impact opportunities to integrate AI to optimise business processes & workflows, and drive measurable ROI across your organization.',
    color: 'from-green-500 to-green-600',
  },
]

export default function Services() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="text-white-600" size={24} />
            <h2 className="text-4xl md:text-5xl font-bold">
              What We <span className="gradient-text">Do</span>
            </h2>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover the core services we deliver to accelerate your AI journey
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="group"
            >
              <div className="card h-full hover:shadow-2xl transition-all duration-300">
                <div
                  className={`w-12 h-12 rounded-lg bg-gradient-to-r ${service.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                >
                  <service.icon className="text-white" size={24} />
                </div>
                <h3 className="text-xl font-semibold mb-3 group-hover:text-purple-600 transition-colors">
                  {service.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {service.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}