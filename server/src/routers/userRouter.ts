import { Router } from 'express'
import passport from 'passport'

import {
  createUser,
  findUsers,
  findUserById,
  updateUser,
  deleteUser,
  loginUser,
} from '../controllers/userController'

const router = Router()

router.get('/', findUsers)
router.post('/', createUser)
router.get(
  '/:userId',
  passport.authenticate('jwt', { session: false }),
  findUserById
)
router.put(
  '/:userId',
  passport.authenticate('jwt', { session: false }),
  updateUser
)
router.delete(
  '/:userId',
  passport.authenticate('jwt', { session: false }),
  deleteUser
)
router.post('/login', loginUser)
export default router
