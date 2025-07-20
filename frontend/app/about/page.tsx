'use client'
import { motion } from 'framer-motion'
import { Users, Target, Lightbulb, Award, Heart, Rocket } from 'lucide-react'
import Image from 'next/image'

export default function AboutPage() {
  const values = [
    {
      icon: Lightbulb,
      title: 'Innovation First',
      description: 'We embrace cutting-edge AI technologies to help entrepreneurs build the future.',
    },
    {
      icon: Users,
      title: 'Community Driven',
      description: 'Our vibrant community of 100+ entrepreneurs supports and uplifts each other.',
    },
    {
      icon: Target,
      title: 'Results Focused',
      description: 'We measure success by your success - 95% of our students learn successfully.',
    },
    {
      icon: Heart,
      title: 'Accessible Education',
      description: 'Quality AI education should be available to all aspiring entrepreneurs.',
    },
  ]

  const team = [
    {
      name: 'Sarah Chen',
      role: 'Founder & Lead Instructor',
      bio: 'Serial entrepreneur with 3 successful AI startups. Former Google AI researcher.',
      image: 'https://ui-avatars.com/api/?name=Sarah+Chen&background=9333ea&color=fff&size=200',
    },
    {
      name: 'Marcus Rodriguez',
      role: 'AI Strategy Expert',
      bio: 'Helped 100+ startups implement AI. Former McKinsey consultant.',
      image: 'https://ui-avatars.com/api/?name=Marcus+Rodriguez&background=ec4899&color=fff&size=200',
    },
    {
      name: 'Dr. Emily Wang',
      role: 'Technical Advisor',
      bio: 'PhD in Machine Learning. Published researcher and startup advisor.',
      image: 'https://ui-avatars.com/api/?name=Emily+Wang&background=3b82f6&color=fff&size=200',
    },
  ]

  const milestones = [
    { year: '2022', event: 'Founded WorkerBull Limited' },
    { year: '2023', event: 'Launched first cohort with 1 company' },
    { year: '2024', event: 'Expanded globally with new programs' },
    { year: '2025', event: 'Reached 100+ successful professionals' },
  ]

  return (
    <div className="min-h-screen py-20 bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-6xl mx-auto"
        >
          {/* Header */}
          <div className="text-center mb-16">
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-medium mb-6"
            >
              <Rocket size={16} />
              <span>Our Story</span>
            </motion.div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              About{' '}
              <span className="gradient-text">WorkerBull</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Empowering busieness teams to build and integrate Generative AI-powered applications for workplace and business automation
            </p>
          </div>

          {/* Mission Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl shadow-lg p-8 md:p-12 mb-12"
          >
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  We believe that AI is the greatest technological opportunity of our generation, and every business 
                  should have access to the tools and knowledge needed to harness its power.
                </p>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Founded in 2022, WorkerBull was born from the realization that while AI technology was advancing 
                  rapidly, practical education for business teams was lagging behind. We bridge that gap.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  Our mission is simple: democratize AI App development and integration by providing world-class education, 
                  practical tools, and a supportive community to help you automate your business and workplace processes 10x faster.
                </p>
              </div>
              <div className="relative">
                <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-8 text-white">
                  <Award className="mb-4" size={48} />
                  <h3 className="text-2xl font-bold mb-2">10+</h3>
                  <p className="text-white/90">Organizations Partnered</p>
                  <div className="mt-6">
                    <h3 className="text-2xl font-bold mb-2">95%</h3>
                    <p className="text-white/90">Success Rate</p>
                  </div>
                  <div className="mt-6">
                    <h3 className="text-2xl font-bold mb-2">10+</h3>
                    <p className="text-white/90">Cohorts Completed</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Values Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-12"
          >
            <h2 className="text-3xl font-bold text-center mb-8">Our Core Values</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
                >
                  <div className="bg-purple-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                    <value.icon className="text-purple-600" size={24} />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{value.title}</h3>
                  <p className="text-gray-600 text-sm">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Team Section
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white rounded-2xl shadow-lg p-8 md:p-12 mb-12"
          >
            <h2 className="text-3xl font-bold text-center mb-8">Meet Our Team</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {team.map((member, index) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  className="text-center"
                >
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-32 h-32 rounded-full mx-auto mb-4 shadow-lg"
                  />
                  <h3 className="font-semibold text-lg">{member.name}</h3>
                  <p className="text-purple-600 text-sm mb-2">{member.role}</p>
                  <p className="text-gray-600 text-sm">{member.bio}</p>
                </motion.div>
              ))}
            </div>
          </motion.div> */}

          {/* Timeline Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="mb-12"
          >
            <h2 className="text-3xl font-bold text-center mb-8">Our Journey</h2>
            <div className="max-w-3xl mx-auto">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={milestone.year}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                  className={`flex items-center gap-4 mb-8 ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  <div className="flex-1 text-right">
                    {index % 2 === 0 && (
                      <div>
                        <h3 className="font-semibold text-lg">{milestone.year}</h3>
                        <p className="text-gray-600">{milestone.event}</p>
                      </div>
                    )}
                  </div>
                  <div className="bg-purple-600 w-4 h-4 rounded-full flex-shrink-0"></div>
                  <div className="flex-1">
                    {index % 2 !== 0 && (
                      <div>
                        <h3 className="font-semibold text-lg">{milestone.year}</h3>
                        <p className="text-gray-600">{milestone.event}</p>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-8 md:p-12 text-white text-center"
          >
            <h2 className="text-3xl font-bold mb-4">Ready to Join Our Community?</h2>
            <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
              Be part of the next generation of AI-powered business. 
              Your journey to building successful business and workplace AI automations starts here.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/register"
                className="bg-white text-purple-600 px-8 py-4 rounded-full font-semibold hover:shadow-lg transition-all duration-300"
              >
                Start Your Journey
              </a>
              <a
                href="/curriculum"
                className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white/10 transition-all duration-300"
              >
                Explore Curriculum
              </a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}