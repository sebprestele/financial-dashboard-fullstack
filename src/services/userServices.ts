import User, { UserDocument } from '../models/User'
// import { NotFoundError } from '../helpers/apiError'

const createUser = async (user: UserDocument): Promise<UserDocument> => {
  return user.save()
}

const findUsers = async (): Promise<UserDocument[]> => {
  return User.find().sort({ name: 1, publishedYear: -1 })
}

export default {
  createUser,
  findUsers,
}
