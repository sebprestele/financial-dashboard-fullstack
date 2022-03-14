import Product, { ProductDocument } from '../models/Product'
import { NotFoundError } from '../helpers/apiError'
import { TRUE } from 'node-sass'

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

const updateProduct = async (
  productId: string,
  updateProductData: Partial<ProductDocument>
): Promise<ProductDocument | null> => {
  const foundProduct = await Product.findByIdAndUpdate(
    productId,
    updateProductData,
    { new: true }
  )
  if (!foundProduct) {
    throw new NotFoundError(`Product ${productId} not found`)
  }
  return foundProduct
}

const deleteProduct = async (productId: string) => {
  const foundProduct = await Product.findByIdAndDelete(productId)
  if (!foundProduct) {
    throw new NotFoundError(`Product ${productId} not found`)
  }
  return foundProduct
}

export default {
  addProduct,
  findProducts,
  getProductById,
  updateProduct,
  deleteProduct,
}