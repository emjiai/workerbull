import mongoose, { Schema, Document } from 'mongoose'

export interface IMasterclassRegistration extends Document {
  name: string
  email: string
  phone: string
  coupon?: string
  paymentStatus: 'pending' | 'completed' | 'failed' | 'refunded'
  stripePaymentId?: string
  stripeCustomerId?: string
  amount: number
  masterclassDate: Date
  createdAt: Date
  updatedAt: Date
}

const MasterclassRegistrationSchema = new Schema<IMasterclassRegistration>(
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
    masterclassDate: {
      type: Date,
      required: [true, 'Masterclass date is required'],
    },
  },
  {
    timestamps: true,
    collection: 'masterclass_registrations',
  }
)

MasterclassRegistrationSchema.index({ email: 1 })
MasterclassRegistrationSchema.index({ paymentStatus: 1 })
MasterclassRegistrationSchema.index({ createdAt: -1 })

export default mongoose.models.MasterclassRegistration ||
  mongoose.model<IMasterclassRegistration>('MasterclassRegistration', MasterclassRegistrationSchema)
