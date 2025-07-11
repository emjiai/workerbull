import React, { useState } from 'react'
import toast from 'react-hot-toast'

interface Props {
  onClose: () => void
}

export default function AffiliateModal({ onClose }: Props) {
  const [form, setForm] = useState({
    owner_id: '',
    firstName: '',
    lastName: '',
    email: '',
    reason: '',
  })
  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await fetch('/api/affiliate-requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (data.success) {
        toast.success('Application submitted! We will review and get back to you.')
        onClose()
      } else {
        toast.error(data.error || 'Failed')
      }
    } catch (err) {
      toast.error('Failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-[100] grid place-items-center p-4">
      <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-lg relative">
        <button onClick={onClose} className="absolute top-3 right-3 text-gray-500 hover:text-gray-700">✕</button>
        <h3 className="text-lg font-semibold mb-4">Become an Affiliate</h3>
        <form onSubmit={submit} className="space-y-4">
          <input name="owner_id" placeholder="Choose a username" required className="input-field" value={form.owner_id} onChange={handleChange} />
          <input name="firstName" placeholder="First Name" required className="input-field" value={form.firstName} onChange={handleChange} />
          <input name="lastName" placeholder="Last Name" required className="input-field" value={form.lastName} onChange={handleChange} />
          <input type="email" name="email" placeholder="Email" required className="input-field w-full" value={form.email} onChange={handleChange} />
          <textarea name="reason" placeholder="Why do you want to become our Affiliate?" required className="input-field w-full h-28" value={form.reason} onChange={handleChange} />
          <button type="submit" className="btn-primary w-full" disabled={loading}>{loading ? 'Submitting...' : 'Submit'}</button>
        </form>
      </div>
    </div>
  )
}
