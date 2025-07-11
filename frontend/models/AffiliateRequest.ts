import { Schema, model, models } from 'mongoose'

export interface IAffiliateRequest {
  owner_id: string
  firstName: string
  lastName: string
  email: string
  reason: string
  status: 'pending' | 'approved' | 'rejected'
  createdAt: Date
  updatedAt: Date
}

const AffiliateRequestSchema = new Schema<IAffiliateRequest>(
  {
    owner_id: { type: String, required: true, trim: true },
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    reason: { type: String, required: true, trim: true },
    status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
  },
  { timestamps: true }
)

export default models.AffiliateRequest || model<IAffiliateRequest>('AffiliateRequest', AffiliateRequestSchema)
