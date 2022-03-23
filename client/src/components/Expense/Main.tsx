import { Container, Paper, SimpleGrid, Title } from "@mantine/core";
import { ExpenseOverview } from "./ExpenseOverview";
import ExpenseOverviewChart from "./ExpenseCategoryChart";
import { ExpenseOverviewTable } from "./ExpenseOverviewTable";

const Main = () => {
  return (
    <Container my="md">
      <Title align="center" order={1} mb={30}>
        Expense Tracker
      </Title>
      <Paper radius="md">
        <ExpenseOverview />
        <ExpenseOverviewChart />
      </Paper>
      <ExpenseOverviewTable />
    </Container>
  );
};

export default Main;
