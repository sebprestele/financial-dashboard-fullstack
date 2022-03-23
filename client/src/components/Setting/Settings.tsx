import { Container, Paper, Title } from "@mantine/core";
import Sidebar from "../Sidebar/Sidebar";

const Settings = () => {
  return (
    <>
      <div className="general-layout">
        <Sidebar />
        <Container>
          <Paper mt={500}>
            <Title order={2} p={20}>
              This is still work in progress!
            </Title>
          </Paper>
        </Container>
      </div>
    </>
  );
};

export default Settings;
