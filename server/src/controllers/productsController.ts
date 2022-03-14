import { Request, Response, NextFunction } from 'express'

import Product from '../models/Product'
import productService from '../services/productServices'
import { BadRequestError } from '../helpers/apiError'

// POST /products
export const addProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      name,
      price,
      quantity,
      category,
      description,
      features,
      rating,
      isAvailable,
      image,
    } = req.body

    const product = new Product({
      name,
      price,
      quantity,
      category,
      description,
      features,
      rating,
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

//UPDATE single product /products/:productId

export const updateProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const updateProductData = req.body
    const productId = req.params.productId
    const updatedProduct = await productService.updateProduct(
      productId,
      updateProductData
    )
    res.json(updatedProduct)
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

// DELETE single product  /products/:productId
export const deleteProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.json(await productService.deleteProduct(req.params.productId))
    res.status(204).end()
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}
