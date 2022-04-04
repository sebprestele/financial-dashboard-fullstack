import {
  createStyles,
  Group,
  Paper,
  Progress,
  SimpleGrid,
  Text,
  Title,
} from "@mantine/core";
import { useSelector } from "react-redux";
import { CurrencyEuro } from "tabler-icons-react";

import PortfolioFunctions from "../../stats/portfolio";
import { RootState } from "../../Redux/store";

const useStyles = createStyles((theme) => ({
  root: {
    padding: theme.spacing.xl,
  },
  value: {
    fontSize: 24,
    fontWeight: 700,
    lineHeight: 1,
  },
  diff: {
    lineHeight: 1,
    display: "flex",
    alignItems: "center",
  },
  title: {
    fontWeight: 700,
    textTransform: "uppercase",
  },
}));

export function PortfolioOverview() {
  const { classes } = useStyles();

  const goals = useSelector((state: RootState) => state.user.goals);
  const { totalInvestmentsByCategory, totalPortfolioValue } =
    PortfolioFunctions();
  const totalValues = Object.entries(totalInvestmentsByCategory).map(
    (item) => item
  );
  const cryptoValue = totalValues.filter((item) => item[0] === "Crypto");
  const stocksValueFilter = totalValues.filter((item) => item[0] === "Stocks");
  const etfValueFilter = totalValues.filter((item) => item[0] === "ETF");
  const cashValue = totalValues.filter((item) => item[0] === "Cash");
  const stocksValue =
    stocksValueFilter.length !== 0 ? stocksValueFilter[0][1] : 0;
  const etfValue = etfValueFilter.length !== 0 ? etfValueFilter[0][1] : 0;
  //@ts-ignore
  const stocksEtfValue = stocksValue + etfValue;

  const data = [
    {
      title: "Crypto value",
      value: cryptoValue.length ? cryptoValue[0][1] : 0,
      percentOfTotal: Math.floor(
        //@ts-ignore
        cryptoValue.length && (cryptoValue[0][1] / totalPortfolioValue) * 100
      ),
      goal: goals.cryptoPercentTarget,
      diff:
        cryptoValue.length &&
        Math.floor(
          //@ts-ignore
          (((cryptoValue[0][1] / totalPortfolioValue) * 100) /
            goals.cryptoPercentTarget) *
            100
        ),
    },
    {
      title: "Stocks & ETF value",
      value: stocksEtfValue,
      percentOfTotal: Math.floor((stocksEtfValue / totalPortfolioValue) * 100),
      goal: goals.stockPercentTarget,
      diff: Math.floor(
        (((stocksEtfValue / totalPortfolioValue) * 100) /
          goals.stockPercentTarget) *
          100
      ),
    },
    {
      title: "Total Cash value",
      value: cashValue.length ? cashValue[0][1] : 0,
      percentOfTotal: Math.floor(
        //@ts-ignore
        cashValue.length && (cashValue[0][1] / totalPortfolioValue) * 100
      ),
      goal: goals.cashPercentTarget,
      diff:
        cashValue.length &&
        Math.floor(
          //@ts-ignore
          (((cashValue[0][1] / totalPortfolioValue) * 100) /
            goals.cashPercentTarget) *
            100
        ),
    },
  ];

  const stats = data.map((stat) => {
    return (
      <Paper withBorder shadow="md" p="lg" radius="lg" key={stat.title}>
        <Group position="apart">
          <Text
            color="dimmed"
            transform="uppercase"
            weight={700}
            size="xs"
            className={classes.title}
          >
            {stat.title}
          </Text>
        </Group>
        <Title order={3} mt="xs">
          <CurrencyEuro
            size={22}
            strokeWidth={2.3}
            className="currency-icon-overview"
          />{" "}
          {stat.value}
        </Title>
        <Group position="apart" mt="xs">
          <Text size="sm" color="dimmed">
            Current % of Total
          </Text>
          <Text size="sm" color="dimmed">
            {stat.percentOfTotal} %
          </Text>
        </Group>
        <Progress value={stat.diff} mt={10} />
        <Group position="apart" mt="md">
          <Text size="sm">Goal: {`${stat.goal} % of total`}</Text>
        </Group>
      </Paper>
    );
  });
  return (
    <div className={classes.root}>
      <SimpleGrid
        cols={3}
        breakpoints={[
          { maxWidth: "md", cols: 2 },
          { maxWidth: "xs", cols: 1 },
        ]}
      >
        {stats}
      </SimpleGrid>
    </div>
  );
}
