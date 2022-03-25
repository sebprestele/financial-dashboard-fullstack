import { Container, Paper, SimpleGrid } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import PortfolioTotalsChart from "./PortfolioTotalsChart";

import { PortfolioOverview } from "./PortfolioOverview";
import PortfolioCategoryChart from "./PortfolioCategoryChart";
import { PortfolioOverviewTable } from "./PortfolioOverviewTable";

const Main = () => {
  const largeScreen = useMediaQuery("(min-width: 1300px)");
  return (
    <Container ml={largeScreen ? 600 : 250} mt={largeScreen ? 60 : 20}>
      <Paper radius="md" p={30}>
        <PortfolioOverview />
        <SimpleGrid cols={2}>
          <PortfolioCategoryChart />
          <PortfolioTotalsChart />
        </SimpleGrid>
      </Paper>
      <PortfolioOverviewTable />
    </Container>
  );
};

export default Main;
