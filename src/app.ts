import express from 'express'
import dotenv from 'dotenv'

import movieRouter from './routers/movie'
import apiErrorHandler from './middlewares/apiErrorHandler'
import apiContentType from './middlewares/apiContentType'

dotenv.config({ path: '.env' })
const app = express()

// Express configuration
app.use(apiContentType)
// Use common 3rd-party middlewares
app.use(express.json())

// Use movie router
app.use('/api/v1/movies', movieRouter)

// Custom API error handler
app.use(apiErrorHandler)

export default app
