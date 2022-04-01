import { useSelector } from "react-redux";

const PortfolioFunctions = () => {
  // Set initial value for calculations
  let initialValue = 0;

  // Get userData from Redux Store & map investments
  const userData = useSelector((state) => state.user.user);
  const investment = userData.investments.map((investment) => investment);

  // Get item Totals Quantity * price
  //Would be better to do on backend, but this also works
  const priceBought = investment.map((item) =>
    Object.values(item.price).map((item) => item.priceBought)
  );
  const quantity = investment.map((item) => item.quantity);
  const totals = [];
  const priceTotals = (function () {
    for (let i = 0; i < (quantity.length, priceBought.length); i++) {
      totals.push(priceBought[i] * quantity[i]);
    }
  })();

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
    priceTotals,
  };
};
export default PortfolioFunctions;
