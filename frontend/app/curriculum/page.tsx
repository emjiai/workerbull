'use client'
import { motion } from 'framer-motion'
import { BookOpen, Video, Users, Target, Rocket, Brain, CheckCircle } from 'lucide-react'
import Link from 'next/link'

const curriculum = [
  {
    week: 1,
    title: 'Foundation & AI Mindset',
    description: 'Establish core generative-AI concepts, leadership mindset and strategy',
    modules: [
      {
        title: 'Introduction to Generative AI & Prompt Engineering',
        duration: '90 min',
        topics: [
          'Overview of Generative AI and its business applications',
          'Prompt engineering and AI model interactions',
          'AI-First leadership principles',
          'Building high-performance AI teams & culture',
          'Innovation & strategic mindset for AI adoption',
        ],
      },
      {
        title: 'Innovation & Strategy with Generative AI',
        duration: '120 min',
        topics: [
          'Identifying high-value automation opportunities',
          'Ideation frameworks for AI use cases',
          'Road-mapping generative-AI projects',
          'Competitor Analysis & Market Research',
          'Case studies: Successful AI implementations in business',
        ],
      },
    ],
  },
  {
    week: 2,
    title: 'Generative AI Use Cases by Department',
    description: 'Explore department-specific applications to drive efficiency and growth',
    modules: [
      {
        title: 'Business Functions',
        duration: '120 min',
        topics: [
          'Marketing: Content generation & personalization',
          'Sales: Lead generation and customer interaction automation',
          'HR: Recruitment process automation and employee engagement',
          'Finance: Financial forecasting and report generation',
          'Customer Service: Chatbots, ticket routing, response generation',
        ],
      },
      {
        title: 'Operations Functions',
        duration: '120 min',
        topics: [
          'Supply Chain: Demand forecasting, vendor communication, logistics',
          'R & D: Idea generation and research automation',
          'Admin: Task automation, process documentation & SOP creation',
          'HSE: Safety incident reporting, analytics & pre-incident prediction',
          'Quality Assurance: Compliance & audit report automation',
        ],
      },
    ],
  },
  {
    week: 3,
    title: 'Tools & Implementation Labs',
    description: 'Hands-on experience with no-code tools and AI workspaces for business automation.',
    modules: [
      {
        title: 'No-Code Tools for Generative AI',
        duration: '120 min',
        topics: [
          'Introduction to Zapier and Make for workflow automation',
          'Base44, Loveable, Bolt, Replit for AI integration',
          'Building custom AI solutions without coding',
          'Best practices for no-code AI implementations',
          'AI tool selection and integration',  
        ],
      },
      {
        title: 'AI Workspaces & Chatbots',
        duration: '120 min',
        topics: [
          'Microsoft Office 365 Copilot for productivity',
          'Google Workspace AI features',
          'Chatbots: ChatGPT, Gemini, Claude, Grok, Deepseek, Perplexity',
          'Integrating AI into daily business operations',
          'Multi Agent and Digital Workforce Orchestration'
        ],
      },
    ],
  },
  {
    week: 4,
    title: 'AI Ethics, Governance & ROI',
    description: 'Ensure responsible adoption while measuring value and mitigating risk',
    modules: [
      {
        title: 'Ethics and Governance in AI',
        duration: '90 min',
        topics: [
          'Ethical considerations in Generative AI',
          'Data privacy and security in AI applications',
          'Regulatory compliance and governance frameworks',
          'Bias detection & mitigation',
          'Responsible AI principles & fairness',
        ],
      },
      {
        title: 'ROI, Risks & Scaling',
        duration: '120 min',
        topics: [
          'Calculating ROI for AI projects',
          'Risk assessment and mitigation strategies',
          'Case studies: AI implementation successes and failures',
          'Future-proofing your AI strategy',
          'Continuous improvement loops',
        ],
      },
    ],
  },
]

export default function CurriculumPage() {
  return (
    <div className="min-h-screen py-20 bg-gradient-to-br from-[#E8EAE7] via-[#F5F6F8] to-[#C1C8DF]">
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
              <span>4-Week Intensive Program</span>
            </motion.div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Course <span className="gradient-text">Curriculum</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              A comprehensive roadmap to build and integrate generative ai in your business.
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
                <h3 className="font-semibold mb-1">Automation Ready</h3>
                <p className="text-sm text-gray-600">In 4 weeks</p>
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
                <div className="bg-gradient-to-r from-[#28264C] via-[#4E5174] to-[#A40033] text-white p-6">
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
            className="mt-16 text-center bg-gradient-to-r from-[#28264C] via-[#4E5174] to-[#A40033] rounded-2xl p-8 text-white"
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