import { Router } from 'express'

import {
  addInvestment,
  deleteInvestment,
  findInvestments,
  getInvestmentById,
  updateInvestment,
} from '../controllers/investmentsController'

const router = Router()

router.get('/', findInvestments)
router.post('/:userId', addInvestment)
router.get('/:investmentId', getInvestmentById)
router.delete('/:investmentId', deleteInvestment)
router.put('/:investmentId', updateInvestment)

export default router
