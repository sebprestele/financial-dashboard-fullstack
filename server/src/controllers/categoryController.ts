import { Request, Response, NextFunction } from 'express'

import Category from '../models/Category'
import categoryService from '../services/categoryServices'
import { BadRequestError } from '../helpers/apiError'

// POST /categories
export const addCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name } = req.body

    const category = new Category({
      name,
    })

    await categoryService.addCategory(category)
    res.json(category)
  } catch (error) {
    console.log(error)
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

// GET all categories /categories
export const findCategories = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.json(await categoryService.findCategories())
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

// GET single category by id /categories/:categoryId
export const getCategoryById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.json(await categoryService.getCategoryById(req.params.categoryId))
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

//UPDATE single category /categories/:categoryId

export const updateCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const updateCategoryData = req.body
    const categoryId = req.params.categoryId
    const updatedCategory = await categoryService.updateCategory(
      categoryId,
      updateCategoryData
    )
    res.json(updatedCategory)
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

// DELETE single category  /categories/:categoryId
export const deleteCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.json(await categoryService.deleteCategory(req.params.categoryId))
    res.status(204).end()
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}
