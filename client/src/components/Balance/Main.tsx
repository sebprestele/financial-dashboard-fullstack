import { Container, Text, SimpleGrid } from "@mantine/core";
import { useSelector } from "react-redux";

import { RootState } from "../../Redux/store";
import { IncomeOverviewTable } from "./IncomeOverviewTable";
import { ExpenseOverviewTable } from "./ExpenseOverviewTable";

const Main = () => {
  const userData = useSelector((state: RootState) => state.user.user);
  return (
    <Container my="md">
      <Text weight={700} size="xl" align="center" mb={20}>
        Income & Expenses
      </Text>
      <SimpleGrid cols={2}>
        <IncomeOverviewTable />
        <ExpenseOverviewTable />
      </SimpleGrid>
    </Container>
  );
};

export default Main;
