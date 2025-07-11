import mongoose, { Schema, Document } from 'mongoose'

export interface IBooking extends Document {
  name: string
  email: string
  phone: string
  coupon?: string
  consultationType: 'free' | 'paid'
  date: Date
  time: string
  duration: string
  topic: string
  description?: string
  paymentStatus: 'pending' | 'completed' | 'not_required'
  stripePaymentId?: string
  amount: number
  status: 'scheduled' | 'completed' | 'cancelled' | 'no_show'
  meetingLink?: string
  notes?: string
  createdAt: Date
  updatedAt: Date
}

const BookingSchema = new Schema<IBooking>(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      maxlength: [100, 'Name cannot exceed 100 characters'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      lowercase: true,
      trim: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please provide a valid email',
      ],
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      trim: true,
      match: [
        /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{4,6}$/,
        'Please provide a valid phone number',
      ],
    },
    coupon: {
      type: String,
      trim: true,
    },
    consultationType: {
      type: String,
      enum: ['free', 'paid'],
      required: [true, 'Consultation type is required'],
    },
    date: {
      type: Date,
      required: [true, 'Date is required'],
      validate: {
        validator: function(v: Date) {
          return v > new Date()
        },
        message: 'Booking date must be in the future',
      },
    },
    time: {
      type: String,
      required: [true, 'Time is required'],
      match: [/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Please provide time in HH:MM format'],
    },
    duration: {
      type: String,
      enum: ['30 minutes', '60 minutes', '90 minutes'],
      default: '30 minutes',
    },
    topic: {
      type: String,
      required: [true, 'Topic is required'],
      maxlength: [200, 'Topic cannot exceed 200 characters'],
    },
    description: {
      type: String,
      maxlength: [1000, 'Description cannot exceed 1000 characters'],
    },
    paymentStatus: {
      type: String,
      enum: ['pending', 'completed', 'not_required'],
      default: function() {
        return this.consultationType === 'free' ? 'not_required' : 'pending'
      },
    },
    stripePaymentId: {
      type: String,
      sparse: true,
    },
    amount: {
      type: Number,
      default: function() {
        if (this.consultationType === 'free') return 0
        switch (this.duration) {
          case '30 minutes': return 97
          case '60 minutes': return 197
          case '90 minutes': return 297
          default: return 97
        }
      },
    },
    status: {
      type: String,
      enum: ['scheduled', 'completed', 'cancelled', 'no_show'],
      default: 'scheduled',
    },
    meetingLink: {
      type: String,
    },
    notes: {
      type: String,
      maxlength: [2000, 'Notes cannot exceed 2000 characters'],
    },
  },
  {
    timestamps: true,
  }
)

// Indexes
BookingSchema.index({ email: 1 })
BookingSchema.index({ date: 1, time: 1 })
BookingSchema.index({ status: 1 })
BookingSchema.index({ consultationType: 1 })
BookingSchema.index({ createdAt: -1 })

// Compound index for checking availability
BookingSchema.index({ date: 1, time: 1, status: 1 })

export default mongoose.models.Booking || mongoose.model<IBooking>('Booking', BookingSchema)