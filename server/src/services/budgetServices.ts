import Budget, { BudgetDocument } from '../models/Budget'
import { NotFoundError } from '../helpers/apiError'

const addBudget = async (user: BudgetDocument): Promise<BudgetDocument> => {
  return user.save()
}

const findBudget = async (): Promise<BudgetDocument[]> => {
  return Budget.find()
}

const getBudgetById = async (budgetId: string): Promise<BudgetDocument> => {
  const foundBudget = await Budget.findById(budgetId)
  if (!foundBudget) {
    throw new NotFoundError(`Budget ${budgetId} not found`)
  }
  return foundBudget
}

const updateBudget = async (
  budgetId: string,
  updateBudgetData: Partial<BudgetDocument>
): Promise<BudgetDocument | null> => {
  const foundBudget = await Budget.findByIdAndUpdate(
    budgetId,
    updateBudgetData,
    { new: true }
  )
  if (!foundBudget) {
    throw new NotFoundError(`Budget ${budgetId} not found`)
  }
  return foundBudget
}

const deleteBudget = async (budgetId: string) => {
  const foundBudget = await Budget.findByIdAndDelete(budgetId)
  if (!foundBudget) {
    throw new NotFoundError(`Budget ${budgetId} not found`)
  }
  return foundBudget
}

export default {
  addBudget,
  findBudget,
  getBudgetById,
  updateBudget,
  deleteBudget,
}
