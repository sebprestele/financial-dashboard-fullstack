import { Button, Group, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { DatePicker } from "@mantine/dates";
import { CurrencyEuro } from "tabler-icons-react";
import axios from "axios";
import { useDispatch } from "react-redux";

import { setSingleUser } from "../../Redux/userSlice";
import { setModalState } from "../../Redux/helperSlice";
import { ExpenseData } from "../../types/types";

const EditExpense = (rowDetails: ExpenseData) => {
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("currentToken");
  const dispatch = useDispatch();

  const form = useForm({
    initialValues: {
      name: rowDetails.name,
      amount: rowDetails.amount,
      date: rowDetails.date,
      tag: rowDetails.tag,
      comments: rowDetails.comments,
    },

    validate: (values) => ({
      name: values.name === undefined ? "Name is required" : null,
      amount: values.amount === undefined ? "Amount is required" : null,
      date: values.date === undefined ? "Date is required" : null,
      tag: values.tag === undefined ? "Category is required" : null,
    }),
  });

  return (
    <>
      <form
        onSubmit={form.onSubmit(async (values) => {
          try {
            await axios
              .put(
                `https://finans-fullstack-app-server.herokuapp.com/api/v1/expense/${rowDetails._id}`,
                values
              )
              .then((res) => console.log(res));
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
          placeholder={rowDetails.name}
          {...form.getInputProps("name")}
        />
        <TextInput
          required
          icon={<CurrencyEuro size={16} />}
          label="Amount"
          placeholder={rowDetails.amount}
          {...form.getInputProps("amount")}
        />
        <DatePicker
          required
          label="Date"
          placeholder={rowDetails.date && rowDetails.date.substring(0, 10)}
          {...form.getInputProps("date")}
        />
        <TextInput
          required
          label="Category"
          placeholder={rowDetails.tag}
          {...form.getInputProps("tag")}
        />
        <TextInput
          label="Comments"
          placeholder={rowDetails.comments}
          {...form.getInputProps("comments")}
        />
        <Group mt={10}>
          <Button type="submit" name="save">
            Save Details
          </Button>
          <Button
            name="delete"
            variant="outline"
            onClick={async () => {
              try {
                await axios
                  .delete(
                    `https://finans-fullstack-app-server.herokuapp.com/api/v1/expense/${rowDetails._id}`
                  )
                  .then((res) => console.log(res));
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
            }}
          >
            Delete Expense
          </Button>
        </Group>
      </form>
    </>
  );
};

export default EditExpense;
