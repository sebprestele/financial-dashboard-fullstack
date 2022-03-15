/* eslint-disable @typescript-eslint/member-delimiter-style */
import mongoose, { Document } from 'mongoose'

export type InvestmentDocument = Document & {
  name: string
  amount: number
  quantity: number
  price: Record<string, any>
  date: Record<string, any>
  currency: string
  category: Record<string, any>
  image: string[]
}

const InvestmentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    amount: { type: Number, required: true },
    quantity: { type: Number },
    price: {
      priceBought: { type: Number },
      priceSold: { type: Number },
      priceTarget: { type: Number },
    },
    date: {
      dateBought: { type: Date },
      dateSold: { type: Date },
    },
    currency: { type: String },
    image: [String],
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  },
  { timestamps: true }
)

export default mongoose.model<InvestmentDocument>(
  'Investment',
  InvestmentSchema
)
