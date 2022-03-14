import dotenv from 'dotenv'

dotenv.config({ path: '.env' })

export const JWT_SECRET = process.env['JWT_SECRET'] as string
