'use client'
import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  Users,
  Calendar,
  DollarSign,
  TrendingUp,
  UserPlus,
  Clock,
  FileText,
  BarChart3,
  Download,
  RefreshCw,
  GraduationCap,
  PlusCircle,
  X
} from 'lucide-react'
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts'
import toast from 'react-hot-toast'
import { formatCurrency, formatDate } from '@/lib/utils'
import Link from 'next/link'

interface DashboardData {
  stats: {
    totalRegistrations: number
    completedRegistrations: number
    totalRevenue: number
    totalWaitlist: number
    totalBookings: number
    scheduledBookings: number
    completedBookings: number
    bookingRevenue: number
    totalMasterclass: number
    completedMasterclass: number
    masterclassRevenue: number
    totalAffiliateRequests: number
    totalAffiliates: number
    pendingAffiliateRequests: number
  }
  registrations: any[]
  masterclass: any[]
  waitlist: any[]
  bookings: any[]
  revenueByDay: { date: string; amount: number }[]
  registrationsByDay: { date: string; count: number }[]
  affiliateRequests: any[]
  affiliates: any[]
}

export default function AdminDashboard() {
  const [loading, setLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null)
  const [activeTab, setActiveTab] = useState<'overview' | 'registrations' | 'masterclass' | 'waitlist' | 'bookings' | 'affiliateRequests' | 'affiliates'>('overview')

  // Coupon modal state
  const [showCouponModal, setShowCouponModal] = useState(false)
  const [couponForm, setCouponForm] = useState({
    owner_id: '',
    firstName: '',
    lastName: '',
    email: '',
    coupon: '',
    discount: 10,
  })

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = () => {
    const savedAuth = localStorage.getItem('adminAuth')
    if (savedAuth === process.env.NEXT_PUBLIC_ADMIN_PASSWORD) {
      setIsAuthenticated(true)
      fetchDashboardData()
    }
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === process.env.NEXT_PUBLIC_ADMIN_PASSWORD) {
      localStorage.setItem('adminAuth', password)
      setIsAuthenticated(true)
      fetchDashboardData()
    } else {
      toast.error('Invalid password')
    }
  }

  const fetchDashboardData = async () => {
    setLoading(true)
    try {
      const headers = {
        'Authorization': `Bearer ${localStorage.getItem('adminAuth')}`,
      }

      const [registrationsRes, masterclassRes, waitlistRes, bookingsRes, affReqRes, couponsRes] = await Promise.all([
        fetch('/api/register', { headers }),
        fetch('/api/masterclass', { headers }),
        fetch('/api/waitlist', { headers }),
        fetch('/api/book', { headers }),
        fetch('/api/affiliate-requests', { headers }),
        fetch('/api/coupons', { headers }),
      ])

      const registrationsData = await registrationsRes.json()
      const masterclassData = await masterclassRes.json()
      const waitlistData = await waitlistRes.json()
      const bookingsData = await bookingsRes.json()
      const affReqData = await affReqRes.json()
      const couponsData = await couponsRes.json()

      // Process data for visualizations
      const revenueByDay = processRevenueByDay(
        [...registrationsData.data, ...masterclassData.data],
        bookingsData.data
      )
      const registrationsByDay = processRegistrationsByDay([
        ...registrationsData.data,
        ...masterclassData.data,
      ])

      setDashboardData({
        stats: {
          totalRegistrations: registrationsData.stats.total,
          completedRegistrations: registrationsData.stats.completed,
          totalRevenue:
            registrationsData.stats.totalRevenue +
            masterclassData.stats.totalRevenue +
            (bookingsData.stats.revenue || 0),
          totalWaitlist: waitlistData.count,
          totalBookings: bookingsData.stats.total,
          scheduledBookings: bookingsData.stats.scheduled,
          completedBookings: bookingsData.stats.completed,
          bookingRevenue: bookingsData.stats.revenue || 0,
          totalMasterclass: masterclassData.stats.total,
          completedMasterclass: masterclassData.stats.completed,
          masterclassRevenue: masterclassData.stats.totalRevenue,
          totalAffiliateRequests: affReqData.data.length,
          totalAffiliates: couponsData.data.length,
          pendingAffiliateRequests: affReqData.data.filter((r:any)=>r.status==='pending').length,
        },
        registrations: registrationsData.data,
        masterclass: masterclassData.data,
        waitlist: waitlistData.data,
        bookings: bookingsData.data,
        revenueByDay,
        registrationsByDay,
        affiliateRequests: affReqData.data,
        affiliates: couponsData.data,
      })
    } catch (error) {
      toast.error('Failed to fetch dashboard data')
    } finally {
      setLoading(false)
    }
  }

  const processRevenueByDay = (registrations: any[], bookings: any[]) => {
    const revenueMap = new Map()
    
    // Process registrations
    registrations.forEach(reg => {
      if (reg.paymentStatus === 'completed') {
        const date = new Date(reg.createdAt).toLocaleDateString()
        revenueMap.set(date, (revenueMap.get(date) || 0) + reg.amount)
      }
    })

    // Process bookings
    bookings.forEach(booking => {
      if (booking.paymentStatus === 'completed') {
        const date = new Date(booking.createdAt).toLocaleDateString()
        revenueMap.set(date, (revenueMap.get(date) || 0) + booking.amount)
      }
    })

    return Array.from(revenueMap.entries())
      .map(([date, amount]) => ({ date, amount }))
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .slice(-7) // Last 7 days
  }

  const processRegistrationsByDay = (registrations: any[]) => {
    const countMap = new Map()
    
    registrations.forEach(reg => {
      const date = new Date(reg.createdAt).toLocaleDateString()
      countMap.set(date, (countMap.get(date) || 0) + 1)
    })

    return Array.from(countMap.entries())
      .map(([date, count]) => ({ date, count }))
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .slice(-7) // Last 7 days
  }

  const exportToCSV = (data: any[], filename: string) => {
    const csv = convertToCSV(data)
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${filename}_${new Date().toISOString().split('T')[0]}.csv`
    a.click()
  }

  const convertToCSV = (data: any[]) => {
    if (!data.length) return ''
    const headers = Object.keys(data[0])
    const csv = [
      headers.join(','),
      ...data.map(row => headers.map(header => JSON.stringify(row[header] || '')).join(','))
    ].join('\n')
    return csv
  }

  const handleCouponChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCouponForm({ ...couponForm, [e.target.name]: e.target.value })
  }

  const submitCoupon = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('adminAuth')}`,
      }
      const res = await fetch('/api/coupons', {
        method: 'POST',
        headers,
        body: JSON.stringify({
          ...couponForm,
          discount: Number(couponForm.discount),
        }),
      })
      const data = await res.json()
      if (data.success) {
        toast.success('Coupon created')
        setShowCouponModal(false)
        setCouponForm({ owner_id: '', firstName: '', lastName: '', email: '', coupon: '', discount: 10 })
      } else {
        toast.error(data.error || 'Failed')
      }
    } catch (err) {
      toast.error('Failed')
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md w-full">
          <h1 className="text-2xl font-bold mb-6">Admin Login</h1>
          <form onSubmit={handleLogin}>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter admin password"
              className="input-field mb-4"
              required
            />
            <button type="submit" className="btn-primary w-full">
              Login
            </button>
          </form>
        </div>
      </div>
    )
  }

  if (loading || !dashboardData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    )
  }

  const pieChartData = [
    { name: 'Course Revenue', value: dashboardData.stats.totalRevenue - dashboardData.stats.bookingRevenue - dashboardData.stats.masterclassRevenue },
    { name: 'Masterclass Revenue', value: dashboardData.stats.masterclassRevenue },
    { name: 'Booking Revenue', value: dashboardData.stats.bookingRevenue },
  ]

  const COLORS = ['#9333EA', '#EC4899', '#8B9467']

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Admin Dashboard</h1>
            <div className="flex items-center gap-4">
              <Link href="/admin/pages" className="btn-secondary">
                <FileText size={20} className="mr-2" />
                Manage Pages
              </Link>
              <button onClick={fetchDashboardData} className="btn-secondary">
                <RefreshCw size={20} className="mr-2" />
                Refresh
              </button>
              <button onClick={() => setShowCouponModal(true)} className="btn-primary flex items-center text-sm">
                <PlusCircle size={16} className="mr-1" /> Create Coupon
              </button>
            </div>
          </div>
        </div>
      </div>

      {showCouponModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100]">
          <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-lg relative">
            <button onClick={() => setShowCouponModal(false)} className="absolute top-3 right-3 text-gray-500 hover:text-gray-700">
              <X size={20} />
            </button>
            <h3 className="text-lg font-semibold mb-4">Create Coupon</h3>
            <form onSubmit={submitCoupon} className="space-y-4">
              <input type="text" name="owner_id" placeholder="Owner ID" required className="input-field" value={couponForm.owner_id} onChange={handleCouponChange} />
              <input type="text" name="firstName" placeholder="First Name" required className="input-field" value={couponForm.firstName} onChange={handleCouponChange} />
              <input type="text" name="lastName" placeholder="Last Name" required className="input-field" value={couponForm.lastName} onChange={handleCouponChange} />
              <input type="email" name="email" placeholder="Email" required className="input-field" value={couponForm.email} onChange={handleCouponChange} />
              <input type="text" name="coupon" placeholder="Coupon Code (optional)" className="input-field" value={couponForm.coupon} onChange={handleCouponChange} />
              <input type="number" name="discount" placeholder="Discount %" required min={1} max={100} className="input-field" value={couponForm.discount} onChange={handleCouponChange} />
              <button type="submit" className="btn-primary w-full">Save</button>
            </form>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl p-6 shadow-lg"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="bg-purple-100 p-3 rounded-lg">
                <DollarSign className="text-purple-600" size={24} />
              </div>
              <TrendingUp className="text-green-500" size={20} />
            </div>
            <h3 className="text-2xl font-bold">{formatCurrency(dashboardData.stats.totalRevenue)}</h3>
            <p className="text-gray-600">Total Revenue</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl p-6 shadow-lg"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="bg-pink-100 p-3 rounded-lg">
                <Users className="text-pink-600" size={24} />
              </div>
              <span className="text-sm font-medium text-green-600">
                {dashboardData.stats.completedRegistrations}/{dashboardData.stats.totalRegistrations}
              </span>
            </div>
            <h3 className="text-2xl font-bold">{dashboardData.stats.totalRegistrations}</h3>
            <p className="text-gray-600">Total Registrations</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl p-6 shadow-lg"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="bg-blue-100 p-3 rounded-lg">
                <UserPlus className="text-blue-600" size={24} />
              </div>
            </div>
            <h3 className="text-2xl font-bold">{dashboardData.stats.totalWaitlist}</h3>
            <p className="text-gray-600">Waitlist Signups</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-2xl p-6 shadow-lg"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="bg-green-100 p-3 rounded-lg">
                <Calendar className="text-green-600" size={24} />
              </div>
              <span className="text-sm font-medium text-blue-600">
                {dashboardData.stats.scheduledBookings} scheduled
              </span>
            </div>
            <h3 className="text-2xl font-bold">{dashboardData.stats.totalBookings}</h3>
            <p className="text-gray-600">Total Bookings</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-2xl p-6 shadow-lg"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="bg-indigo-100 p-3 rounded-lg">
                <GraduationCap className="text-indigo-600" size={24} />
              </div>
              <span className="text-sm font-medium text-green-600">
                {dashboardData.stats.completedMasterclass}/{dashboardData.stats.totalMasterclass}
              </span>
            </div>
            <h3 className="text-2xl font-bold">{dashboardData.stats.totalMasterclass}</h3>
            <p className="text-gray-600">Masterclass Reg.</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white rounded-2xl p-6 shadow-lg"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="bg-yellow-100 p-3 rounded-lg">
                <FileText className="text-yellow-600" size={24} />
              </div>
              <span className="text-sm font-medium text-blue-600">
                {dashboardData.stats.pendingAffiliateRequests}/{dashboardData.stats.totalAffiliateRequests}
              </span>
            </div>
            <h3 className="text-2xl font-bold">{dashboardData.stats.totalAffiliateRequests}</h3>
            <p className="text-gray-600">Affiliate Requests</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white rounded-2xl p-6 shadow-lg"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="bg-green-100 p-3 rounded-lg">
                <Users className="text-green-600" size={24} />
              </div>
              <span className="text-sm font-medium text-green-600">
                {dashboardData.stats.totalAffiliates}
              </span>
            </div>
            <h3 className="text-2xl font-bold">{dashboardData.stats.totalAffiliates}</h3>
            <p className="text-gray-600">Affiliates</p>
          </motion.div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-2xl shadow-lg">
          <div className="border-b">
            <div className="flex space-x-4 mb-6">
              {['overview', 'registrations', 'masterclass', 'waitlist', 'bookings', 'affiliateRequests', 'affiliates'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab as any)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${activeTab === tab ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-700'}`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div className="p-6">
            {activeTab === 'overview' && (
              <div className="space-y-8">
                {/* Revenue Chart */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Revenue Trend (Last 7 Days)</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={dashboardData.revenueByDay}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="amount" 
                        stroke="#9333EA" 
                        strokeWidth={2}
                        name="Revenue"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                {/* Registration Trend */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Registrations Trend (Last 7 Days)</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={dashboardData.registrationsByDay}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="count" fill="#EC4899" name="Registrations" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                {/* Revenue Distribution */}
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Revenue Distribution</h3>
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={pieChartData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {pieChartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-4">Quick Stats</h3>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                        <span className="text-gray-600">Conversion Rate</span>
                        <span className="font-semibold">
                          {((dashboardData.stats.completedRegistrations / dashboardData.stats.totalRegistrations) * 100).toFixed(1)}%
                        </span>
                      </div>
                      <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                        <span className="text-gray-600">Avg. Course Revenue</span>
                        <span className="font-semibold">
                          {formatCurrency(497)}
                        </span>
                      </div>
                      <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                        <span className="text-gray-600">Booking Completion</span>
                        <span className="font-semibold">
                          {((dashboardData.stats.completedBookings / dashboardData.stats.totalBookings) * 100).toFixed(1)}%
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'registrations' && (
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">Course Registrations</h3>
                  <button
                    onClick={() => exportToCSV(dashboardData.registrations, 'registrations')}
                    className="btn-secondary text-sm"
                  >
                    <Download size={16} className="mr-2" />
                    Export CSV
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b">
                      <tr>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Name</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Email</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Phone</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Coupon</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Status</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Amount</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {dashboardData.registrations.map((reg) => (
                        <tr key={reg._id} className="border-b hover:bg-gray-50">
                          <td className="px-4 py-3">{reg.name}</td>
                          <td className="px-4 py-3">{reg.email}</td>
                          <td className="px-4 py-3">{reg.phone}</td>
                          <td className="px-4 py-3">{reg.coupon || '-'}</td>
                          <td className="px-4 py-3">
                            <span className={`inline-flex px-2 py-1 text-xs rounded-full ${
                              reg.paymentStatus === 'completed'
                                ? 'bg-green-100 text-green-700'
                                : 'bg-yellow-100 text-yellow-700'
                            }`}>
                              {reg.paymentStatus}
                            </span>
                          </td>
                          <td className="px-4 py-3">{formatCurrency(reg.amount)}</td>
                          <td className="px-4 py-3">{formatDate(reg.createdAt)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'masterclass' && (
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">Masterclass Registrations</h3>
                  <button
                    onClick={() => exportToCSV(dashboardData.masterclass, 'masterclass_registrations')}
                    className="btn-secondary text-sm"
                  >
                    <Download size={16} className="mr-2" /> Export CSV
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b">
                      <tr>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Name</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Email</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Date</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Coupon</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Payment</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {(dashboardData?.masterclass ?? []).map((mc) => (
                        <tr key={mc._id} className="border-b hover:bg-gray-50">
                          <td className="px-4 py-3">{mc.name}</td>
                          <td className="px-4 py-3">{mc.email}</td>
                          <td className="px-4 py-3">{formatDate(mc.masterclassDate)}</td>
                          <td className="px-4 py-3">{mc.coupon || '-'}</td>
                          <td className="px-4 py-3">
                            <span className={`inline-flex px-2 py-1 text-xs rounded-full ${mc.paymentStatus==='completed' ? 'bg-green-100 text-green-700':'bg-gray-100 text-gray-700'}`}>{mc.paymentStatus}</span>
                          </td>
                          <td className="px-4 py-3">{formatCurrency(mc.amount)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'waitlist' && (
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">Waitlist Signups</h3>
                  <button
                    onClick={() => exportToCSV(dashboardData.waitlist, 'waitlist')}
                    className="btn-secondary text-sm"
                  >
                    <Download size={16} className="mr-2" />
                    Export CSV
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b">
                      <tr>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Name</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Email</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Phone</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Source</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Notified</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {dashboardData.waitlist.map((entry) => (
                        <tr key={entry._id} className="border-b hover:bg-gray-50">
                          <td className="px-4 py-3">{entry.name}</td>
                          <td className="px-4 py-3">{entry.email}</td>
                          <td className="px-4 py-3">{entry.phone || '-'}</td>
                          <td className="px-4 py-3">{entry.source}</td>
                          <td className="px-4 py-3">
                            <span className={`inline-flex px-2 py-1 text-xs rounded-full ${
                              entry.notified
                                ? 'bg-green-100 text-green-700'
                                : 'bg-gray-100 text-gray-700'
                            }`}>
                              {entry.notified ? 'Yes' : 'No'}
                            </span>
                          </td>
                          <td className="px-4 py-3">{formatDate(entry.createdAt)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'bookings' && (
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">Consultation Bookings</h3>
                  <button
                    onClick={() => exportToCSV(dashboardData.bookings, 'bookings')}
                    className="btn-secondary text-sm"
                  >
                    <Download size={16} className="mr-2" />
                    Export CSV
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b">
                      <tr>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Name</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Email</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Type</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Date & Time</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Topic</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Coupon</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Status</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {dashboardData.bookings.map((booking) => (
                        <tr key={booking._id} className="border-b hover:bg-gray-50">
                          <td className="px-4 py-3">{booking.name}</td>
                          <td className="px-4 py-3">{booking.email}</td>
                          <td className="px-4 py-3">
                            <span className={`inline-flex px-2 py-1 text-xs rounded-full ${
                              booking.consultationType === 'paid'
                                ? 'bg-purple-100 text-purple-700'
                                : 'bg-blue-100 text-blue-700'
                            }`}>
                              {booking.consultationType}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            {formatDate(booking.date)} at {booking.time}
                          </td>
                          <td className="px-4 py-3">{booking.topic}</td>
                          <td className="px-4 py-3">{booking.coupon || '-'}</td>
                          <td className="px-4 py-3">
                            <span className={`inline-flex px-2 py-1 text-xs rounded-full ${
                              booking.status === 'completed'
                                ? 'bg-green-100 text-green-700'
                                : booking.status === 'scheduled'
                                ? 'bg-blue-100 text-blue-700'
                                : 'bg-gray-100 text-gray-700'
                            }`}>
                              {booking.status}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            {booking.amount ? formatCurrency(booking.amount) : '-'}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'affiliateRequests' && (
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">Affiliate Requests</h3>
                  <button onClick={() => exportToCSV(dashboardData.affiliateRequests, 'affiliate_requests')} className="btn-secondary text-sm">
                    <Download size={16} className="mr-2" /> Export CSV
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b">
                      <tr>
                        {['Username','First','Last','Email','Reason','Status','Date'].map(h=>(<th key={h} className="px-4 py-3 text-left text-sm font-medium text-gray-700">{h}</th>))}
                      </tr>
                    </thead>
                    <tbody>
                      {dashboardData.affiliateRequests.map((r:any)=>(
                        <tr key={r._id} className="border-b hover:bg-gray-50">
                          <td className="px-4 py-3">{r.owner_id}</td>
                          <td className="px-4 py-3">{r.firstName}</td>
                          <td className="px-4 py-3">{r.lastName}</td>
                          <td className="px-4 py-3">{r.email}</td>
                          <td className="px-4 py-3">{r.reason}</td>
                          <td className="px-4 py-3">
                            <span className={`inline-flex px-2 py-1 text-xs rounded-full ${r.status==='approved'?'bg-green-100 text-green-700': r.status==='rejected'?'bg-red-100 text-red-700':'bg-yellow-100 text-yellow-700'}`}>{r.status}</span>
                          </td>
                          <td className="px-4 py-3">{formatDate(r.createdAt)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'affiliates' && (
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">Affiliates</h3>
                  <button onClick={() => exportToCSV(dashboardData.affiliates, 'affiliates')} className="btn-secondary text-sm">
                    <Download size={16} className="mr-2" /> Export CSV
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b">
                      <tr>
                        {['Username','First','Last','Email','Coupon','Discount','Date'].map(h=>(<th key={h} className="px-4 py-3 text-left text-sm font-medium text-gray-700">{h}</th>))}
                      </tr>
                    </thead>
                    <tbody>
                      {dashboardData.affiliates.map((c:any)=>(
                        <tr key={c._id} className="border-b hover:bg-gray-50">
                          <td className="px-4 py-3">{c.owner_id}</td>
                          <td className="px-4 py-3">{c.firstName}</td>
                          <td className="px-4 py-3">{c.lastName}</td>
                          <td className="px-4 py-3">{c.email}</td>
                          <td className="px-4 py-3">{c.coupon}</td>
                          <td className="px-4 py-3">{c.discount}%</td>
                          <td className="px-4 py-3">{formatDate(c.createdAt)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}