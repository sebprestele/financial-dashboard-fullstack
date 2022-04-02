import { Group, Paper, Text, SimpleGrid, Title } from "@mantine/core";
import { ChartLine, CurrencyEuro, ZoomMoney } from "tabler-icons-react";

import ExpensesFunctions from "../../stats/expenses";
import PortfolioFunctions from "../../stats/portfolio";

/* interface StatsGridIconsProps {
  data: { title: string; value: string; diff: number }[];
} */

export function StatsOverview() {
  const { totalPortfolioValue } = PortfolioFunctions();
  const { totalExpenseByMonth, currentMonthYear } = ExpensesFunctions();
  const currentMonthExpense = Object.entries(totalExpenseByMonth).filter(
    (item) => item[0] === currentMonthYear
  );

  const data = [
    {
      title: "Portfolio Value",
      value: totalPortfolioValue,
      icon: <ChartLine />,
    },
    {
      title: "Expenses this month",
      value: currentMonthExpense.length ? currentMonthExpense[0][1] : 0,
      icon: <ZoomMoney />,
    },
  ];

  const stats = data.map((stat) => {
    return (
      <Paper
        withBorder
        shadow="md"
        p="md"
        radius="lg"
        mt={30}
        ml={80}
        mr={80}
        key={stat.title}
      >
        <Group position="apart">
          <Text size="md" color="dimmed">
            {stat.title}
          </Text>
          {stat.icon}
        </Group>

        <Group spacing="md" mt={15}>
          <Title order={2}>
            {" "}
            <CurrencyEuro
              size={18}
              strokeWidth={1.5}
              className="currency-icon"
            />{" "}
            {stat.value}{" "}
          </Title>
        </Group>
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
