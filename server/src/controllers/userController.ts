import { Request, Response, NextFunction } from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { JWT_SECRET } from '../util/seccret'
import User from '../models/User'
import UserService from '../services/userServices'
import { BadRequestError, NotFoundError } from '../helpers/apiError'

// POST /users
export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username, email, password, firstName, lastName, isAdmin, image } =
      req.body

    const hasUserMail = await UserService.findUserByEmail(email)
    const hasUserName = await UserService.findUserByUsername(username)

    if (hasUserName || hasUserMail)
      return res.status(400).json({ error: 'User already exists' })
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const user = new User({
      username,
      email,
      password: hashedPassword,
      firstName,
      lastName,
      isAdmin,
      image,
    })

    await UserService.createUser(user)
    res.json(user)
  } catch (error) {
    console.log(error)
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body
    const user = await UserService.findUserByEmail(email)
    if (user) {
      const isCorrectPassword = await bcrypt.compare(password, user.password)
      console.log(password, user.password)
      if (!isCorrectPassword) {
        return next(new BadRequestError('Incorrect password'))
      }

      const loginToken = jwt.sign(
        { userId: user._id, email: user.email },
        JWT_SECRET,
        { expiresIn: '24h' }
      )
      res.json({ loginToken, user })
    } else {
      next(new NotFoundError('E-Mail address does not exist'))
    }
  } catch (error) {
    next(new BadRequestError('Internal server error, sorry dude'))
  }
}

// GET /users
export const findUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.json(await UserService.findUsers())
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

//GET specific user /user/:id

export const findUserById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.json(await UserService.findUserById(req.params.userId))
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

//GET specific user by Username

export const findUserByUserName = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.json(await UserService.findUserByUsername(req.params.username))
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

//PUT update specific user /users/:id

export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.params.userId
    const dataToUpdate = req.body
    const updatedUser = await UserService.updateUser(userId, dataToUpdate)
    res.json(updatedUser)
    console.log(updatedUser)
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

//DELETE user

export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.json(await UserService.deleteUser(req.params.userId))
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

// PATCH ADD Investment to User

export const addInvestmentToUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.params.userId
    const investmentId = req.params.investmentId
    const updatedUser = await UserService.addInvestmentToUser(
      userId,
      investmentId
    )
    res.json(updatedUser)
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

// PATCH ADD Income to User

export const addIncomeToUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.params.userId
    const incomeId = req.params.incomeId
    const updatedUser = await UserService.addIncomeToUser(userId, incomeId)
    res.json(updatedUser)
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

// PATCH ADD Expense to User

export const addExpenseToUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.params.userId
    const expenseId = req.params.expenseId
    const updatedUser = await UserService.addExpenseToUser(userId, expenseId)
    res.json(updatedUser)
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

// PATCH ADD Budget to User

export const addBudgetToUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.params.userId
    const budgetId = req.params.expenseId
    const updatedUser = await UserService.addExpenseToUser(userId, budgetId)
    res.json(updatedUser)
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

// PATCH ADD Image to User

export const addImageToUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.params.userId
    const imageId = req.params.imageId
    const updatedUser = await UserService.addImageToUser(userId, imageId)
    res.json(updatedUser)
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}
