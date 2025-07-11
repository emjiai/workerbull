'use client'
import React from 'react'
import { motion } from 'framer-motion'
import { 
  Lightbulb, 
  Rocket, 
  Users, 
  TrendingUp, 
  Code, 
  BarChart,
  Zap,
  MessageSquare,
  Shield,
  Clock,
  Target,
  Sparkles
} from 'lucide-react'

const features = [
  {
    icon: Lightbulb,
    title: 'AI-Powered Idea Validation',
    description: 'Use AI tools to validate your startup ideas in hours, not months. Learn proven frameworks for rapid market testing.',
    color: 'from-purple-500 to-purple-600',
  },
  {
    icon: Code,
    title: 'No-Code MVP Building',
    description: 'Build functional MVPs using AI and no-code tools. Launch your product in days with our step-by-step guidance.',
    color: 'from-pink-500 to-pink-600',
  },
  {
    icon: Users,
    title: 'AI Customer Discovery',
    description: 'Master AI-driven customer research techniques. Find your ideal customers and understand their needs deeply.',
    color: 'from-blue-500 to-blue-600',
  },
  {
    icon: TrendingUp,
    title: 'Growth Hacking with AI',
    description: 'Leverage AI for viral marketing, content creation, and automated growth strategies that actually work.',
    color: 'from-green-500 to-green-600',
  },
  {
    icon: BarChart,
    title: 'Data-Driven Decisions',
    description: 'Use AI analytics to make informed decisions. Track metrics that matter and pivot with confidence.',
    color: 'from-orange-500 to-orange-600',
  },
  {
    icon: Rocket,
    title: 'Scale & Automate',
    description: 'Automate repetitive tasks with AI. Scale your operations efficiently while maintaining quality.',
    color: 'from-indigo-500 to-indigo-600',
  },
]

export default function Features() {
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
            <Sparkles className="text-purple-600" size={24} />
            <h2 className="text-4xl md:text-5xl font-bold">
              What You'll <span className="gradient-text">Master</span>
            </h2>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Transform your startup journey with these AI-powered skills and strategies
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="group"
            >
              <div className="card h-full hover:shadow-2xl transition-all duration-300">
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <feature.icon className="text-white" size={24} />
                </div>
                <h3 className="text-xl font-semibold mb-3 group-hover:text-purple-600 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <div className="bg-gradient-to-r from-[#E8EAE7] via-[#F5F6F8] to-[#C1C8DF] rounded-2xl p-8 md:p-12">
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div>
                <Clock className="text-purple-600 mx-auto mb-3" size={40} />
                <h4 className="text-2xl font-bold mb-2">4 Weeks</h4>
                <p className="text-gray-600">Intensive hands-on program</p>
              </div>
              <div>
                <MessageSquare className="text-pink-600 mx-auto mb-3" size={40} />
                <h4 className="text-2xl font-bold mb-2">Live Sessions</h4>
                <p className="text-gray-600">Interactive Q&A with experts</p>
              </div>
              <div>
                <Shield className="text-purple-600 mx-auto mb-3" size={40} />
                <h4 className="text-2xl font-bold mb-2">Lifetime Access</h4>
                <p className="text-gray-600">All materials & future updates</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}