import User, { UserDocument } from '../models/User'
import { NotFoundError } from '../helpers/apiError'

const createUser = async (user: UserDocument): Promise<UserDocument> => {
  return user.save()
}

const findUsers = async (): Promise<UserDocument[]> => {
  return User.find().sort({ name: 1, publishedYear: -1 })
}

const findUserById = async (userId: string): Promise<UserDocument> => {
  const foundUser = await User.findById(userId)
  if (!foundUser) {
    throw new NotFoundError(`User ${userId} not found`)
  }
  return foundUser
}

const updateUser = async (
  userId: string,
  dataToUpdate: Partial<UserDocument>
): Promise<UserDocument> => {
  const foundUser = await User.findByIdAndUpdate(userId, dataToUpdate, {
    new: true,
  })

  if (!foundUser) {
    throw new NotFoundError(`User ${userId} not found`)
  }
  return foundUser
}

const deleteUser = async (userId: string) => {
  const foundUser = await User.findByIdAndDelete(userId)

  if (!foundUser) {
    throw new NotFoundError(`User ${userId} not found`)
  }
  return foundUser
}

export default {
  createUser,
  findUsers,
  findUserById,
  updateUser,
  deleteUser,
}
