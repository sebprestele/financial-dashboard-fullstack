import { RingProgress, Text, Paper, Center, Group, Title } from "@mantine/core";
import { CurrencyEuro } from "tabler-icons-react";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/store";

import PortfolioFunctions from "../../stats/portfolio";

function PortfolioTotals() {
  const totalPortfolioTargetValue = useSelector(
    (state: RootState) => state.user.goals.totalValueTarget
  );
  const { totalPortfolioValue } = PortfolioFunctions();
  const data = [
    {
      title: "Total Portfolio Value",
      value: totalPortfolioValue,
      goal: totalPortfolioTargetValue,
      percentOfTotal: Math.floor(
        (totalPortfolioValue / totalPortfolioTargetValue) * 100
      ),
      diff: Math.floor((totalPortfolioValue / totalPortfolioTargetValue) * 100),
    },
  ];

  const stats = data.map((stat) => {
    return (
      <Paper radius="md" p="md" pb={60} mt={20} key={stat.title}>
        <Title order={4} ml={50} mb={10}>
          Current Portfolio Value
        </Title>
        <Title order={3} ml={50}>
          Total:{" "}
          <CurrencyEuro size={22} strokeWidth={2.2} className="currency-icon" />
          {stat.value}
        </Title>
        <Center>
          <Group>
            <RingProgress
              size={200}
              thickness={12}
              sections={[{ value: stat.diff, color: "cyan" }]}
              label={
                <Text color="blue" weight={700} align="center" size="xl">
                  {`${stat.diff} %`}
                </Text>
              }
            />
            <div>
              <Text weight={700} size="xl"></Text>
            </div>
          </Group>
        </Center>
        <Group>
          <Text ml={30}>
            Goal:{" "}
            <CurrencyEuro
              size={18}
              strokeWidth={1.5}
              className="currency-icon"
            />
            {stat.goal}
          </Text>
          <Text>
            Difference:{" "}
            <CurrencyEuro
              size={18}
              strokeWidth={1.5}
              className="currency-icon"
            />
            {stat.goal - stat.value}
          </Text>
        </Group>
      </Paper>
    );
  });

  return <div>{stats}</div>;
}

export default PortfolioTotals;
