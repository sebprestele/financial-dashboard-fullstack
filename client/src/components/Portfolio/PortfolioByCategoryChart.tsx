import { Container, Paper, Title } from "@mantine/core";
import { PieChart, Pie, Cell } from "recharts";

import InvestmentsFunctions from "../../stats/portfolio";

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

const PortfolioCategoryChart = () => {
  const { totalInvestmentsByCategory } = InvestmentsFunctions();

  const data = Object.entries(totalInvestmentsByCategory).map(
    ([key, value]) => ({
      key: key,
      value: value,
    })
  );

  return (
    <>
      <Container mt={30}>
        <Paper>
          <Title order={4} ml={50} mb={-10}>
            Investments by Category
          </Title>

          <PieChart width={400} height={300}>
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
export default PortfolioCategoryChart;
