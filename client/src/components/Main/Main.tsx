import { Container } from "@mantine/core";

import { useSelector } from "react-redux";
import { RootState } from "../../Redux/store";

const Main = () => {
  const userData = useSelector((state: RootState) => state.user.user);
  return <Container my="md"></Container>;
};

export default Main;
