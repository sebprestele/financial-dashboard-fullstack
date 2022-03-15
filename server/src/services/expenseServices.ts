import Expense, { ExpenseDocument } from '../models/Expense'
import { NotFoundError } from '../helpers/apiError'

const addExpense = async (user: ExpenseDocument): Promise<ExpenseDocument> => {
  return user.save()
}

const findExpense = async (): Promise<ExpenseDocument[]> => {
  return Expense.find()
}

const getExpenseById = async (expenseId: string): Promise<ExpenseDocument> => {
  const foundExpense = await Expense.findById(expenseId)
  if (!foundExpense) {
    throw new NotFoundError(`Expense ${expenseId} not found`)
  }
  return foundExpense
}

const updateExpense = async (
  expenseId: string,
  updateExpenseData: Partial<ExpenseDocument>
): Promise<ExpenseDocument | null> => {
  const foundExpense = await Expense.findByIdAndUpdate(
    expenseId,
    updateExpenseData,
    { new: true }
  )
  if (!foundExpense) {
    throw new NotFoundError(`Expense ${expenseId} not found`)
  }
  return foundExpense
}

const deleteExpense = async (expenseId: string) => {
  const foundExpense = await Expense.findByIdAndDelete(expenseId)
  if (!foundExpense) {
    throw new NotFoundError(`Expense ${expenseId} not found`)
  }
  return foundExpense
}

export default {
  addExpense,
  findExpense,
  getExpenseById,
  updateExpense,
  deleteExpense,
}
