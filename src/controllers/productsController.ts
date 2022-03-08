import { Request, Response, NextFunction } from 'express'

import Product from '../models/Product'
import productService from '../services/productServices'
import { BadRequestError } from '../helpers/apiError'

// POST /users
export const addProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, price, quantity, category, isAvailable, image } = req.body

    const product = new Product({
      name,
      price,
      quantity,
      category,
      isAvailable,
      image,
    })

    await productService.addProduct(product)
    res.json(product)
  } catch (error) {
    console.log(error)
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

// GET all products /products
export const findProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.json(await productService.findProducts())
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

// GET single product by id /products/:productId
export const getProductById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.json(await productService.getProductById(req.params.productId))
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}
