import { Request, Response, NextFunction } from 'express'

import Expense from '../models/Expense'
import expenseService from '../services/expenseServices'
import { BadRequestError } from '../helpers/apiError'
import userServices from '../services/userServices'

// POST /expense
export const addExpense = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, amount, date, tag, comments } = req.body
    const userId = req.params.userId
    const expense = new Expense({
      name,
      amount,
      date,
      tag,
      comments,
    })

    await expenseService.addExpense(expense)
    res.json(expense)

    const expenseId = expense._id

    await userServices.addExpenseToUser(userId, expenseId)
    console.log(res)
  } catch (error) {
    console.log(error)
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

// GET all expense /expense
export const findExpense = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.json(await expenseService.findExpense())
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

// GET single expense by id /expense/:expenseId
export const getExpenseById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.json(await expenseService.getExpenseById(req.params.expenseId))
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

//UPDATE single expense /expense/:expenseId

export const updateExpense = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const updateExpenseData = req.body
    const expenseId = req.params.expenseId
    const updatedExpense = await expenseService.updateExpense(
      expenseId,
      updateExpenseData
    )
    res.json(updatedExpense)
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

// DELETE single expense  /expense/:expenseId
export const deleteExpense = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.json(await expenseService.deleteExpense(req.params.expenseId))
    res.status(204).end()
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}
