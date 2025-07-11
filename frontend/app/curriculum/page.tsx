'use client'
import { motion } from 'framer-motion'
import { BookOpen, Video, Users, Target, Rocket, Brain, CheckCircle } from 'lucide-react'
import Link from 'next/link'

const curriculum = [
  {
    week: 1,
    title: 'Foundation & AI Mindset',
    description: 'Master the fundamentals of AI-powered entrepreneurship',
    modules: [
      {
        title: 'Introduction to AI for Startups',
        duration: '90 min',
        topics: [
          'AI landscape overview',
          'Key AI tools for entrepreneurs',
          'Setting up your AI toolkit',
          'Cost optimization strategies',
        ],
      },
      {
        title: 'Idea Validation with AI',
        duration: '120 min',
        topics: [
          'AI-powered market research',
          'Competitor analysis automation',
          'Customer persona development',
          'Rapid prototyping techniques',
        ],
      },
    ],
  },
  {
    week: 2,
    title: 'Building Your MVP',
    description: 'Launch your product in days, not months',
    modules: [
      {
        title: 'No-Code AI Development',
        duration: '120 min',
        topics: [
          'Replit, Loveable AI, Base44, Bolt AI',
          'AI-powered design tools',
          'Automation with Zapier & Make',
          'Database design basics',
          "AI Agents"
        ],
      },
      {
        title: 'AI Content Creation',
        duration: '90 min',
        topics: [
          'Copy generation with ChatGPT',
          'Image creation with Gemini',
          'Video content with AI tools',
          'Brand identity development',
          'AI Digital Workers'
        ],
      },
    ],
  },
  {
    week: 3,
    title: 'Customer Discovery & PMF',
    description: 'Find product-market fit faster with AI',
    modules: [
      {
        title: 'AI-Driven Customer Research',
        duration: '90 min',
        topics: [
          'Automated survey creation',
          'Sentiment analysis tools',
          'User interview automation',
          'Data synthesis techniques',
        ],
      },
      {
        title: 'Rapid Testing & Iteration',
        duration: '120 min',
        topics: [
          'A/B testing with AI',
          'Analytics and insights',
          'Feature prioritization',
          'Pivot strategies',
        ],
      },
    ],
  },
  {
    week: 4,
    title: 'Growth Hacking with AI',
    description: 'Scale your startup with automated growth strategies',
    modules: [
      {
        title: 'AI Marketing Automation',
        duration: '120 min',
        topics: [
          'SEO optimization with AI',
          'Social media automation',
          'Email marketing campaigns',
          'Influencer outreach strategies',
        ],
      },
      {
        title: 'Viral Content Creation',
        duration: '90 min',
        topics: [
          'Content ideation with AI',
          'Trend analysis and timing',
          'Multi-channel distribution',
          'Community building tactics',
        ],
      },
    ],
  },
  {
    week: 5,
    title: 'Operations & Scaling',
    description: 'Automate operations and prepare for scale',
    modules: [
      {
        title: 'AI-Powered Operations',
        duration: '90 min',
        topics: [
          'Customer service automation',
          'Project management with AI',
          'Financial planning tools',
          'Team collaboration systems',
        ],
      },
      {
        title: 'Fundraising Preparation',
        duration: '120 min',
        topics: [
          'Pitch deck creation with AI',
          'Financial modeling',
          'Investor research automation',
          'Due diligence preparation',
        ],
      },
    ],
  },
  {
    week: 6,
    title: 'Launch & Beyond',
    description: 'Execute your launch and plan for long-term success',
    modules: [
      {
        title: 'Launch Strategy',
        duration: '120 min',
        topics: [
          'Launch campaign planning',
          'PR automation tools',
          'Partnership strategies',
          'Metrics and KPI tracking',
        ],
      },
      {
        title: 'Future-Proofing Your Startup',
        duration: '90 min',
        topics: [
          'Staying ahead of AI trends',
          'Building defensible moats',
          'Scaling strategies',
          'Exit planning basics',
        ],
      },
    ],
  },
]

export default function CurriculumPage() {
  return (
    <div className="min-h-screen py-20 bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-5xl mx-auto"
        >
          {/* Header */}
          <div className="text-center mb-16">
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-medium mb-6"
            >
              <BookOpen size={16} />
              <span>6-Week Intensive Program</span>
            </motion.div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Course <span className="gradient-text">Curriculum</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              A comprehensive roadmap to launch and scale your AI-powered startup
            </p>
          </div>

          {/* Program Overview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl p-8 shadow-lg mb-12"
          >
            <h2 className="text-2xl font-bold mb-6">Program Overview</h2>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Video className="text-purple-600" size={32} />
                </div>
                <h3 className="font-semibold mb-1">Live Sessions</h3>
                <p className="text-sm text-gray-600">2x per week</p>
              </div>
              <div className="text-center">
                <div className="bg-pink-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Users className="text-pink-600" size={32} />
                </div>
                <h3 className="font-semibold mb-1">Office Hours</h3>
                <p className="text-sm text-gray-600">Weekly Q&A</p>
              </div>
              <div className="text-center">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Target className="text-blue-600" size={32} />
                </div>
                <h3 className="font-semibold mb-1">Projects</h3>
                <p className="text-sm text-gray-600">Hands-on work</p>
              </div>
              <div className="text-center">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Rocket className="text-green-600" size={32} />
                </div>
                <h3 className="font-semibold mb-1">Launch Ready</h3>
                <p className="text-sm text-gray-600">In 6 weeks</p>
              </div>
            </div>
          </motion.div>

          {/* Weekly Curriculum */}
          <div className="space-y-8">
            {curriculum.map((week, weekIndex) => (
              <motion.div
                key={week.week}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * weekIndex }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden"
              >
                <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-2xl font-bold mb-1">
                        Week {week.week}: {week.title}
                      </h3>
                      <p className="text-white/90">{week.description}</p>
                    </div>
                    <div className="bg-white/20 backdrop-blur-sm rounded-full p-4">
                      <Brain size={32} />
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    {week.modules.map((module, moduleIndex) => (
                      <motion.div
                        key={moduleIndex}
                        initial={{ opacity: 0, x: moduleIndex === 0 ? -20 : 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 + weekIndex * 0.1 }}
                        className="border border-gray-200 rounded-lg p-4"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <h4 className="font-semibold text-lg">{module.title}</h4>
                          <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
                            {module.duration}
                          </span>
                        </div>
                        <ul className="space-y-2">
                          {module.topics.map((topic, topicIndex) => (
                            <li key={topicIndex} className="flex items-start gap-2">
                              <CheckCircle className="text-green-500 mt-0.5" size={16} />
                              <span className="text-sm text-gray-600">{topic}</span>
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mt-16 text-center bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-8 text-white"
          >
            <h2 className="text-3xl font-bold mb-4">
              Ready to Transform Your Startup Journey?
            </h2>
            <p className="text-xl mb-8 text-white/90">
              Join 100+ entrepreneurs who are building the future with AI
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/register"
                className="bg-white text-purple-600 px-8 py-4 rounded-full font-semibold text-lg hover:shadow-lg transition-all duration-300"
              >
                Enroll Now - Save $500
              </Link>
              <Link
                href="/book"
                className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white/10 transition-all duration-300"
              >
                Book a Free Call
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}