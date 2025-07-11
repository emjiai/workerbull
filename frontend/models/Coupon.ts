import mongoose, { Schema, Document } from 'mongoose'

export interface ICoupon extends Document {
  owner_id: string
  firstName: string
  lastName: string
  email: string
  coupon: string
  discount: number
  createdAt: Date
  updatedAt: Date
}

const CouponSchema = new Schema<ICoupon>(
  {
    owner_id: {
      type: String,
      required: true,
      index: true,
    },
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    coupon: {
      type: String,
      required: true,
      uppercase: true,
      unique: true,
      trim: true,
    },
    discount: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },
  },
  {
    timestamps: true,
  }
)

CouponSchema.index({ coupon: 1 })

export default mongoose.models.Coupon || mongoose.model<ICoupon>('Coupon', CouponSchema);
