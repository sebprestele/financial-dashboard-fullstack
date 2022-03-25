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
import { useState } from "react";
import { useDispatch } from "react-redux";

import { setSingleUser } from "../../Redux/userSlice";
import { setAltModalState } from "../../Redux/helperSlice";
import {
  category,
  currency,
  cryptoCurrency,
} from "../../data/TransactionsData";

function AddInvestment() {
  //States for the conditional form field logic
  const [categoryActive, setCategoryActive] = useState("Crypto");
  const [transactionType, setTransactionType] = useState("Buy");
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("currentToken");
  const dispatch = useDispatch();

  const form = useForm({
    initialValues: {
      name: "",
      category: "Crypto",
      transactionType: "Buy",
      amount: 0,
      quantity: 0,
      date: formList([{ dateBought: new Date(), dateSold: new Date() }]),
      price: formList([{ priceBought: 0, priceSold: 0 }]),
      currency: "EUR",
      cryptoCurrency: "Bitcoin",
      fee: 0,
      comments: "",
    },

    validate: (values) => ({
      name: values.name === undefined ? "Name is required" : null,
      category: values.amount === undefined ? "Category is required" : null,
    }),
  });

  return (
    <Box sx={{ maxWidth: 300 }} mx="auto">
      <form
        onSubmit={form.onSubmit(async (values) => {
          console.log(values);
          try {
            await axios
              .post(`http://localhost:5000/api/v1/investment/${userId}`, values)
              .then((res) => console.log(res));
            form.reset();
            await fetch(`http://localhost:5000/api/v1/users/${userId}`, {
              method: "GET",
              headers: { Authorization: `Bearer ${token}` },
            })
              .then((res) => res.json())
              .then((data) => {
                dispatch(setSingleUser(data));
              });
          } catch (error) {
            console.log(error);
          }
          setCategoryActive("Crypto");
          dispatch(setAltModalState());
        })}
      >
        <TextInput
          required
          label="Name"
          placeholder="Add a name for this transaction"
          {...form.getInputProps("name")}
        />
        <Select
          style={{ marginTop: 10, zIndex: 2 }}
          data={["Buy", "Sell"]}
          placeholder="Type of transaction"
          label="Type of transaction"
          {...form.getInputProps("transactionType")}
          onChange={(value) => {
            value !== null && setTransactionType(value);
          }}
          value={transactionType}
        />
        <Select
          required
          style={{ marginTop: 10, zIndex: 2 }}
          data={category}
          placeholder="Pick a category"
          label="Category of your investment"
          {...form.getInputProps("category")}
          onChange={(value) => {
            value !== null && setCategoryActive(value);
          }}
          value={categoryActive}
        />
        {transactionType === "Buy" ? (
          <DatePicker
            style={{ marginTop: 10, zIndex: 2 }}
            placeholder="Date of transaction"
            label="Date Bought"
            {...form.getListInputProps("date", 0, "dateBought")}
          />
        ) : (
          <DatePicker
            style={{ marginTop: 10, zIndex: 2 }}
            placeholder="Date of transaction"
            label="Date Sold"
            {...form.getListInputProps("date", 0, "dateSold")}
          />
        )}

        {categoryActive === "Crypto" ? (
          <Select
            style={{ marginTop: 10, zIndex: 2 }}
            data={cryptoCurrency}
            placeholder="Pick a coin"
            label="Cryptocurrency"
            {...form.getInputProps("cryptoCurrency")}
          />
        ) : (
          <Select
            style={{ marginTop: 10, zIndex: 2 }}
            data={currency}
            placeholder="Pick a currency"
            label="Currency"
            {...form.getInputProps("currency")}
          />
        )}
        {categoryActive !== "Stocks" &&
        categoryActive !== "Crypto" &&
        categoryActive !== "ETF" &&
        categoryActive !== "Bonds" ? (
          <NumberInput
            style={{ marginTop: 10, zIndex: 2 }}
            placeholder="Amount"
            label={
              categoryActive === "Real Estate"
                ? "Property Value"
                : "Total Amount"
            }
            {...form.getInputProps("amount")}
          />
        ) : (
          <NumberInput
            style={{ marginTop: 10, zIndex: 2 }}
            placeholder="Quantity"
            label="Quantity"
            {...form.getInputProps("quantity")}
          />
        )}
        {transactionType === "Buy" ? (
          <NumberInput
            style={{ marginTop: 10, zIndex: 2 }}
            placeholder="Price"
            label="Price Bought"
            {...form.getListInputProps("price", 0, "priceBought")}
          />
        ) : (
          <NumberInput
            style={{ marginTop: 10, zIndex: 2 }}
            placeholder="Price"
            label="Price Sold"
            {...form.getListInputProps("price", 0, "priceSold")}
          />
        )}
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
