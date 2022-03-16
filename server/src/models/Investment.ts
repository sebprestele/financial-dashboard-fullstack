/* eslint-disable @typescript-eslint/member-delimiter-style */
import mongoose, { Document } from 'mongoose'

export type InvestmentDocument = Document & {
  name: string
  amount: number
  quantity: number
  price: Record<string, any>
  date: Date
  currency: string
  comments: string
  category: string[]
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
    comments: { type: String },
    image: [String],
    category: {
      type: String,
      enum: ['Crypto', 'Stocks', 'ETF', 'Bonds', 'Cash', 'RealEstate', 'Other'],
    },
  },
  { timestamps: true }
)

export default mongoose.model<InvestmentDocument>(
  'Investment',
  InvestmentSchema
)
