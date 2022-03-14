import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'

import productsRouter from './routers/productsRouter'
import userRouter from './routers/userRouter'
import apiErrorHandler from './middlewares/apiErrorHandler'
import apiContentType from './middlewares/apiContentType'
import { jwtStrategy } from './config/passport'
import passport from 'passport'

dotenv.config({ path: '.env' })
const app = express()

// Express configuration
app.use(apiContentType)

//Allow CORS access for localhost 3000
const allowedOrigins = ['http://localhost:3000']
const options: cors.CorsOptions = {
  origin: allowedOrigins,
}

app.use(cors(options))

// Use common 3rd-party middlewares
app.use(express.json())

passport.use(jwtStrategy)

// User router
app.use('/api/v1/users', userRouter)
//Product router
app.use('/api/v1/products', productsRouter)

// Custom API error handler
app.use(apiErrorHandler)

export default app
