import { Container, Grid, Paper, Text, Title } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";

import { StatsOverview } from "../Dashboard/StatsOverview";
import { IncomeExpenseOverviewTable } from "./IncomeExpenseOverviewTable";
import { SavingsGoalOverview } from "./SavingsGoalOverview";

const Main = () => {
  const midScreen = useMediaQuery("(min-width: 1300px)");
  const largeScreen = useMediaQuery("(min-width: 1750px)");
  return (
    <Container
      ml={largeScreen ? 600 : midScreen ? 450 : 250}
      mt={largeScreen ? 60 : 20}
    >
      <Paper radius="md" p={60}>
        <Title order={1} align="center" mb={30}>
          Financial Overview
        </Title>
        <StatsOverview />
      </Paper>
      <Grid mt={50}>
        <Grid.Col md={8}>
          <Text weight={500} size="lg" mb={10}>
            Latest Expenses
          </Text>
          <IncomeExpenseOverviewTable />
        </Grid.Col>
        <Grid.Col md={4}>
          <Text weight={500} size="lg" mb={10}>
            Budget Tracker
          </Text>
          <SavingsGoalOverview />
        </Grid.Col>
      </Grid>
    </Container>
  );
};

export default Main;
