import { Container, Paper, Title } from "@mantine/core";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

import ExpensesFunctions from "../../stats/expenses";

/* const data = [
  { name: "Group A", value: 400 },
  { name: "Group B", value: 300 },
  { name: "Group C", value: 300 },
  { name: "Group D", value: 200 },
]; */

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
const RADIAN = Math.PI / 180;

const renderLabel = (entry: data) => entry.key;

const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
      fontSize={12}
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const ExpenseOverviewChart = () => {
  const { totalExpenseByCategory } = ExpensesFunctions();
  //const expenseData = useSelector((state: RootState) => state.user.user);

  const data = Object.entries(totalExpenseByCategory).map(([key, value]) => ({
    key: key,
    value: value,
  }));

  console.log(data);

  return (
    <>
      <Container mt={30}>
        <Paper>
          <Title order={5} ml={50} mb={-50}>
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
