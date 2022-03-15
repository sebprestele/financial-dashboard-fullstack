/* eslint-disable @typescript-eslint/member-delimiter-style */
import mongoose, { Document } from 'mongoose'

export type IncomeDocument = Document & {
  name: string
  amount: number
  date: Date
  tag: string
}

const incomeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    amount: { type: Number },
    date: { type: Date },
    tag: { type: String },
  },
  { timestamps: true }
)

export default mongoose.model<IncomeDocument>('Income', incomeSchema)
