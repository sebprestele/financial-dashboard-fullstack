import { Container, Paper, Title } from "@mantine/core";
import Sidebar from "../Sidebar/Sidebar";

const Settings = () => {
  return (
    <>
      <div className="progress-container">
        <Sidebar />
        <Container>
          <Paper>
            <Title order={2} p={20}>
              This page is still work in progress!
            </Title>
          </Paper>
        </Container>
      </div>
    </>
  );
};

export default Settings;
