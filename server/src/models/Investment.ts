/* eslint-disable @typescript-eslint/member-delimiter-style */
import mongoose, { Document } from 'mongoose'

export type InvestmentDocument = Document & {
  name: string
  transactionType: string[]
  category: string[]
  amount: number
  quantity: number
  price: Record<string, any>[]
  totalValue: number
  currency: string[]
  fee: number
  date: Record<string, any>[]
  comments: string
}

const InvestmentSchema = new mongoose.Schema(
  {
    name: { type: String },
    category: {
      type: String,
    },
    transactionType: { type: String },
    amount: { type: Number },
    quantity: { type: Number },
    price: [
      {
        priceBought: { type: Number },
        priceSold: { type: Number },
      },
    ],
    totalValue: { type: Number },
    date: [
      {
        dateBought: { type: Date },
        dateSold: { type: Date },
      },
    ],
    currency: {
      type: String,
      enum: [
        'EUR',
        'USD',
        'GBP',
        'CHF',
        'SEK',
        'NOK',
        'DKK',
        'AUD',
        'CAD',
        'JPY',
        'THB',
        'Bitcoin',
        'Ethereum',
        'Tether',
        'Ripple',
        'Cardano',
        'Polkadot',
        'Chainlink',
        'DogeCoin',
      ],
    },
    fee: { type: Number },
    comments: { type: String },
  },
  { timestamps: true }
)

export default mongoose.model<InvestmentDocument>(
  'Investment',
  InvestmentSchema
)
