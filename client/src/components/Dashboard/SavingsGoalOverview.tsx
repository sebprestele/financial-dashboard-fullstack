import {
  createStyles,
  Progress,
  Text,
  Group,
  Badge,
  Paper,
} from "@mantine/core";

const useStyles = createStyles((theme) => ({
  card: {
    position: "relative",
    overflow: "visible",
    padding: theme.spacing.xl,
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    lineHeight: 1,
  },
}));

export function SavingsGoalOverview() {
  const { classes } = useStyles();

  return (
    <Paper radius="md" withBorder className={classes.card}>
      <Text align="center" weight={700} className={classes.title}>
        Family Holiday
      </Text>
      <Text color="dimmed" align="center" size="sm">
        Goal: 4500 EUR
      </Text>

      <Group position="apart" mt="xs">
        <Text size="sm" color="dimmed">
          Progress
        </Text>
        <Text size="sm" color="dimmed">
          {Math.round((1200 / 4500) * 100)}%
        </Text>
      </Group>

      <Progress value={27} mt={5} />

      <Group position="apart" mt="md">
        <Text size="sm">1200 EUR</Text>
        <Badge size="sm">Holiday</Badge>
      </Group>
    </Paper>
  );
}
