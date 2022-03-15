import { Request, Response, NextFunction } from 'express'

import Income from '../models/Income'
import incomeService from '../services/incomeServices'
import { BadRequestError } from '../helpers/apiError'

// POST /income
export const addIncome = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, amount, date, tag, comments } = req.body

    const income = new Income({
      name,
      amount,
      date,
      tag,
      comments,
    })

    await incomeService.addIncome(income)
    res.json(income)
  } catch (error) {
    console.log(error)
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

// GET all income /income
export const findIncome = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.json(await incomeService.findIncome())
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

// GET single income by id /income/:incomeId
export const getIncomeById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.json(await incomeService.getIncomeById(req.params.incomeId))
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

//UPDATE single income /income/:incomeId

export const updateIncome = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const updateIncomeData = req.body
    const incomeId = req.params.incomeId
    const updatedIncome = await incomeService.updateIncome(
      incomeId,
      updateIncomeData
    )
    res.json(updatedIncome)
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

// DELETE single income  /income/:incomeId
export const deleteIncome = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.json(await incomeService.deleteIncome(req.params.incomeId))
    res.status(204).end()
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}
