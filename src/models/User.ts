/* eslint-disable @typescript-eslint/member-delimiter-style */
import mongoose, { Document } from 'mongoose'

export type UserDocument = Document & {
  username: string
  email: string
  password: string
  firstName: string
  lastName: string
  isAdmin: boolean
  image: string
}

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true, dropDups: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  firstName: { type: String },
  lastName: { type: String },
  isAdmin: { type: Boolean },
  image: { type: String },
})

export default mongoose.model<UserDocument>('User', userSchema)
