import { Table, Text, Container } from "@mantine/core";
import { CurrencyEuro } from "tabler-icons-react";
import { useSelector } from "react-redux";

import { RootState } from "../../Redux/store";
import { ExpenseData } from "../../types/types";

export function IncomeExpenseOverviewTable() {
  // sets the number of rows to be displayed at once
  const numRows = 5;

  // Get Expense Data from Redux Store
  const expenseDataArray = useSelector(
    (state: RootState) => state.user.user.expense
  );

  // Set the Expense Overview table with the data userData
  const rows = expenseDataArray.map((row: ExpenseData) => (
    <tr key={row._id}>
      <td>{row.name}</td>
      <td>
        <CurrencyEuro size={18} strokeWidth={1.5} className="currency-icon" />
        {row.amount}
      </td>
      <td>{row.tag}</td>
      <td>{row.date != null && row.date.substring(0, 10)}</td>
    </tr>
  ));

  return (
    <Container mb={40}>
      <Table
        highlightOnHover
        horizontalSpacing="sm"
        verticalSpacing="sm"
        sx={{ tableLayout: "fixed", minWidth: 500 }}
      >
        <thead>
          <tr>
            <th>Name</th>
            <th>Amount</th>
            <th>Category</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {rows.length >= 0 && rows.length <= numRows ? (
            rows
          ) : rows.length > numRows ? (
            <>
              {/*Displays the current expense data in batches of numRows, currently set to 5 */}
              {rows.slice(0, numRows)}
            </>
          ) : (
            <tr>
              <td colSpan={5}>
                <Text weight={500} align="center">
                  Nothing found
                </Text>
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </Container>
  );
}
