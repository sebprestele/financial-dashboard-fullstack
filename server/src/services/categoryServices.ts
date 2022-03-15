import Category, { CategoryDocument } from '../models/Category'
import { NotFoundError } from '../helpers/apiError'

const addCategory = async (
  user: CategoryDocument
): Promise<CategoryDocument> => {
  return user.save()
}

const findCategories = async (): Promise<CategoryDocument[]> => {
  return Category.find()
}

const getCategoryById = async (
  categoryId: string
): Promise<CategoryDocument> => {
  const foundCategory = await Category.findById(categoryId)
  if (!foundCategory) {
    throw new NotFoundError(`Category ${categoryId} not found`)
  }
  return foundCategory
}

const updateCategory = async (
  categoryId: string,
  updateCategoryData: Partial<CategoryDocument>
): Promise<CategoryDocument | null> => {
  const foundCategory = await Category.findByIdAndUpdate(
    categoryId,
    updateCategoryData,
    { new: true }
  )
  if (!foundCategory) {
    throw new NotFoundError(`Category ${categoryId} not found`)
  }
  return foundCategory
}

const deleteCategory = async (categoryId: string) => {
  const foundCategory = await Category.findByIdAndDelete(categoryId)
  if (!foundCategory) {
    throw new NotFoundError(`Category ${categoryId} not found`)
  }
  return foundCategory
}

export default {
  addCategory,
  findCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
}
