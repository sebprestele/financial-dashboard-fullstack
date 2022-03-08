import { Router } from 'express'

import {
  addProduct,
  findProducts,
  getProductById,
} from '../controllers/productsController'

const router = Router()

router.get('/', findProducts)
router.post('/', addProduct)
router.get('/:productId', getProductById)

export default router
