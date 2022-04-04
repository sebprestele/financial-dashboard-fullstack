import {
  TextInput,
  Textarea,
  NumberInput,
  Button,
  Group,
  Box,
  Select,
} from "@mantine/core";
import { useForm, formList } from "@mantine/form";
import { DatePicker } from "@mantine/dates";
import axios from "axios";
import { useDispatch } from "react-redux";

import { setSingleUser } from "../../Redux/userSlice";
import { setAltModalState } from "../../Redux/helperSlice";
import {
  category,
  currency,
  //transactionType,
} from "../../data/TransactionsData";

function AddInvestment() {
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("currentToken");
  const dispatch = useDispatch();

  const form = useForm({
    initialValues: {
      name: "Random Investment",
      category: "Uncategorized",
      //transactionType: "Buy",
      amount: 0,
      quantity: 1,
      totalValue: 0,
      date: formList([{ dateBought: new Date(), dateSold: new Date() }]),
      price: formList([{ priceBought: 0, priceSold: 0 }]),
      currency: "EUR",
      fee: 0,
      comments: "",
    },
    validate: (values) => ({
      name: values.name === undefined ? "Name is required" : null,
    }),
  });

  return (
    <Box sx={{ maxWidth: 300 }} mx="auto">
      <form
        onSubmit={form.onSubmit(async (values) => {
          values.totalValue =
            form.values.quantity *
            //@ts-ignore
            Object.entries(form.values.price).map(
              (item) => item[1].priceBought
            );
          try {
            await axios
              .post(
                `https://finans-fullstack-app-server.herokuapp.com/api/v1/investment/${userId}`,
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
          form.reset();
          dispatch(setAltModalState());
        })}
      >
        <TextInput
          required
          label="Name"
          placeholder="Add a name for this transaction"
          {...form.getInputProps("name")}
        />
        {/*   <Select
          style={{ marginTop: 10, zIndex: 2 }}
          data={transactionType}
          placeholder="Type of transaction"
          label="Type of transaction"
          {...form.getInputProps("transactionType")}
        /> */}
        <Select
          style={{ marginTop: 10, zIndex: 2 }}
          data={category}
          placeholder="Pick a category"
          label="Category of your investment"
          {...form.getInputProps("category")}
        />
        <DatePicker
          style={{ marginTop: 10, zIndex: 2 }}
          placeholder="Date of transaction"
          label="Date of transaction"
          {...form.getListInputProps("date", 0, "dateBought")}
        />
        <Select
          style={{ marginTop: 10, zIndex: 2 }}
          data={currency}
          placeholder="Pick a currency"
          label="Currency"
          {...form.getInputProps("currency")}
        />
        <NumberInput
          decimalSeparator="."
          step={0.01}
          precision={5}
          style={{ marginTop: 10, zIndex: 2 }}
          placeholder="Quantity"
          label="Quantity"
          {...form.getInputProps("quantity")}
        />
        <NumberInput
          decimalSeparator="."
          precision={2}
          step={0.01}
          style={{ marginTop: 10, zIndex: 2 }}
          placeholder="Price"
          label="Price Bought / Sold"
          {...form.getListInputProps("price", 0, "priceBought")}
        />
        <NumberInput
          style={{ marginTop: 10, zIndex: 2 }}
          placeholder="Fee"
          label="Total Value"
          disabled
          value={
            form.values.quantity *
            //@ts-ignore
            Object.entries(form.values.price).map((item) => item[1].priceBought)
          }
        />
        <NumberInput
          style={{ marginTop: 10, zIndex: 2 }}
          placeholder="Fee"
          label="Add any fees"
          {...form.getInputProps("fee")}
        />
        <Textarea
          style={{ marginTop: 10, zIndex: 2 }}
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
export default AddInvestment;
