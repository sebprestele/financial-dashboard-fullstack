import { Request, Response, NextFunction } from 'express'

import Investment from '../models/Investment'
import investmentService from '../services/investmentServices'
import { BadRequestError } from '../helpers/apiError'
import userServices from '../services/userServices'

// POST /investments
export const addInvestment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      name,
      amount,
      quantity,
      price,
      date,
      currency,
      cryptoCurrency,
      totalValue,
      comments,
      category,
    } = req.body
    const userId = req.params.userId

    const investment = new Investment({
      name,
      amount,
      quantity,
      price,
      date,
      currency,
      cryptoCurrency,
      totalValue,
      comments,
      category,
    })

    await investmentService.addInvestment(investment)
    res.json(investment)

    const investmentId = investment._id
    console.log(investmentId, 'investmentId')

    await userServices.addInvestmentToUser(userId, investmentId)
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

// GET all investments /investments
export const findInvestments = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.json(await investmentService.findInvestments())
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

// GET single investment by id /investments/:investmentId
export const getInvestmentById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.json(await investmentService.getInvestmentById(req.params.investmentId))
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

//UPDATE single investment /investments/:investmentId

export const updateInvestment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const updateInvestmentData = req.body
    const investmentId = req.params.investmentId
    const updatedInvestment = await investmentService.updateInvestment(
      investmentId,
      updateInvestmentData
    )
    res.json(updatedInvestment)
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

// DELETE single investment  /investments/:investmentId
export const deleteInvestment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.json(await investmentService.deleteInvestment(req.params.investmentId))
    res.status(204).end()
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}
