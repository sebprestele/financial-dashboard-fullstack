//Expense Types
export interface ExpenseData {
  _id?: string;
  name?: string;
  amount?: string;
  date?: string;
  tag?: string;
  comments?: string;
}

// Portfolio Types
export interface PortfolioData {
  _id?: string;
  name?: string;
  category?: string;
  amount: number | undefined;
  quantity?: Number;
  price: [{ priceBought: string; priceSold: string }];
  totalValue?: Number;
  currency?: string;
  transactionType?: string;
  fee?: Number;
  date: [{ dateBought: string; dateSold: string }];
  comments?: string;
}
export interface PortfolioStatsProps {
  data: {
    label: string;
    title: string;
    value: number;
    goal: number;
    stats: string;
    progress: number;
    color: string;
    diff: number;
    percentOfTotal: number;
  }[];
}
export interface BudgetDataProps {
  _id?: string;
  title?: string;
  icon?: string;
  budget?: number;
  tag?: string;
  comments?: string;
}

export type CategoryExpense = [string, number];
