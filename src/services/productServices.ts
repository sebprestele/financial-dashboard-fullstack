import Product, { ProductDocument } from '../models/Product'
import { NotFoundError } from '../helpers/apiError'

const addProduct = async (user: ProductDocument): Promise<ProductDocument> => {
  return user.save()
}

const findProducts = async (): Promise<ProductDocument[]> => {
  return Product.find()
}

const getProductById = async (productId: string): Promise<ProductDocument> => {
  const foundProduct = await Product.findById(productId)
  if (!foundProduct) {
    throw new NotFoundError(`Product ${productId} not found`)
  }
  return foundProduct
}

export default {
  addProduct,
  findProducts,
  getProductById,
}
