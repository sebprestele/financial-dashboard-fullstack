import { Request, Response } from 'express'
import Image from '../models/Image'
import userServices from '../services/userServices'
//import { BadRequestError } from '../helpers/apiError'

//Get cloudinary config
/* eslint-disable  @typescript-eslint/no-var-requires */
const { cloudinary } = require('../util/cloudinary')
/* eslint-enable  @typescript-eslint/no-var-requires */

// POST /upload
export const createUpload = async (req: Request, res: Response) => {
  try {
    const userId = req.body.userId
    const imageData = req.body.data
    const uploadedResponse = await cloudinary.uploader.upload(imageData, {
      /* eslint-disable  @typescript-eslint/camelcase */
      upload_preset: 'money',
      /* eslint-enable  @typescript-eslint/camelcase */
    })
    const image = new Image({
      name: req.body.name,
      imageUrl: uploadedResponse.secure_url,
      publicId: uploadedResponse.public_id,
    })
    await image.save()
    res.status(200).send({ image })
    console.log(uploadedResponse.secure_url, 'uploadedResponse')
    console.log(uploadedResponse.public_id, 'uploadedResponse')
    console.log(image._id, 'imageID')
    const imageId = image._id

    await userServices.addImageToUser(userId, imageId)
    console.log(res)
  } catch (error) {
    console.log(error)
  }
}
