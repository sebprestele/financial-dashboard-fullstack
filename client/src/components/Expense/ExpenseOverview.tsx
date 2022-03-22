import { Group, Paper, Text, ThemeIcon, SimpleGrid } from "@mantine/core";
import { ArrowUpRight, ArrowDownRight } from "tabler-icons-react";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/store";

const data = [
  { title: "Income YTD", value: "VALUE", diff: 10 },
  { title: "Expense this month", value: "VALUE2", diff: -10 },
  { title: "Expense YTD", value: "VALUE2", diff: -10 },
  { title: "Monthly Balance", value: "VALUE3", diff: 30 },
];

export function ExpenseOverview() {
  const userData = useSelector((state: RootState) => state.user.user);
  console.log(userData.expense);
  const expenses = userData.expense;
  const stats = data.map((stat) => {
    const DiffIcon = stat.diff > 0 ? ArrowUpRight : ArrowDownRight;

    return (
      <Paper
        withBorder
        shadow="md"
        p="md"
        radius="md"
        mt={10}
        mb={10}
        ml={50}
        mr={50}
        key={stat.title}
      >
        <Group position="apart">
          <div>
            <Text color="dimmed" transform="uppercase" weight={700} size="xs">
              {stat.title}
            </Text>
            <Text weight={700} size="xl">
              {stat.value}
            </Text>
          </div>
          <ThemeIcon
            color="gray"
            variant="light"
            sx={(theme) => ({
              color: stat.diff > 0 ? theme.colors.teal[6] : theme.colors.red[6],
            })}
            size={38}
            radius="md"
          >
            <DiffIcon size={28} />
          </ThemeIcon>
        </Group>
        <Text color="dimmed" size="sm" mt="md">
          <Text
            component="span"
            color={stat.diff > 0 ? "teal" : "red"}
            weight={700}
          >
            {stat.diff}%
          </Text>
          {stat.diff > 0 ? "increase" : "decrease"} compared to last month
        </Text>
      </Paper>
    );
  });

  return (
    <div>
      <SimpleGrid cols={2} breakpoints={[{ maxWidth: "sm", cols: 1 }]}>
        {stats}
      </SimpleGrid>
    </div>
  );
}
