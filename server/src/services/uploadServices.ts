import Upload, { ImageDocument } from '../models/Image'
import { NotFoundError } from '../helpers/apiError'

const createUpload = async (upload: ImageDocument): Promise<ImageDocument> => {
  return upload.save()
}

const findUploadById = async (uploadId: string): Promise<ImageDocument> => {
  const foundUpload = await Upload.findById(uploadId)
  if (!foundUpload) {
    throw new NotFoundError(`Upload ${uploadId} not found`)
  }
  return foundUpload
}

const deleteUpload = async (
  uploadId: string
): Promise<ImageDocument | null> => {
  const foundUpload = await Upload.findByIdAndDelete(uploadId)

  if (!foundUpload) {
    throw new NotFoundError(`Upload ${uploadId} not found`)
  }
  return foundUpload
}

/*
const addExpenseToUpload = async (uploadId: string, expenseId: string) => {
  const upload = await Upload.findById(uploadId)
  upload?.expense.push(expenseId)
  return upload?.save() 
}*/

export default {
  createUpload,
  findUploadById,
  deleteUpload,
}
