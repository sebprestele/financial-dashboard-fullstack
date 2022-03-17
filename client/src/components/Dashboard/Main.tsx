import { Container, Grid, Text } from "@mantine/core";
import { IncomeExpenseOverviewTable } from "../Dashboard/IncomeExpenseOverviewTable";
import { StatsOverview } from "../Dashboard/StatsOverview";
import { SavingsGoalOverview } from "./SavingsGoalOverview";

const Main = () => {
  return (
    <Container>
      <Text weight={500} size="lg" align="center" mb={10}>
        Financial Overview
      </Text>

      <StatsOverview />
      <Grid mt={50}>
        <Grid.Col md={8}>
          <Text weight={500} size="lg" mb={10}>
            Latest Income/Expenses
          </Text>
          <IncomeExpenseOverviewTable />
        </Grid.Col>
        <Grid.Col md={4}>
          <Text weight={500} size="lg" mb={10}>
            Saving Tracker
          </Text>
          <SavingsGoalOverview />
        </Grid.Col>
      </Grid>
    </Container>
  );
};

export default Main;
