import {
  TextInput,
  Button,
  Group,
  Box,
  Avatar,
  Center,
  Modal,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import axios from "axios";

import { RootState } from "../../Redux/store";
import { setSingleUser } from "../../Redux/userSlice";
import ImageUpload from "../ImageUpload/ImageUpload";

export default function EditProfile() {
  const dispatch = useDispatch();

  //Get JWT Token and userData and setup the form values
  const token = localStorage.getItem("currentToken");
  const userData = useSelector((state: RootState) => state.user.user);
  const { email, username, firstName, lastName, _id, image } = userData;
  const form = useForm({
    initialValues: {
      username: username,
      email: email,
      firstName: firstName,
      lastName: lastName,
      newPassword: "",
      image: image,
    },

    validate: {},
  });

  //set state for the Upload Image Modal
  const [opened, setOpened] = useState(false);

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
            })

            .catch((error) => console.log(error.message))
        )}
      >
        <Center>
          <Avatar radius="xl" alt="it's me" size="lg" mb={10} />
        </Center>
        <Modal
          opened={opened}
          onClose={() => setOpened(false)}
          title="Upload a profile image!"
        >
          <ImageUpload />
        </Modal>
        <Group position="center">
          <Button
            onClick={() => setOpened(true)}
            variant="light"
            color="indigo"
            compact
            mb="sm"
          >
            Upload Image
          </Button>
        </Group>

        <TextInput
          label="Email"
          placeholder={email}
          {...form.getInputProps("email")}
        />
        <TextInput
          label="Username"
          placeholder={username ? "username" : "Insert your username"}
          {...form.getInputProps("username")}
        />
        <TextInput
          label="Firstname"
          placeholder={firstName ? "firstName" : "Insert your firstname"}
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
