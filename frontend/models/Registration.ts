import mongoose, { Schema, Document } from 'mongoose'

export interface IRegistration extends Document {
  name: string
  email: string
  phone: string
  coupon?: string
  paymentStatus: 'pending' | 'completed' | 'failed' | 'refunded'
  stripePaymentId?: string
  stripeCustomerId?: string
  amount: number
  courseStartDate: Date
  accessGranted: boolean
  completedModules: string[]
  lastAccess?: Date
  createdAt: Date
  updatedAt: Date
}

const RegistrationSchema = new Schema<IRegistration>(
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
    paymentStatus: {
      type: String,
      enum: ['pending', 'completed', 'failed', 'refunded'],
      default: 'pending',
    },
    stripePaymentId: {
      type: String,
      sparse: true,
    },
    stripeCustomerId: {
      type: String,
      sparse: true,
    },
    amount: {
      type: Number,
      required: [true, 'Amount is required'],
      min: [0, 'Amount cannot be negative'],
    },
    courseStartDate: {
      type: Date,
      required: [true, 'Course start date is required'],
    },
    accessGranted: {
      type: Boolean,
      default: false,
    },
    completedModules: {
      type: [String],
      default: [],
    },
    lastAccess: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
)

// Indexes
RegistrationSchema.index({ email: 1 })
RegistrationSchema.index({ paymentStatus: 1 })
RegistrationSchema.index({ createdAt: -1 })

// Virtual for completion percentage
RegistrationSchema.virtual('completionPercentage').get(function() {
  const totalModules = 6 * 4 // 6 weeks, 4 modules per week
  return Math.round((this.completedModules.length / totalModules) * 100)
})

export default mongoose.models.Registration || mongoose.model<IRegistration>('Registration', RegistrationSchema)