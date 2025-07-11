import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: Date | string): string {
  const d = new Date(date)
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export function formatDateWithOrdinal(date: Date | string): string {
  const d = new Date(date)
  const day = d.getDate()
  const month = d.toLocaleDateString('en-US', { month: 'long' })
  const year = d.getFullYear()
  
  // Add ordinal suffix
  const getOrdinalSuffix = (day: number): string => {
    if (day > 3 && day < 21) return 'th'
    switch (day % 10) {
      case 1: return 'st'
      case 2: return 'nd'
      case 3: return 'rd'
      default: return 'th'
    }
  }
  
  return `${day}${getOrdinalSuffix(day)} ${month} ${year}`
}

export function formatTime(time: string): string {
  const [hours, minutes] = time.split(':')
  const hour = parseInt(hours)
  const ampm = hour >= 12 ? 'PM' : 'AM'
  const formattedHour = hour % 12 || 12
  return `${formattedHour}:${minutes} ${ampm}`
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount)
}

export function validateEmail(email: string): boolean {
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
  return emailRegex.test(email)
}

export function validatePhone(phone: string): boolean {
  const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{4,6}$/
  return phoneRegex.test(phone)
}

// The course runs in 4-week cycles and always starts on the
// Monday of the 4th week in each cycle.
// We treat the 1st day of the current month as the beginning of a cycle.
// The "next start date" is therefore:
//   1.  Four weeks (28 days) after the 1st of the current month, and then
//   2.  Adjusted to the next Monday (inclusive).
// If that computed Monday is in the past, we advance in additional
// 4-week increments until we find the next future Monday.
export function getNextCourseStartDate(): Date {
  const today = new Date()

  // Normalise today to remove time component so comparisons are date-only
  today.setHours(0, 0, 0, 0)

  // Start from the first day of the current month
  let cycleAnchor = new Date(today.getFullYear(), today.getMonth(), 1)

  while (true) {
    // 4 weeks = 28 days
    const fourWeeksLater = new Date(cycleAnchor.getTime())
    fourWeeksLater.setDate(fourWeeksLater.getDate() + 28)

    // Find the next Monday on or after this date
    const dayIdx = fourWeeksLater.getDay() // 0=Sun, 1=Mon …
    const daysToAdd = (dayIdx === 0) ? 1 : (8 - dayIdx) % 7
    const potentialStart = new Date(fourWeeksLater.getTime())
    potentialStart.setDate(potentialStart.getDate() + daysToAdd)

    if (potentialStart > today) {
      return potentialStart
    }

    // Otherwise move the cycle anchor forward by another 4 weeks
    cycleAnchor.setDate(cycleAnchor.getDate() + 28)
  }
}

// Returns the next upcoming Masterclass date, which is held on the
// first Saturday of every month and lasts 6 hours. If the first
// Saturday of the current month is in the past, it returns the first
// Saturday of the following month.
export function getNextMasterclassDate(): Date {
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  // Helper to find first Saturday for a given month/year
  const firstSaturday = (year: number, month: number): Date => {
    const d = new Date(year, month, 1)
    const dayIdx = d.getDay() // 0 = Sun, 6 = Sat
    const offset = (6 - dayIdx + 7) % 7 // days to add to reach Saturday
    d.setDate(d.getDate() + offset)
    return d
  }

  let candidate = firstSaturday(today.getFullYear(), today.getMonth())
  if (candidate <= today) {
    // use first Saturday of next month
    const nextMonth = new Date(today.getFullYear(), today.getMonth() + 1, 1)
    candidate = firstSaturday(nextMonth.getFullYear(), nextMonth.getMonth())
  }

  return candidate
}

export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/--+/g, '-')
    .trim()
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength) + '...'
}