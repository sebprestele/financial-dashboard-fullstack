import { Container, Title } from "@mantine/core";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import ExpensesFunctions from "../../stats/expenses";

const ExpensesMonthlyChart = () => {
  const { totalExpenseByMonth } = ExpensesFunctions();
  const data = Object.entries(totalExpenseByMonth).map(([key, value]) => ({
    name: key,
    total: value,
  }));

  return (
    <>
      <Container mt={30}>
        <Title order={5} ml={50} mb={-50}>
          Expenses by Month
        </Title>
        <ResponsiveContainer>
          <BarChart
            width={450}
            height={250}
            data={data}
            margin={{
              top: 70,
              right: 30,
              left: 0,
              bottom: -25,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="total" fill="#4c6ef5" />
          </BarChart>
        </ResponsiveContainer>
      </Container>
    </>
  );
};
export default ExpensesMonthlyChart;
