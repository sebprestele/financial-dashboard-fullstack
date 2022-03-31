import { Router } from 'express'

import {
  addIncome,
  deleteIncome,
  findIncome,
  getIncomeById,
  updateIncome,
} from '../controllers/incomeController'

const router = Router()

router.get('/', findIncome)
router.post('/:userId', addIncome)
router.get('/:incomeId', getIncomeById)
router.delete('/:incomeId', deleteIncome)
router.put('/:incomeId', updateIncome)

export default router
