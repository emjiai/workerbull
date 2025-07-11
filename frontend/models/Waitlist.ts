import mongoose, { Schema, Document } from 'mongoose'

export interface IWaitlist extends Document {
  name: string
  email: string
  phone?: string
  source?: string
  notified: boolean
  createdAt: Date
  updatedAt: Date
}

const WaitlistSchema = new Schema<IWaitlist>(
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
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please provide a valid email',
      ],
    },
    phone: {
      type: String,
      trim: true,
      match: [
        /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{4,6}$/,
        'Please provide a valid phone number',
      ],
    },
    source: {
      type: String,
      enum: ['website', 'social_media', 'referral', 'other'],
      default: 'website',
    },
    notified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
)

// Indexes for better query performance
// Note: email already has unique:true, so we don't need a separate index
WaitlistSchema.index({ createdAt: -1 })

export default mongoose.models.Waitlist || mongoose.model<IWaitlist>('Waitlist', WaitlistSchema)