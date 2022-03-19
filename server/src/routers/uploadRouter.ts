import express from 'express'

import {
  createUpload /* deleteUpload */,
} from '../controllers/uploadControllers'

const router = express.Router()

// Every path we define here will get /api/v1/uploads prefix
//router.delete('/', deleteUpload)
router.post('/', createUpload)

export default router
