/* eslint-disable @typescript-eslint/member-delimiter-style */
import mongoose, { Document } from 'mongoose'

export type ProductDocument = Document & {
  name: string
  price: number
  quantity: number
  category: string
  description: string
  features: string[]
  rating: number
  isAvailable: boolean
  image: string[]
}

const productSchema = new mongoose.Schema({
  name: { type: String, unique: true, required: true, dropDups: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  category: { type: String },
  description: { type: String },
  features: [String],
  rating: { type: Number },
  isAvailable: { type: Boolean },
  image: [String],
})

export default mongoose.model<ProductDocument>('Product', productSchema)
