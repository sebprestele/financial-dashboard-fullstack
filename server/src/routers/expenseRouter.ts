import { Router } from 'express'

import {
  addExpense,
  deleteExpense,
  findExpense,
  getExpenseById,
  updateExpense,
} from '../controllers/expenseController'

const router = Router()

router.get('/', findExpense)
router.post('/:userId', addExpense)
router.get('/:expenseId', getExpenseById)
router.delete('/:expenseId', deleteExpense)
router.put('/:expenseId', updateExpense)

export default router
