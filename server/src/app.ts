import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'

import investmentsRouter from './routers/investmentsRouter'
import userRouter from './routers/userRouter'
import incomeRouter from './routers/incomeRouter'
import expenseRouter from './routers/expenseRouter'
import authRouter from './routers/authRouter'
import apiErrorHandler from './middlewares/apiErrorHandler'
import apiContentType from './middlewares/apiContentType'
import { jwtStrategy } from './config/passport'
import passport from 'passport'

dotenv.config({ path: '.env' })
const app = express()

// Express configuration
app.use(apiContentType)

//Allow CORS

app.use(cors())

// Use common 3rd-party middlewares
app.use(express.json())

passport.use(jwtStrategy)

// User router
app.use('/api/v1/users', userRouter)
//Investments router
app.use('/api/v1/investments', investmentsRouter)
//Income Router
app.use('/api/v1/income', incomeRouter)
//Expense Router
app.use('/api/v1/expense', expenseRouter)
//Auth Router
app.use('/api/v1/auth', authRouter)

// Custom API error handler
app.use(apiErrorHandler)

export default app
