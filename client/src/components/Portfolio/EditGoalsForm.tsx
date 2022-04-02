import { Text, Box, Button, Group, NumberInput } from "@mantine/core";
import { useForm } from "@mantine/hooks";
import { useDispatch, useSelector } from "react-redux";

import { setUserGoals } from "../../Redux/userSlice";
import { RootState } from "../../Redux/store";
import { setGoalsModalState } from "../../Redux/helperSlice";

export default function GoalEditForm() {
  const dispatch = useDispatch();
  const goals = useSelector((state: RootState) => state.user.goals);
  const form = useForm({
    initialValues: {
      totalValueGoal: goals.totalValueGoal,
      cryptoPercentGoal: goals.cryptoPercentGoal,
      stockPercentGoal: goals.stockPercentGoal,
      cashPercentGoal: goals.cashPercentGoal,
    },
  });

  return (
    <Box>
      <form
        onSubmit={form.onSubmit((values) => {
          dispatch(setUserGoals(values));
          dispatch(setGoalsModalState());
        })}
      >
        <NumberInput
          label="Total Portfolio Goal in EUR"
          placeholder={form.values.totalValueGoal}
          value={form.values.totalValueGoal}
          {...form.getInputProps("totalValueGoal")}
          variant="default"
        />
        <NumberInput
          label="Crypto target % of total"
          placeholder={form.values.cryptoPercentGoal}
          value={form.values.cryptoPercentGoal}
          {...form.getInputProps("cryptoPercentGoal")}
          variant="default"
        />
        <NumberInput
          label="Stock target % of total"
          placeholder={form.values.stockPercentGoal}
          value={form.values.stockPercentGoal}
          {...form.getInputProps("stockPercentGoal")}
          variant="default"
        />
        <NumberInput
          label="Cash target % of total"
          placeholder={form.values.cashPercentGoal}
          value={form.values.cashPercentGoal}
          {...form.getInputProps("cashPercentGoal")}
          variant="default"
        />
        {form.values.cashPercentGoal +
          form.values.stockPercentGoal +
          form.values.cryptoPercentGoal <=
        100 ? (
          <>
            <Group mt="md">
              <Text>
                Total %:{" "}
                {form.values.cashPercentGoal +
                  form.values.stockPercentGoal +
                  form.values.cryptoPercentGoal}
              </Text>
            </Group>
            <Group position="apart" style={{ marginTop: 15 }}>
              <Button type="submit">Save</Button>
            </Group>
          </>
        ) : (
          <>
            <Group mt="md">
              <Text>
                Total %:{" "}
                {form.values.cashPercentGoal +
                  form.values.stockPercentGoal +
                  form.values.cryptoPercentGoal}
              </Text>
            </Group>
            <Group position="apart" style={{ marginTop: 15 }}>
              <Button disabled type="submit">
                Save
              </Button>
            </Group>
          </>
        )}
      </form>
    </Box>
  );
}
