import {
  Group,
  Paper,
  Text,
  ThemeIcon,
  SimpleGrid,
  Title,
} from "@mantine/core";
import { ArrowUpRight, ArrowDownRight, CurrencyEuro } from "tabler-icons-react";
import ExpensesFunctions from "../../stats/expenses";

export function ExpenseOverview() {
  const {
    totalExpenses,
    monthlyDifference,
    monthlyExpenses,
    prevMonthlyExpenses,
    prevTwoMonthlyDifference,
  } = ExpensesFunctions();

  const data = [
    {
      title: "Expenses this month",
      value: monthlyExpenses,
      diff: monthlyDifference,
    },
    {
      title: "Expenses last month",
      value: prevMonthlyExpenses,
      diff: prevTwoMonthlyDifference,
    },

    /*  { title: "Expense YTD", value: totalExpenses, diff: 0 },
    { title: "Monthly Balance", value: "VALUE3", diff: 30 }, */
  ];

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
            <Title order={3} mt="xs">
              <CurrencyEuro
                size={22}
                strokeWidth={2.3}
                className="currency-icon-overview"
              />{" "}
              {stat.value}
            </Title>
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
            {stat.diff}%{" "}
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