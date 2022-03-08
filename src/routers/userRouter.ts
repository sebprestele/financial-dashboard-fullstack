import { Router } from 'express'

import { createUser, findUsers } from '../controllers/userController'

const router = Router()

router.get('/', findUsers)
router.post('/', createUser)

export default router
