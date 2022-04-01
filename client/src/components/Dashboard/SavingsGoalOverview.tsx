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
    item[0] === budgetData[0].tag ? item : null
  );

  return (
    <Paper radius="md" withBorder p={30}>
      <Text align="center" weight={700}>
        {budgetData[0].title}
      </Text>
      <Text color="dimmed" align="center" size="sm">
        Budget: {budgetData[0].budget} EUR
      </Text>
      <Group position="apart" mt="xs">
        <Text size="sm" color="dimmed">
          Already spent:{" "}
        </Text>
        <Text size="sm" color="dimmed">
          {/*@ts-ignore */}
          {Math.floor((categoryExpense[0][1] / budgetData[0].budget) * 100)} %
        </Text>
      </Group>
      <Progress
        //@ts-ignore
        value={Math.floor((categoryExpense[0][1] / budgetData[0].budget) * 100)}
        mt={5}
      />
      <Group position="apart" mt="md">
        <Text size="sm">
          {/*@ts-ignore */}
          Spent: {categoryExpense[0][1]} EUR
        </Text>
        <Badge size="sm">{budgetData[0].tag}</Badge>
      </Group>
    </Paper>
  );
}
