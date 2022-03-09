import { Router } from 'express'

import {
  createUser,
  findUsers,
  findUserById,
  updateUser,
  deleteUser,
} from '../controllers/userController'

const router = Router()

router.get('/', findUsers)
router.post('/', createUser)
router.get('/:userId', findUserById)
router.put('/:userId', updateUser)
router.delete('/:userId', deleteUser)

export default router
