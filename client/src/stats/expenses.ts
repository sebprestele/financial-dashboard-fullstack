//@ts-nocheck
import { useSelector } from "react-redux";
import { RootState } from "../Redux/store";

const ExpensesFunctions = () => {
  //Setup CONSTANTS for month and year
  const currentMonth = "0" + (new Date().getMonth() + 1);
  const prevMonth = "0" + new Date().getMonth();
  const prevTwoMonths = "0" + (new Date().getMonth() - 1);
  const currentYear = new Date().getFullYear();
  const currentMonthYear = currentYear + "-" + currentMonth;
  const lastMonthYear = currentYear + "-" + prevMonth;
  const lastTwoMonthYear = currentYear + "-" + prevTwoMonths;

  // Set initial value for calculations
  let initialValue = 0;

  //Get userData from Redux Store
  const userData = useSelector((state: RootState) => state.user.user);

  //Variable that displays the expense date as YYYY-MM
  const dateExpense = userData.expense.map((expense: any) =>
    expense.date ? expense.date.slice(0, 7) : ""
  );

  // ----- FILTER FUNCTIONS ----

  // Filter function to get current month expenses
  const filteredByMonth = userData.expense.filter((expense: any) =>
    expense.date ? expense.date.slice(0, 7) === currentMonthYear : ""
  );

  // Filter function to get prev month expenses
  const filteredByPrevMonth = userData.expense.filter(
    (expense: any) => expense.date && expense.date.slice(0, 7) === lastMonthYear
  );

  // Filter function to get 2months ago expenses
  const filteredByPrevTwoMonth = userData.expense.filter((expense: any) =>
    expense.date ? expense.date.slice(0, 7) === lastTwoMonthYear : ""
  );

  /*----  get MONTHLY EXPENSES---- */

  // Get total expense value
  const totalExpenses = userData.expense.reduce(
    (sum: Number, currentValue: Number) => {
      //@ts-ignore
      return sum + currentValue.amount;
    },
    initialValue
  );

  // Get total monthly expenses for current month
  const monthlyExpenses = filteredByMonth.reduce(
    (sum: Number, currentValue: Number) => {
      //@ts-ignore
      return sum + currentValue.amount;
    },
    initialValue
  );

  // Get total monthly expenses for previous month
  const prevMonthlyExpenses = filteredByPrevMonth.reduce(
    (sum: Number, currentValue: Number) => {
      //@ts-ignore
      return sum + currentValue.amount;
    },
    initialValue
  );

  // Get total monthly expenses for two months ago

  const prevTwoMonthlyExpenses = filteredByPrevTwoMonth.reduce(
    (sum: Number, currentValue: Number) => {
      //@ts-ignore
      return sum + currentValue.amount;
    },
    initialValue
  );

  /*---- Get DIFFERENCES---- */

  // Get difference in expenses between current and previous month
  const monthlyDifference = Math.round(
    ((monthlyExpenses - prevMonthlyExpenses) / monthlyExpenses) * 100
  );

  // Get difference in expenses between prev and previous month
  const prevTwoMonthlyDifference = Math.round(
    ((prevMonthlyExpenses - prevTwoMonthlyExpenses) / prevMonthlyExpenses) * 100
  );

  /*---- Get EXPENSES BY MONTH---- */

  // Get expenses for each month
  const expensesByMonth = {};
  userData.expense.forEach((item: Object) => {
    if (expensesByMonth[item.date && item.date.slice(0, 7)] === undefined) {
      expensesByMonth[item.date && item.date.slice(0, 7)] = [];
    }
    expensesByMonth[item.date && item.date.slice(0, 7)].push(item);
  });

  //Add all monthly expenses
  const expenseTotalsByMonth = Object.entries(expensesByMonth).map((item) =>
    item[1].reduce((sum: Number, currentValue: Number) => {
      //@ts-ignore
      return sum + currentValue.amount;
    }, initialValue)
  );

  // Create new object with key: month, value: expensetotals
  const totalExpenseByMonth = Object.keys(expensesByMonth).reduce(
    (newObject, currentValue, index) => {
      newObject[currentValue] = newObject[currentValue]
        ? newObject[currentValue] + ", " + expenseTotalsByMonth[index]
        : expenseTotalsByMonth[index];
      return newObject;
    },
    {}
  );

  /*---- Get EXPENSES BY CATEGORY---- */

  //Get all items with same category and store in object
  const expensesByCategory = {};
  userData.expense.forEach((item: Object) => {
    if (expensesByCategory[item.tag] === undefined) {
      expensesByCategory[item.tag] = [];
    }
    expensesByCategory[item.tag].push(item);
  });

  // Filter the categories and put into array
  const categoriesArray = Object.entries(expensesByCategory).filter((item) =>
    item.map((item) => item[1])
  );

  //Filter category Expenses by Month

  const filteredCategoryExpensesForCurrentMonth = categoriesArray.map((item) =>
    item[1].filter(
      (item) => item.date && item.date.slice(0, 7) === currentMonthYear
    )
  );

  //Get current Month ExpenseTotals ByCategory

  const currentMonthExpenseTotalsByCategory =
    filteredCategoryExpensesForCurrentMonth.map((item) => {
      return item.reduce((sum: Number, currentValue: Number) => {
        //@ts-ignore
        const total = sum + currentValue.amount;
        return total;
      }, initialValue);
    });

  //Get the category names for the separated categories and push to new array
  const newCategoriesArray = [];
  categoriesArray.map((item) => {
    return newCategoriesArray.push(item);
  });

  const combinedCategoryArray = newCategoriesArray.map((item) => item[0]);

  //Get totals per category -- will only return the total as number
  const totalsByCategory = categoriesArray.map((item) => {
    return item[1].reduce((sum: Number, currentValue: Number) => {
      //@ts-ignore
      const total = sum + currentValue.amount;
      return total;
    }, initialValue);
  });

  //Create object with category names and totals
  const totalExpenseByCategory = combinedCategoryArray.reduce(
    (newObject, currentValue, index) => {
      newObject[currentValue] = newObject[currentValue]
        ? newObject[currentValue] + ", " + totalsByCategory[index]
        : totalsByCategory[index];
      return newObject;
    },
    {}
  );

  //Create object with category names and monthly totals
  const totalExpenseByCategoryCurrentMonth = combinedCategoryArray.reduce(
    (newObject, currentValue, index) => {
      newObject[currentValue] = newObject[currentValue]
        ? newObject[currentValue] +
          ", " +
          currentMonthExpenseTotalsByCategory[index]
        : currentMonthExpenseTotalsByCategory[index];
      return newObject;
    },
    {}
  );

  return {
    prevMonthlyExpenses,
    prevTwoMonthlyDifference,
    monthlyExpenses,
    currentYear,
    currentMonthYear,
    monthlyDifference,
    totalExpenses,
    dateExpense,
    totalExpenseByCategory,
    totalExpenseByMonth,
    totalExpenseByCategoryCurrentMonth,
  };
};

export default ExpensesFunctions;
