import { Drawer, Button, Group } from "@mantine/core";
import { useState } from "react";

import EditProfile from "./EditProfile";

function EditProfileButton() {
  const [opened, setOpened] = useState(false);

  return (
    <>
      <Drawer
        opened={opened}
        onClose={() => setOpened(false)}
        title="Edit your profile"
        padding="xl"
        size="xl"
      >
        <EditProfile />
      </Drawer>
      <Group position="center">
        <Button
          onClick={() => setOpened(true)}
          variant="light"
          color="indigo"
          compact
          fullWidth
          mb="sm"
        >
          Edit Profile
        </Button>
      </Group>
    </>
  );
}

export default EditProfileButton;
