/* eslint-disable @typescript-eslint/member-delimiter-style */
import mongoose, { Document } from 'mongoose'

export type ImageDocument = Document & {
  imageUrl: string
  publicId: string
}

const imageSchema = new mongoose.Schema(
  {
    imageUrl: String,
    publicId: String,
  },
  {
    timestamps: true,
  }
)

export default mongoose.model<ImageDocument>('Image', imageSchema)
