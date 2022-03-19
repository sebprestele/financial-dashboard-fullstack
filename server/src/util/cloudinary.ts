// @typescript-eslint/camelcase
import dotenv from 'dotenv'

dotenv.config({ path: '.env' })

// CLoudinary config
const cloudinary = require('cloudinary').v2
cloudinary.config({
  /* eslint-disable  @typescript-eslint/camelcase */
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  /* eslint-enable  @typescript-eslint/camelcase */
})

module.exports = { cloudinary }
