'use client'
import React from 'react'
import { motion } from 'framer-motion'
import { Star, Quote } from 'lucide-react'

const testimonials = [
  {
    name: 'Sarah Chen',
    role: '',
    content: 'This course completely transformed how I approach building startups. I launched my MVP in just 2 weeks using the AI tools I learned!',
    image: 'https://ui-avatars.com/api/?name=Sarah+Chen&background=9333ea&color=fff',
    rating: 5,
  },
  {
    name: 'Michael Roger',
    role: '',
    content: 'The AI customer discovery techniques alone were worth 10x the course price. Found product-market fit in record time.',
    image: 'https://ui-avatars.com/api/?name=Michael+Rodriguez&background=ec4899&color=fff',
    rating: 5,
  },
  {
    name: 'Eugine Thomas',
    role: '',
    content: 'From idea to Launch in 3 weeks. The growth hacking strategies with AI are absolutely game-changing.',
    image: 'https://ui-avatars.com/api/?name=Emma+Thompson&background=3b82f6&color=fff',
    rating: 5,
  },
  {
    name: 'Amanda Kachikwu',
    role: '',
    content: 'As a technical founder, I was blown away by the no-code AI tools. Built and launched faster than ever before.',
    image: 'https://ui-avatars.com/api/?name=Alex+Kumar&background=10b981&color=fff',
    rating: 5,
  },
  {
    name: 'Lupito Peters',
    role: '',
    content: 'The mentorship and community support were incredible. Got funded 2 months after completing the course!',
    image: 'https://ui-avatars.com/api/?name=Lisa+Park&background=f59e0b&color=fff',
    rating: 5,
  },
  {
    name: 'David Wilson',
    role: '',
    content: 'This course is a startup accelerator in itself. The AI automation strategies saved me 30+ hours per week.',
    image: 'https://ui-avatars.com/api/?name=David+Wilson&background=6366f1&color=fff',
    rating: 5,
  },
]

export default function Testimonials() {
  return (
    <section className="py-20 bg-gradient-to-br from-[#E8EAE7] via-[#F5F6F8] to-[#C1C8DF]">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <Star className="text-yellow-500 fill-current" size={24} />
            <h2 className="text-4xl md:text-5xl font-bold">
              Success <span className="gradient-text">Stories</span>
            </h2>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Join 100+ entrepreneurs who've transformed their startup journey
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <h3 className="font-semibold">{testimonial.name}</h3>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                </div>
              </div>
              
              <div className="flex mb-3">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} size={16} className="text-yellow-500 fill-current" />
                ))}
              </div>

              <Quote className="text-gray-300 mb-2" size={24} />
              <p className="text-gray-700 leading-relaxed">
                {testimonial.content}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <div className="inline-flex items-center gap-2 bg-yellow-100 text-yellow-800 px-6 py-3 rounded-full">
            <Star className="fill-current" size={20} />
            <span className="font-semibold">4.9/5 Average Rating from 100+ Students</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}