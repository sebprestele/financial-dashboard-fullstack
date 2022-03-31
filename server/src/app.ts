import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import passport from 'passport'
import fileupload from 'express-fileupload'

import investmentsRouter from './routers/investmentsRouter'
import userRouter from './routers/userRouter'
import incomeRouter from './routers/incomeRouter'
import expenseRouter from './routers/expenseRouter'
import authRouter from './routers/authRouter'
import uploadRouter from './routers/uploadRouter'
import budgetRouter from './routers/budgetRouter'
import apiErrorHandler from './middlewares/apiErrorHandler'
import apiContentType from './middlewares/apiContentType'
import { jwtStrategy } from './config/passport'

dotenv.config({ path: '.env' })
const app = express()

// Express configuration
app.use(apiContentType)

//Allow CORS

app.use(cors())

// Use common 3rd-party middlewares
app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ limit: '50mb', extended: true }))

// Middleware for fileupload to cloudinary
/* eslint-disable  @typescript-eslint/no-var-requires*/

//const fileupload = require('express-fileupload')
app.use(fileupload({ useTempFiles: true }))
/* eslint-enable  @typescript-eslint/no-var-requires */

passport.use(jwtStrategy)

// User router
app.use('/api/v1/users', userRouter)
//Investments router
app.use('/api/v1/investment', investmentsRouter)
//Income Router
app.use('/api/v1/income', incomeRouter)
//Expense Router
app.use('/api/v1/expense', expenseRouter)
//Auth Router
app.use('/api/v1/auth', authRouter)
//Upload Image Router
app.use('/api/v1/upload', uploadRouter)
//Budget Router
app.use('/api/v1/budget', budgetRouter)

// Custom API error handler
app.use(apiErrorHandler)

export default app
