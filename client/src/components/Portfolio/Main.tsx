import { Container, Modal, Paper, SimpleGrid, Title } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { Edit } from "tabler-icons-react";
import { useDispatch, useSelector } from "react-redux";

import PortfolioTotals from "./PortfolioTotals";
import { PortfolioOverview } from "./PortfolioOverview";
import PortfolioByCategoryChart from "./PortfolioByCategoryChart";
import { PortfolioOverviewTable } from "./PortfolioOverviewTable";
import { RootState } from "../../Redux/store";
import { setGoalsModalState } from "../../Redux/helperSlice";
import GoalEditForm from "./EditGoalsForm";

const Main = () => {
  const midScreen = useMediaQuery("(min-width: 1300px)");
  const largeScreen = useMediaQuery("(min-width: 1750px)");
  const dispatch = useDispatch();
  const goalsModalState = useSelector(
    (state: RootState) => state.helper.goalsModalState
  );
  return (
    <Container
      ml={largeScreen ? 600 : midScreen ? 450 : 250}
      mt={largeScreen ? 60 : 20}
    >
      <Paper radius="md" p={30}>
        <Title order={1} align="center">
          Portfolio Overview
        </Title>
        <SimpleGrid cols={2}>
          <PortfolioTotals />
          <PortfolioByCategoryChart />
        </SimpleGrid>
        <PortfolioOverview />
        <Edit size={17} onClick={() => dispatch(setGoalsModalState())} />
        <Modal
          opened={goalsModalState}
          onClose={() => dispatch(setGoalsModalState())}
          title="Edit Goals"
          transition="pop-top-right"
        >
          <GoalEditForm />
        </Modal>
      </Paper>
      <PortfolioOverviewTable />
    </Container>
  );
};

export default Main;
