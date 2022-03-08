import { Router } from 'express'

import {
  createUser,
  findUsers,
  findUserById,
} from '../controllers/userController'

const router = Router()

router.get('/', findUsers)
router.post('/', createUser)
router.get('/:userId', findUserById)

export default router
