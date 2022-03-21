import {
  TextInput,
  Textarea,
  NumberInput,
  Button,
  Group,
  Box,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { DatePicker } from "@mantine/dates";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setSingleUser } from "../../Redux/userSlice";

function AddIncome() {
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("currentToken");
  const dispatch = useDispatch();

  const form = useForm({
    initialValues: {
      name: "",
      amount: 0,
      date: "",
      tag: "Uncategorized",
      comments: "",
    },

    validate: {},
  });

  return (
    <Box sx={{ maxWidth: 300 }} mx="auto">
      <form
        onSubmit={form.onSubmit(async (values) => {
          try {
            await axios
              .post(`http://localhost:5000/api/v1/income/${userId}`, values)
              .then((res) => console.log(res));
            form.reset();
            await fetch(`http://localhost:5000/api/v1/users/${userId}`, {
              method: "GET",
              headers: { Authorization: `Bearer ${token}` },
            })
              .then((res) => res.json())
              .then((data) => {
                dispatch(setSingleUser(data));
                console.log(data);
              });
          } catch (error) {
            console.log(error);
          }
          form.reset();
        })}
      >
        <TextInput
          required
          label="Name"
          placeholder="Add a name for this income"
          {...form.getInputProps("name")}
        />
        <NumberInput
          placeholder="Amount"
          label="Add income amount"
          required
          {...form.getInputProps("amount")}
        />
        <DatePicker
          placeholder="Pick date"
          label="Date"
          {...form.getInputProps("date")}
        />
        <TextInput
          label="Category"
          placeholder="Add a category for this income"
          {...form.getInputProps("tag")}
        />
        <Textarea
          label="Comments"
          placeholder="Add additional comments"
          {...form.getInputProps("comments")}
        />

        <Group position="right" mt="md">
          <Button type="submit">Submit</Button>
        </Group>
      </form>
    </Box>
  );
}
export default AddIncome;
