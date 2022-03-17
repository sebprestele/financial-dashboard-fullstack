import { TextInput, Button, Group, Box } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useSelector } from "react-redux";
import axios from "axios";

import { RootState } from "../../Redux/store";

export default function EditProfile() {
  const form = useForm({
    initialValues: {
      username: "",
      email: "",
      firstname: "",
      lastname: "",
      newPassword: "",
    },

    validate: {},
  });

  const userData = useSelector((state: RootState) => state.user.user);
  console.log(userData);
  const { email, username, firstName, lastName, _id } = userData;

  const handleSubmit = () => {
    form.onSubmit((values) => {
      axios.put(`http://localhost:5000/api/v1/user/${_id}`, {
        values,
      });
    });
  };

  return (
    <Box sx={{ maxWidth: 300 }} mx="auto">
      <form onSubmit={handleSubmit}>
        <TextInput
          label="Email"
          placeholder={email}
          {...form.getInputProps("email")}
        />
        <TextInput
          label="Username"
          placeholder={username}
          {...form.getInputProps("username")}
        />
        <TextInput
          label="Firstname"
          placeholder={firstName ? firstName : "Insert your firstname"}
          {...form.getInputProps("firstname")}
        />
        <TextInput
          label="Lastname"
          placeholder={lastName ? lastName : "Insert your lastname"}
          {...form.getInputProps("lastname")}
        />

        <TextInput
          label="NewPassword"
          placeholder="your new password"
          {...form.getInputProps("newPassword")}
        />

        <Group position="right" mt="md">
          <Button type="submit">Submit</Button>
        </Group>
      </form>
    </Box>
  );
}
