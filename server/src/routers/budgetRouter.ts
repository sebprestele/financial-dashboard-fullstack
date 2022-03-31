import { Router } from 'express'

import {
  addBudget,
  deleteBudget,
  findBudget,
  getBudgetById,
  updateBudget,
} from '../controllers/budgetController'

const router = Router()

router.get('/', findBudget)
router.post('/:userId', addBudget)
router.get('/:budgetId', getBudgetById)
router.delete('/:budgetId', deleteBudget)
router.put('/:budgetId', updateBudget)

export default router
