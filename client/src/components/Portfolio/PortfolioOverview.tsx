import {
  createStyles,
  Group,
  Paper,
  SimpleGrid,
  Text,
  Title,
} from "@mantine/core";
import { ArrowUpRight, ArrowDownRight, CurrencyEuro } from "tabler-icons-react";

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

  icon: {
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[3]
        : theme.colors.gray[4],
  },

  title: {
    fontWeight: 700,
    textTransform: "uppercase",
  },
}));

interface StatsGridProps {
  data: {
    title: string;
    value: string;
    diff: number;
  }[];
}

export function PortfolioOverview() {
  const { classes } = useStyles();

  const data = [
    {
      title: "Expenses this month",
      value: "TEST1",
      diff: 12,
    },
    {
      title: "Expenses last month",
      value: "TEST2",
      diff: -20,
    },
    {
      title: "Expenses this month",
      value: "TEST3",
      diff: 12,
    },
    {
      title: "Expenses last month",
      value: "TEST4",
      diff: -20,
    },
  ];

  const stats = data.map((stat) => {
    const DiffIcon = stat.diff > 0 ? ArrowUpRight : ArrowDownRight;

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

        <Group align="flex-end" spacing="xs" mt={25}>
          <Title order={3} mt="xs">
            <CurrencyEuro
              size={22}
              strokeWidth={2.3}
              className="currency-icon-overview"
            />{" "}
            {stat.value}
          </Title>
          <Text
            color={stat.diff > 0 ? "teal" : "red"}
            size="sm"
            weight={500}
            className={classes.diff}
          >
            <span>{stat.diff}%</span>
            <DiffIcon size={16} />
          </Text>
        </Group>

        <Text size="xs" color="dimmed" mt={7}>
          Compared to previous month
        </Text>
      </Paper>
    );
  });
  return (
    <div className={classes.root}>
      <SimpleGrid
        cols={4}
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
