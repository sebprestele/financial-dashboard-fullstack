import { Container, SimpleGrid, Title } from "@mantine/core";
import { ExpenseOverview } from "./ExpenseOverview";
import ExpenseOverviewChart from "./ExpenseCategoryChart";
import { ExpenseOverviewTable } from "./ExpenseOverviewTable";

const Main = () => {
  return (
    <Container my="md">
      <Title align="center" order={1} mb={30}>
        Expense Tracker
      </Title>
      <ExpenseOverview />
      <ExpenseOverviewChart />
      <ExpenseOverviewTable />
    </Container>
  );
};

export default Main;
