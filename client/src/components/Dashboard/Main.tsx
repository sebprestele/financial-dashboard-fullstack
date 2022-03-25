import { Container, Grid, Paper, Text, Title } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";

import { IncomeExpenseOverviewTable } from "../Dashboard/IncomeExpenseOverviewTable";
import { StatsOverview } from "../Dashboard/StatsOverview";
import { SavingsGoalOverview } from "./SavingsGoalOverview";

const Main = () => {
  const largeScreen = useMediaQuery("(min-width: 1300px)");
  return (
    <Container ml={largeScreen ? 600 : 250} mt={largeScreen ? 60 : 20}>
      <Title order={1} align="center" mb={30}>
        Financial Overview
      </Title>
      <Paper radius="md" p={30}>
        <StatsOverview />
      </Paper>

      <Grid mt={50}>
        <Grid.Col md={8}>
          <Text weight={500} size="lg" mb={10}>
            Latest Income/Expenses
          </Text>
          <IncomeExpenseOverviewTable />
        </Grid.Col>
        <Grid.Col md={4}>
          <Text weight={500} size="lg" mb={10}>
            Goal Tracker
          </Text>
          <SavingsGoalOverview />
        </Grid.Col>
      </Grid>
    </Container>
  );
};

export default Main;
