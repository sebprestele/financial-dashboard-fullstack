import { Container, Title } from "@mantine/core";
import { ExpenseOverview } from "./ExpenseOverview";
import { ExpenseOverviewTable } from "./ExpenseOverviewTable";

const Main = () => {
  return (
    <Container my="md">
      <Title align="center" order={1} mb={30}>
        Expense Tracker
      </Title>
      <ExpenseOverview />
      <ExpenseOverviewTable />
    </Container>
  );
};

export default Main;
