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

router.get('/', passport.authenticate('jwt', { session: false }), findUsers)
router.post('/', createUser)
router.get(
  '/:userId',
  passport.authenticate('jwt', { session: false }),
  findUserById
)
router.put('/:userId', updateUser)
router.delete('/:userId', deleteUser)
router.post('/login', loginUser)
export default router
