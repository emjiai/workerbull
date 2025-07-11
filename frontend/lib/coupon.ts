import toast from 'react-hot-toast'

interface CouponResponse {
  coupon: string
  discount: number
}

export async function validateCoupon(code: string): Promise<{ valid: boolean; discount: number }> {
  if (!code) return { valid: false, discount: 0 }

  try {
    const res = await fetch('/api/coupons')
    const data = await res.json()
    if (!data.success) throw new Error('Failed to fetch')

    const coupons: CouponResponse[] = data.data || []
    const found = coupons.find((c) => c.coupon.toUpperCase() === code.toUpperCase())
    if (found) {
      return { valid: true, discount: found.discount }
    }

    toast.error('Invalid coupon')
    return { valid: false, discount: 0 }
  } catch (err) {
    toast.error('Invalid coupon')
    return { valid: false, discount: 0 }
  }
}
