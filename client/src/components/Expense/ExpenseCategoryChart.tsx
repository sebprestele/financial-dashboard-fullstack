import { Paper, Text, SimpleGrid, Card, Container } from "@mantine/core";
import { keyboard } from "@testing-library/user-event/dist/keyboard";
import { useSelector } from "react-redux";
import { PieChart, Pie, Cell } from "recharts";

import { RootState } from "../../Redux/store";
import ExpensesFunctions from "../../stats/expenses";

/* const data = [
  { name: "Group A", value: 400 },
  { name: "Group B", value: 300 },
  { name: "Group C", value: 300 },
  { name: "Group D", value: 200 },
]; */

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const RADIAN = Math.PI / 180;
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
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const ExpenseOverviewChart = () => {
  const { totalExpenseByCategory } = ExpensesFunctions();
  //const expenseData = useSelector((state: RootState) => state.user.user);

  const data = Object.entries(totalExpenseByCategory).map(([name, value]) => ({
    key: name[0],
    value: value[0],
  }));

  console.log(Object.entries(totalExpenseByCategory));
  return (
    <PieChart width={400} height={400}>
      <Pie
        data={data}
        cx={200}
        cy={200}
        labelLine={false}
        label={renderCustomizedLabel}
        outerRadius={80}
        fill="#8884d8"
        dataKey="value"
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
    </PieChart>
  );
};
export default ExpenseOverviewChart;
