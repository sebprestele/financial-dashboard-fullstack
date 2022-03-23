import { Container, Paper, SimpleGrid } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";

import { ExpenseOverview } from "./ExpenseOverview";
import ExpenseOverviewChart from "./ExpenseCategoryChart";
import { ExpenseOverviewTable } from "./ExpenseOverviewTable";
import ExpensesMonthlyChart from "./ExpensesMonthlyChart";

const Main = () => {
  const largeScreen = useMediaQuery("(min-width: 1300px)");
  return (
    <Container ml={largeScreen ? 600 : 250} mt={largeScreen ? 60 : 20}>
      <Paper radius="md" p={30}>
        <ExpenseOverview />
        <SimpleGrid cols={2}>
          <ExpenseOverviewChart />
          <ExpensesMonthlyChart />
        </SimpleGrid>
      </Paper>

      <ExpenseOverviewTable />
    </Container>
  );
};

export default Main;
