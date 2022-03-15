import Income, { IncomeDocument } from '../models/Income'
import { NotFoundError } from '../helpers/apiError'

const addIncome = async (user: IncomeDocument): Promise<IncomeDocument> => {
  return user.save()
}

const findIncome = async (): Promise<IncomeDocument[]> => {
  return Income.find()
}

const getIncomeById = async (incomeId: string): Promise<IncomeDocument> => {
  const foundIncome = await Income.findById(incomeId)
  if (!foundIncome) {
    throw new NotFoundError(`Income ${incomeId} not found`)
  }
  return foundIncome
}

const updateIncome = async (
  incomeId: string,
  updateIncomeData: Partial<IncomeDocument>
): Promise<IncomeDocument | null> => {
  const foundIncome = await Income.findByIdAndUpdate(
    incomeId,
    updateIncomeData,
    { new: true }
  )
  if (!foundIncome) {
    throw new NotFoundError(`Income ${incomeId} not found`)
  }
  return foundIncome
}

const deleteIncome = async (incomeId: string) => {
  const foundIncome = await Income.findByIdAndDelete(incomeId)
  if (!foundIncome) {
    throw new NotFoundError(`Income ${incomeId} not found`)
  }
  return foundIncome
}

export default {
  addIncome,
  findIncome,
  getIncomeById,
  updateIncome,
  deleteIncome,
}
