import { Container, Tabs, Title } from "@mantine/core";

import { IncomeOverviewTable } from "./IncomeOverviewTable";
import { ExpenseOverviewTable } from "./ExpenseOverviewTable";
import { BalanceOverview } from "./BalanceOverview";

const Main = () => {
  return (
    <Container my="md">
      <Title align="center" order={1} mb={30}>
        Expense Tracker
      </Title>
      <BalanceOverview />
      <Tabs>
        <Tabs.Tab label="Income">
          <IncomeOverviewTable />
        </Tabs.Tab>
        <Tabs.Tab label="Expense">
          <ExpenseOverviewTable />
        </Tabs.Tab>
      </Tabs>
    </Container>
  );
};

export default Main;
