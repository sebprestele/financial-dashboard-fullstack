import { Router } from 'express'

import {
  addCategory,
  deleteCategory,
  findCategories,
  getCategoryById,
  updateCategory,
} from '../controllers/categoryController'

const router = Router()

router.get('/', findCategories)
router.post('/', addCategory)
router.get('/:categoryId', getCategoryById)
router.delete('/:categoryId', deleteCategory)
router.put('/:categoryId', updateCategory)

export default router
