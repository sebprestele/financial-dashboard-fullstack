import { Router } from 'express'

import {
  addProduct,
  deleteProduct,
  findProducts,
  getProductById,
  updateProduct,
} from '../controllers/productsController'

const router = Router()

router.get('/', findProducts)
router.post('/', addProduct)
router.get('/:productId', getProductById)
router.delete('/:productId', deleteProduct)
router.put('/:productId', updateProduct)

export default router
