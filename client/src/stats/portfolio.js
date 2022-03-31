import { useSelector } from "react-redux";

const PortfolioFunctions = () => {
  //Setup CONSTANTS for month and year
  const currentMonth = "0" + (new Date().getMonth() + 1);
  const prevMonth = "0" + new Date().getMonth();
  const currentYear = new Date().getFullYear();
  const currentMonthYear = currentYear + "-" + currentMonth;
  const lastMonthYear = currentYear + "-" + prevMonth;

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
  console.log(categoriesArray);

  // Get priceBought from categories
  const categoryPriceBought = categoriesArray.map((item) =>
    Object.values(item[1]).map((item) =>
      Object.values(item.price)
        .map((item) => item.priceBought)
        .reduce((sum, currentValue) => {
          return sum + currentValue;
        })
    )
  );

  // Get totals per category -- will only return the total as number
  const totalsByCategory = categoryPriceBought.map((item) =>
    item.reduce((sum, currentValue) => sum + currentValue, initialValue)
  );

  // Get total value of all categories

  const totalPortfolioValue = totalsByCategory.reduce(
    (sum, currentValue) => sum + currentValue,
    initialValue
  );

  // Create object with category names and totals
  const totalInvestmentsByCategory = combinedCategoryArray.reduce(
    (newObject, currentValue, index) => {
      newObject[currentValue] = newObject[currentValue]
        ? newObject[currentValue] + ", " + totalsByCategory[index]
        : totalsByCategory[index];
      return newObject;
    },
    {}
  );

  return {
    combinedCategoryArray,
    totalInvestmentsByCategory,
    totalsByCategory,
    totalPortfolioValue,
  };
};
export default PortfolioFunctions;
