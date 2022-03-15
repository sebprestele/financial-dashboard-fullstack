/* eslint-disable @typescript-eslint/member-delimiter-style */
import mongoose, { Document } from 'mongoose'

export type IncomeDocument = Document & {
  name: string
  amount: number
  date: Date
  tag: string
  comments: string
}

const incomeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    amount: { type: Number, required: true, default: 0 },
    date: { type: Date },
    tag: { type: String },
    comments: { type: String },
  },
  { timestamps: true }
)

export default mongoose.model<IncomeDocument>('Income', incomeSchema)
