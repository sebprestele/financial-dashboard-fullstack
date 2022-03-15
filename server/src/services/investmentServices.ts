import Investment, { InvestmentDocument } from '../models/Investment'
import { NotFoundError } from '../helpers/apiError'

const addInvestment = async (
  user: InvestmentDocument
): Promise<InvestmentDocument> => {
  return user.save()
}

const findInvestments = async (): Promise<InvestmentDocument[]> => {
  return Investment.find()
}

const getInvestmentById = async (
  investmentId: string
): Promise<InvestmentDocument> => {
  const foundInvestment = await Investment.findById(investmentId)
  if (!foundInvestment) {
    throw new NotFoundError(`Investment ${investmentId} not found`)
  }
  return foundInvestment
}

const updateInvestment = async (
  investmentId: string,
  updateInvestmentData: Partial<InvestmentDocument>
): Promise<InvestmentDocument | null> => {
  const foundInvestment = await Investment.findByIdAndUpdate(
    investmentId,
    updateInvestmentData,
    { new: true }
  )
  if (!foundInvestment) {
    throw new NotFoundError(`Investment ${investmentId} not found`)
  }
  return foundInvestment
}

const deleteInvestment = async (investmentId: string) => {
  const foundInvestment = await Investment.findByIdAndDelete(investmentId)
  if (!foundInvestment) {
    throw new NotFoundError(`Investment ${investmentId} not found`)
  }
  return foundInvestment
}

export default {
  addInvestment,
  findInvestments,
  getInvestmentById,
  updateInvestment,
  deleteInvestment,
}
