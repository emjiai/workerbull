"use client"
import { formatDateWithOrdinal, getNextMasterclassDate } from '@/lib/utils'
import Button from '@/components/ui/Button'
import { CalendarClock, Timer, DollarSign } from 'lucide-react'
import { motion } from 'framer-motion'

export default function JoinSection() {
  const date = getNextMasterclassDate()
  const formattedDate = formatDateWithOrdinal(date)

  const details = [
    {
      icon: <CalendarClock className="text-purple-600" size={24} />,
      label: 'Date',
      value: formattedDate,
    },
    {
      icon: <Timer className="text-purple-600" size={24} />,
      label: 'Duration',
      value: '6 hours',
    },
    {
      icon: <DollarSign className="text-purple-600" size={24} />,
      label: 'Price',
      value: '$100',
    },
  ]

  const handleRegister = () => {
    // scroll to registration form or redirect – placeholder
    const form = document.getElementById('mc-register-form')
    form?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="py-20 bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <div className="container mx-auto px-4 text-center max-w-3xl">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-extrabold mb-6"
        >
          Generative AI for Business Leaders
        </motion.h1>
        <motion.h3
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-2xl md:text-3xl font-bold mb-6"
        >
          One-Day Masterclass
        </motion.h3>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-lg text-gray-700 mb-10"
        >
          Fast-track your AI Leadership skills in just 6 hours.
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
          {details.map((d, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white p-6 rounded-2xl shadow flex flex-col items-center"
            >
              {d.icon}
              <span className="mt-3 text-sm uppercase tracking-wide text-gray-500">
                {d.label}
              </span>
              <span className="mt-1 text-xl font-semibold">{d.value}</span>
            </motion.div>
          ))}
        </div>

        <Button size="lg" onClick={handleRegister} className="px-10">
          Register Now
        </Button>
      </div>
    </section>
  )
}
