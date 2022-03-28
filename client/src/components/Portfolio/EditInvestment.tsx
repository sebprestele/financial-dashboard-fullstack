import { Button, Group, NumberInput, Select, TextInput } from "@mantine/core";
import { formList, useForm } from "@mantine/form";
import { DatePicker } from "@mantine/dates";
import { useDispatch } from "react-redux";
import axios from "axios";

import { RowData } from "./PortfolioOverviewTable";
import { setSingleUser } from "../../Redux/userSlice";
import { setModalState } from "../../Redux/helperSlice";
import {
  category,
  currency,
  transactionType,
} from "../../data/TransactionsData";

const EditInvestment = (rowDetails: RowData) => {
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("currentToken");
  const dispatch = useDispatch();

  console.log(rowDetails);

  const form = useForm({
    initialValues: {
      name: rowDetails.name,
      amount: rowDetails.amount,
      category: rowDetails.category,
      transactionType: rowDetails.transactionType,
      quantity: rowDetails.quantity,
      date: formList([
        {
          dateBought: rowDetails.date[0].dateBought,
          dateSold: rowDetails.date[0].dateSold,
        },
      ]),
      price: formList([{ priceBought: rowDetails.price, priceSold: 0 }]),
      currency: rowDetails.currency,
      fee: rowDetails.fee,
      comments: rowDetails.comments,
    },

    validate: (values) => ({
      name: values.name === undefined ? "Name is required" : null,
      amount: values.amount === undefined ? "Amount is required" : null,
      date: values.date === undefined ? "Date is required" : null,
      category: values.category === undefined ? "Category is required" : null,
    }),
  });

  console.log(rowDetails.date[0].dateBought);

  return (
    <>
      <form
        onSubmit={form.onSubmit(async (values) => {
          try {
            await axios
              .put(
                `http://localhost:5000/api/v1/investment/${rowDetails._id}`,
                values
              )
              .then((res) => console.log(res));
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
          dispatch(setModalState());
        })}
      >
        <TextInput
          required
          label="Name"
          placeholder={rowDetails.name}
          {...form.getInputProps("name")}
        />
        <Select
          style={{ marginTop: 10, zIndex: 2 }}
          data={transactionType}
          placeholder="Type of transaction"
          label="Type of transaction"
          {...form.getInputProps("transactionType")}
        />
        <DatePicker
          style={{ marginTop: 10, zIndex: 2 }}
          placeholder={rowDetails.date[0].dateBought.slice(0, 10)}
          label="Date of transaction"
          {...form.getListInputProps("date", 0, "dateBought")}
        />
        <Select
          style={{ marginTop: 10, zIndex: 2 }}
          data={category}
          placeholder="Pick a category"
          label="Category of your investment"
          {...form.getInputProps("category")}
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
          style={{ marginTop: 10, zIndex: 2 }}
          placeholder="Quantity"
          label="Quantity"
          {...form.getInputProps("quantity")}
        />
        <NumberInput
          decimalSeparator="."
          step={0.01}
          style={{ marginTop: 10, zIndex: 2 }}
          placeholder="Price"
          label="Price Bought / Sold"
          {...form.getListInputProps("price", 0, "priceBought")}
        />
        <NumberInput
          style={{ marginTop: 10, zIndex: 2 }}
          placeholder="Fee"
          label="Add any fees"
          {...form.getInputProps("fee")}
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
                    `http://localhost:5000/api/v1/investment/${rowDetails._id}`
                  )
                  .then((res) => console.log(res, "delete response"));
                await fetch(`http://localhost:5000/api/v1/users/${userId}`, {
                  method: "GET",
                  headers: { Authorization: `Bearer ${token}` },
                })
                  .then((res) => res.json())
                  .then((data) => {
                    dispatch(setSingleUser(data));
                    console.log(data, "deleted updated user details");
                  });
              } catch (error) {
                console.log(error);
              }
              dispatch(setModalState());
            }}
          >
            Delete Transaction
          </Button>
        </Group>
      </form>
    </>
  );
};

export default EditInvestment;
