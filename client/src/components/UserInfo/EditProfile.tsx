import { TextInput, Button, Group, Box, Alert } from "@mantine/core";
import { useForm } from "@mantine/form";
import { AlertCircle } from "tabler-icons-react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

import { RootState } from "../../Redux/store";
import { setSingleUser } from "../../Redux/userSlice";

export default function EditProfile() {
  const dispatch = useDispatch();
  const token = localStorage.getItem("currentToken");
  const userData = useSelector((state: RootState) => state.user.user);
  const { email, username, firstName, lastName, _id } = userData;

  const form = useForm({
    initialValues: {
      username: "",
      email: "",
      firstName: "",
      lastName: "",
      newPassword: "",
    },

    validate: {},
  });

  return (
    <Box sx={{ maxWidth: 300 }} mx="auto">
      <form
        onSubmit={form.onSubmit((values) =>
          axios
            .put(`http://localhost:5000/api/v1/users/${_id}`, values, {
              headers: { Authorization: `Bearer ${token}` },
            })
            .then((res) => {
              dispatch(setSingleUser(res.data));
              console.log(res.data);
              form.reset();
            })

            .catch((error) => console.log(error.message))
        )}
      >
        <TextInput
          label="Email"
          placeholder={userData.email}
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
          {...form.getInputProps("firstName")}
        />
        <TextInput
          label="Lastname"
          placeholder={lastName ? lastName : "Insert your lastname"}
          {...form.getInputProps("lastName")}
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
