import { Button, Checkbox, Group, NumberInput, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { CurrencyEuro } from "tabler-icons-react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setSingleUser } from "../../Redux/userSlice";
import { setAltModalState } from "../../Redux/helperSlice";
import { BudgetDataProps } from "../../types/types";

const EditBudget = (budgetDetails: BudgetDataProps) => {
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("currentToken");
  const dispatch = useDispatch();

  const form = useForm({
    initialValues: {
      title: budgetDetails.title,
      budget: budgetDetails.budget,
      tag: budgetDetails.tag,
      comments: budgetDetails.comments,
    },
    validate: (values) => ({
      name: values.title === undefined ? "Name is required" : null,
      budget: values.budget === undefined ? "Amount is required" : null,
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
                `https://finans-fullstack-app-server.herokuapp.com/api/v1/budget/${budgetDetails._id}`,
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
          dispatch(setAltModalState());
        })}
      >
        <TextInput
          required
          label="Name"
          placeholder={budgetDetails.title}
          {...form.getInputProps("title")}
        />
        <NumberInput
          required
          icon={<CurrencyEuro size={16} />}
          label="Amount"
          {...form.getInputProps("budget")}
        />
        <TextInput
          required
          label="Category"
          placeholder={budgetDetails.tag}
          {...form.getInputProps("tag")}
        />
        <TextInput
          label="Comments"
          placeholder={budgetDetails.comments}
          {...form.getInputProps("comments")}
        />
        <Checkbox mt={10} label="Show on Dashboard?"></Checkbox>
        <Group mt={10}>
          <Button type="submit" name="save">
            Save
          </Button>
          <Button
            name="delete"
            variant="outline"
            onClick={async () => {
              try {
                await axios
                  .delete(
                    `https://finans-fullstack-app-server.herokuapp.com/api/v1/budget/${budgetDetails._id}`
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
              dispatch(setAltModalState());
            }}
          >
            Remove Budget
          </Button>
        </Group>
      </form>
    </>
  );
};

export default EditBudget;
