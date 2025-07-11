import mongoose, { Schema, Document } from 'mongoose'

export interface IPage extends Document {
  slug: string
  title: string
  content: string
  metaDescription?: string
  metaKeywords?: string
  isPublished: boolean
  publishedAt?: Date
  lastEditedBy?: string
  sections: {
    type: string
    content: any
    order: number
  }[]
  createdAt: Date
  updatedAt: Date
}

const PageSchema = new Schema<IPage>(
  {
    slug: {
      type: String,
      required: [true, 'Slug is required'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^[a-z0-9-]+$/, 'Slug can only contain lowercase letters, numbers, and hyphens'],
    },
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      maxlength: [200, 'Title cannot exceed 200 characters'],
    },
    content: {
      type: String,
      required: [true, 'Content is required'],
    },
    metaDescription: {
      type: String,
      maxlength: [160, 'Meta description cannot exceed 160 characters'],
    },
    metaKeywords: {
      type: String,
      maxlength: [200, 'Meta keywords cannot exceed 200 characters'],
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
    publishedAt: {
      type: Date,
    },
    lastEditedBy: {
      type: String,
    },
    sections: [{
      type: {
        type: String,
        enum: ['hero', 'text', 'image', 'video', 'cta', 'features', 'testimonials', 'faq'],
        required: true,
      },
      content: {
        type: Schema.Types.Mixed,
        required: true,
      },
      order: {
        type: Number,
        required: true,
      },
    }],
  },
  {
    timestamps: true,
  }
)

// Indexes
// Note: slug already has unique:true, so we don't need a separate index
PageSchema.index({ isPublished: 1 })
PageSchema.index({ createdAt: -1 })

// Pre-save middleware to set publishedAt
PageSchema.pre('save', function(next) {
  if (this.isPublished && !this.publishedAt) {
    this.publishedAt = new Date()
  }
  next()
})

export default mongoose.models.Page || mongoose.model<IPage>('Page', PageSchema)
