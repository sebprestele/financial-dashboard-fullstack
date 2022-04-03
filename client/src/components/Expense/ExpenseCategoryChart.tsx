import { Container, Paper, Title } from "@mantine/core";
import { PieChart, Pie, Cell } from "recharts";

import ExpensesFunctions from "../../stats/expenses";
interface data {
  key: string;
  value: number;
}

const COLORS = [
  "#00C49F",
  "#FCC2D7",
  "#A61E4D",
  "#3BC9DB",
  "#FFBB28",
  "#FF8042",
  "#0088FE",
  "#FFD43B",
];

const renderLabel = (entry: data) => entry.key;

const ExpenseOverviewChart = () => {
  const { totalExpenseByCategory } = ExpensesFunctions();

  const data = Object.entries(totalExpenseByCategory).map(([key, value]) => ({
    key: key,
    value: value,
  }));

  return (
    <>
      <Container mt={30}>
        <Paper>
          <Title order={5} ml={50} mb={-20}>
            Expenses by Category
          </Title>
          <PieChart width={500} height={300}>
            <Pie
              data={data}
              cx={180}
              cy={150}
              labelLine={true}
              label={renderLabel}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
          </PieChart>
        </Paper>
      </Container>
    </>
  );
};
export default ExpenseOverviewChart;
