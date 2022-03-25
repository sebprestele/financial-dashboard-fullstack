import { Button, Group, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { DatePicker } from "@mantine/dates";
import { CurrencyEuro } from "tabler-icons-react";
import { RowData } from "./PortfolioOverviewTable";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setSingleUser } from "../../Redux/userSlice";
import { setModalState } from "../../Redux/helperSlice";

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
      /*  date: formList([{ dateBought: rowDetails.dateBought, dateSold: rowDetails.dateSold }]),
      price: formList([{ priceBought: rowDetails.price, priceSold: 0 }]),
      currency: rowDetails.currency, */
      cryptoCurrency: rowDetails.cryptoCurrency,
      fee: rowDetails.fee,
      comments: rowDetails.comments,
    },

    validate: (values) => ({
      name: values.name === undefined ? "Name is required" : null,
      amount: values.amount === undefined ? "Amount is required" : null,
      //date: values.date === undefined ? "Date is required" : null,
      category: values.category === undefined ? "Category is required" : null,
    }),
  });

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
          // placeholder={rowDetails.amount}
          {...form.getInputProps("amount")}
        />
        <DatePicker
          required
          label="Date"
          //   {...form.getInputProps("date")}
        />
        <TextInput
          required
          label="Category"
          //  placeholder={rowDetails.category}
          {...form.getInputProps("category")}
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
            Delete Expense
          </Button>
        </Group>
      </form>
    </>
  );
};

export default EditInvestment;
