import express from 'express'

import { createUpload } from '../controllers/uploadControllers'

const router = express.Router()

router.post('/', createUpload)

export default router
