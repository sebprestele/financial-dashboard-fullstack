import { Button, Container, Modal, Paper } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { useDispatch, useSelector } from "react-redux";
import { setModalState } from "../../Redux/helperSlice";
import { RootState } from "../../Redux/store";
import AddBudget from "./AddBudget";
import { BudgetOverview } from "./BudgetOverview";

const Main = () => {
  const midScreen = useMediaQuery("(min-width: 1300px)");
  const largeScreen = useMediaQuery("(min-width: 1750px)");
  const dispatch = useDispatch();
  const opened = useSelector((state: RootState) => state.helper.modalState);
  return (
    <Container
      ml={largeScreen ? 600 : midScreen ? 450 : 250}
      mt={largeScreen ? 60 : 20}
    >
      <Paper radius="md" p={largeScreen ? 150 : 50} shadow="lg">
        <BudgetOverview />
        <Button mt={30} onClick={() => dispatch(setModalState())}>
          Add new budget
        </Button>
      </Paper>
      <Modal opened={opened} onClose={() => dispatch(setModalState())}>
        <AddBudget />
      </Modal>
    </Container>
  );
};

export default Main;
