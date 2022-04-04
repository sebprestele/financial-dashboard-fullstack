import { Progress, Text, Group, Badge, Paper } from "@mantine/core";
import { RootState } from "../../Redux/store";
import ExpensesFunctions from "../../stats/expenses";
import { useSelector } from "react-redux";

export function SavingsGoalOverview() {
  // Expense Data by category
  const { totalExpenseByCategoryCurrentMonth } = ExpensesFunctions();
  const expenseData = Object.entries(totalExpenseByCategoryCurrentMonth).map(
    (item) => item
  );

  // Budget Data from Redux Store
  const budgetData = useSelector((state: RootState) => state.user.user.budget);

  // Check if categories of expenses and budget are the same
  const categoryExpense = expenseData.filter((item) =>
    item[0].toLowerCase() === budgetData[0].tag.toLowerCase() ? item : null
  );

  return (
    budgetData && (
      <Paper radius="md" withBorder p={30}>
        <Text align="center" weight={700}>
          {budgetData.length ? budgetData[0].title : ""}
        </Text>
        <Text color="dimmed" align="center" size="sm">
          Budget: {budgetData.length ? budgetData[0].budget : 0} EUR
        </Text>
        <Group position="apart" mt="xs">
          <Text size="sm" color="dimmed">
            Already spent:
          </Text>
          <Text size="sm" color="dimmed">
            {expenseData.length && categoryExpense
              ? //@ts-ignore
                Math.floor((categoryExpense[0][1] / budgetData[0].budget) * 100)
              : 0}
            %
          </Text>
        </Group>
        <Progress
          value={
            expenseData.length && categoryExpense
              ? //@ts-ignore
                Math.floor((categoryExpense[0][1] / budgetData[0].budget) * 100)
              : 0
          }
          mt={5}
        />
        <Group position="apart" mt="md">
          <Text size="sm">
            {/*@ts-ignore */}
            Spent:{" "}
            {expenseData.length && categoryExpense
              ? categoryExpense[0][1]
              : 0}{" "}
            EUR
          </Text>
          <Badge size="sm">{budgetData.length && budgetData[0].tag}</Badge>
        </Group>
      </Paper>
    )
  );
}
