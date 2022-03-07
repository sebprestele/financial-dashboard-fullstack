import { Request, Response, NextFunction } from 'express'

import ApiError from '../helpers/apiError'
import logger from '../util/logger'

export default function(
  error: ApiError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (error.source) {
    logger.error(error.source)
  }

  res.status(error.statusCode).json({
    status: 'error',
    statusCode: error.statusCode,
    message: error.message,
  })
}
