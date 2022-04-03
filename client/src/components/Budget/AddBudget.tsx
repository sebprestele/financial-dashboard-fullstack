import {
  TextInput,
  Textarea,
  NumberInput,
  Button,
  Group,
  Box,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import axios from "axios";
import { useDispatch } from "react-redux";
import { CurrencyEuro } from "tabler-icons-react";

import { setSingleUser } from "../../Redux/userSlice";
import { setModalState } from "../../Redux/helperSlice";

function AddBudget() {
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("currentToken");
  const dispatch = useDispatch();

  const form = useForm({
    initialValues: {
      title: "Random budget",
      budget: 0,
      tag: "Uncategorized",
      comments: "",
    },
    validate: (values) => ({
      name: values.title === undefined ? "Name is required" : null,
      amount: values.budget === undefined ? "Budget is required" : null,
    }),
  });

  return (
    <Box sx={{ maxWidth: 300 }} mx="auto">
      <form
        onSubmit={form.onSubmit(async (values) => {
          try {
            await axios
              .post(
                `https://finans-fullstack-app-server.herokuapp.com/api/v1/budget/${userId}`,
                values
              )
              .then((res) => console.log(res));
            form.reset();
            await fetch(
              `https://finans-fullstack-app-server.herokuapp.com/api/v1/users/${userId}`,
              {
                method: "GET",
                headers: { Authorization: `Bearer ${token}` },
              }
            )
              .then((res) => res.json())
              .then((data) => {
                dispatch(setSingleUser(data));
                console.log(data);
              });
          } catch (error) {
            console.log(error);
          }
          dispatch(setModalState());
        })}
      >
        <TextInput
          required
          label="Name"
          placeholder="Add a name for this budget"
          {...form.getInputProps("title")}
        />
        <NumberInput
          placeholder="Amount"
          label="Set budget amount"
          icon={<CurrencyEuro size={16} />}
          required
          {...form.getInputProps("budget")}
        />
        <TextInput
          label="Category"
          placeholder="Add a category for this budget"
          {...form.getInputProps("tag")}
        />
        <Textarea
          label="Comments"
          placeholder="Add additional comments"
          {...form.getInputProps("comments")}
        />

        <Group position="right" mt="md">
          <Button type="submit">Save</Button>
        </Group>
      </form>
    </Box>
  );
}
export default AddBudget;
