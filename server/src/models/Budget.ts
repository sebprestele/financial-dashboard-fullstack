/* eslint-disable @typescript-eslint/member-delimiter-style */
import mongoose, { Document } from 'mongoose'

export type BudgetDocument = Document & {
  title: string
  budget: number
  tag: string
  comments: string
}

const budgetSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    budget: { type: Number, required: true, default: 0 },
    tag: { type: String, default: 'Uncategorized' },
    comments: { type: String },
  },
  { timestamps: true }
)

export default mongoose.model<BudgetDocument>('Budget', budgetSchema)
