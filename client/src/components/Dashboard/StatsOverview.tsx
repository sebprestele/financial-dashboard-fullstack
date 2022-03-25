import {
  createStyles,
  Group,
  Paper,
  Text,
  ThemeIcon,
  SimpleGrid,
} from "@mantine/core";
import { ArrowUpRight, ArrowDownRight } from "tabler-icons-react";
import { useSelector } from "react-redux";

import { RootState } from "../../Redux/store";

const useStyles = createStyles((theme) => ({
  root: {
    paddingBottom: theme.spacing.xl * 1.5,
  },

  label: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
  },
}));

/* interface StatsGridIconsProps {
  data: { title: string; value: string; diff: number }[];
} */

const data = [
  { title: "Test", value: "VALUE", diff: 10 },
  { title: "Test2", value: "VALUE2", diff: -10 },
  { title: "Test3", value: "VALUE3", diff: 30 },
];

export function StatsOverview() {
  const { classes } = useStyles();
  const stats = data.map((stat) => {
    const DiffIcon = stat.diff > 0 ? ArrowUpRight : ArrowDownRight;

    return (
      <Paper
        withBorder
        shadow="md"
        p="md"
        radius="lg"
        mt={30}
        ml={50}
        mr={50}
        key={stat.title}
      >
        <Group position="apart">
          <div>
            <Text
              color="dimmed"
              transform="uppercase"
              weight={700}
              size="xs"
              className={classes.label}
            >
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
            {stat.diff}%{" "}
          </Text>
          {stat.diff > 0 ? "increase" : "decrease"} compared to last month
        </Text>
      </Paper>
    );
  });

  return (
    <div className={classes.root}>
      <SimpleGrid cols={3} breakpoints={[{ maxWidth: "sm", cols: 1 }]}>
        {stats}
      </SimpleGrid>
    </div>
  );
}
