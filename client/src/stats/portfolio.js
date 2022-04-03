import { useSelector } from "react-redux";

const PortfolioFunctions = () => {
  // Set initial value for calculations
  let initialValue = 0;

  // Get userData from Redux Store & map investments
  const userData = useSelector((state) => state.user.user);
  const investment = userData.investments.map((investment) => investment);

  /*---- Get PORTFOLIO BY CATEGORY---- */

  // Get all items with same category and store in object
  const investmentsByCategory = {};
  investment.forEach((item) => {
    if (investmentsByCategory[item.category] === undefined) {
      investmentsByCategory[item.category] = [];
    }
    investmentsByCategory[item.category].push(item);
  });

  // Filter the categories and put into array
  const categoriesArray = Object.entries(investmentsByCategory).filter((item) =>
    item.map((item) => item)
  );

  // Get category names from array
  const combinedCategoryArray = categoriesArray.map((item) => item[0]);

  // Get totalValues from categories

  const categoryTotals = categoriesArray.map((item) =>
    item[1]
      .map((item) => item.totalValue)
      .reduce((sum, currentValue) => {
        return sum + currentValue;
      }, initialValue)
  );

  // Get total value of all categories

  const totalPortfolioValue = categoryTotals.reduce(
    (sum, currentValue) => sum + currentValue,
    initialValue
  );

  // Create object with category names and totals
  const totalInvestmentsByCategory = combinedCategoryArray.reduce(
    (newObject, currentValue, index) => {
      newObject[currentValue] = newObject[currentValue]
        ? newObject[currentValue] + ", " + categoryTotals[index]
        : categoryTotals[index];
      return newObject;
    },
    {}
  );

  return {
    combinedCategoryArray,
    totalInvestmentsByCategory,
    categoryTotals,
    totalPortfolioValue,
  };
};
export default PortfolioFunctions;
