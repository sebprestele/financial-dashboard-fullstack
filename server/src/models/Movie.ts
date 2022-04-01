/* eslint-disable @typescript-eslint/member-delimiter-style */
import mongoose, { Document } from 'mongoose'

export type MovieDocument = Document & {
  name: string
  publishedYear: number
  genres: string[]
  duration: number
  rating: number
  characters: string[]
}

const movieSchema = new mongoose.Schema({
  name: {
    type: String,
    index: true,
  },
  publishedYear: {
    type: Number,
    required: true,
    min: 1900,
  },
  genres: [String],
  duration: {
    type: Number,
    min: 1,
  },
  rating: {
    type: Number,
    min: 0,
  },
  characters: [String],
})

export default mongoose.model<MovieDocument>('Movie', movieSchema)
