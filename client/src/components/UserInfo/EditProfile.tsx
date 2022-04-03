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
import axios from "axios";

import { RootState } from "../../Redux/store";
import { setSingleUser } from "../../Redux/userSlice";
import ImageUpload from "../ImageUpload/ImageUpload";
import { setDropzoneOpenState } from "../../Redux/helperSlice";

export default function EditProfile() {
  const dispatch = useDispatch();

  //Get JWT Token and userData and setup the form values
  const token = localStorage.getItem("currentToken");
  const userData = useSelector((state: RootState) => state.user.user);
  const { email, username, firstName, lastName, _id, image } = userData;
  const imageUrlArray = image.map((image: any) => image.imageUrl);
  const userImage = imageUrlArray[imageUrlArray.length - 1];

  const form = useForm({
    initialValues: {
      firstName: firstName,
      lastName: lastName,
      newPassword: "",
    },
    validate: {},
  });

  //set state for the Upload Image Modal
  const opened = useSelector(
    (state: RootState) => state.helper.dropZoneOpenState
  );

  return (
    <Box sx={{ maxWidth: 300 }} mx="auto">
      <form
        onSubmit={form.onSubmit(async (values) => {
          await axios.put(
            `https://finans-fullstack-app-server.herokuapp.com/api/v1/users/${_id}`,
            values,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );

          await axios
            .get(
              `https://finans-fullstack-app-server.herokuapp.com/api/v1/users/${_id}`,
              {
                headers: { Authorization: `Bearer ${token}` },
              }
            )
            .then((res) => {
              dispatch(setSingleUser(res.data));
            })
            .catch((error) => console.log(error.response.data));
        })}
      >
        <Center>
          <Avatar src={userImage} radius="xl" alt="it's me" size="lg" mb={10} />
        </Center>
        <Modal
          opened={opened}
          onClose={() => dispatch(setDropzoneOpenState())}
          title="Upload a profile image!"
        >
          <ImageUpload />
        </Modal>
        <Group position="center">
          <Button
            onClick={() => dispatch(setDropzoneOpenState())}
            variant="light"
            color="indigo"
            compact
            mb="sm"
          >
            Upload Image
          </Button>
        </Group>
        <TextInput label="Email" placeholder={email} disabled />
        <TextInput label="Username" placeholder={username} disabled />
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
