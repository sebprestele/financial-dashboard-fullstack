/* eslint-disable @typescript-eslint/member-delimiter-style */
import mongoose, { Document } from 'mongoose'

export type CategoryDocument = Document & {
  name: string
  investments: number
  income: number
  expense: number
}

const categorySchema = new mongoose.Schema(
  {
    name: { type: String, unique: true, required: true },
    investments: { type: Number },
    income: { type: Number },
    expense: { type: Number },
  },
  { timestamps: true }
)

export default mongoose.model<CategoryDocument>('Category', categorySchema)
