/* eslint-disable @typescript-eslint/member-delimiter-style */
import mongoose, { Document } from 'mongoose'

export type ExpenseDocument = Document & {
  name: string
  amount: number
  date: Date
  tag: string
  comments: string
}

const expenseSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    amount: { type: Number, required: true, default: 0 },
    date: { type: Date, required: true, default: Date.now() },
    tag: { type: String, default: 'Uncategorized' },
    comments: { type: String },
  },
  { timestamps: true }
)

export default mongoose.model<ExpenseDocument>('Expense', expenseSchema)
