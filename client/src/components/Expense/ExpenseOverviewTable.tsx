import {
  Table,
  Button,
  Modal,
  Group,
  Text,
  Title,
  Container,
} from "@mantine/core";
import { Edit, CurrencyEuro } from "tabler-icons-react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { RootState } from "../../Redux/store";
import AddExpense from "./AddExpense";
import EditExpense from "./EditExpense";
import { setAltModalState, setModalState } from "../../Redux/helperSlice";
import { ExpenseData } from "../../types/types";

export function ExpenseOverviewTable() {
  // sets the number of rows to be displayed at once
  const numRows = 5;
  const [numRowsEnd, setNumRowsEnd] = useState(numRows);
  const [numRowsStart, setNumRowsStart] = useState(0);

  //State for the Add Expense Modal
  const opened = useSelector((state: RootState) => state.helper.altModalState);
  //State for the Edit Details Modal
  const detailsOpen = useSelector(
    (state: RootState) => state.helper.modalState
  );
  // Get Expense Data from Redux Store
  const expenseDataArray = useSelector(
    (state: RootState) => state.user.user.expense
  );

  //State for the Edit Expense Modal
  const [rowDetails, setRowDetails] = useState({});
  const dispatch = useDispatch();

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
      <td>
        <Link to={""} className="edit-icon">
          <Edit
            size={18}
            onClick={() => {
              dispatch(setModalState());
              // Gets the ID of the current row to display data on the modal
              setRowDetails(row);
            }}
          />
        </Link>
      </td>
    </tr>
  ));

  return (
    <Container mb={40}>
      {/*  <div className="flex-column"> */}
      <Title order={3} mb={10} mt={40}>
        Latest Expense
      </Title>
      {/*  <TextInput
          placeholder="Search by any field"
          mb="md"
          icon={<Search size={14} />}
          // value={search}
          // onChange={handleSearchChange}
        /> */}
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
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {rows.length >= 0 && rows.length <= numRows ? (
            rows
          ) : rows.length > numRows ? (
            <>
              {/*Displays the current expense data in batches of numRows, currently set to 5 */}
              {rows.slice(numRowsStart, numRowsEnd)}
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
      {/*Logic for the add more / less buttons */}
      {rows.slice(numRowsStart, numRowsEnd).length >= numRows && (
        <Button
          onClick={() => {
            setNumRowsStart((prevNumRowsStart) => prevNumRowsStart + numRows);
            setNumRowsEnd((prevNumRowsEnd) => prevNumRowsEnd + numRows);
          }}
          variant="outline"
          mr={10}
        >
          Load More
        </Button>
      )}
      {numRowsStart !== 0 && (
        <Button
          onClick={() => {
            setNumRowsStart((prevNumRowsStart) => prevNumRowsStart - numRows);
            setNumRowsEnd((prevNumRowsEnd) => prevNumRowsEnd - numRows);
          }}
          variant="outline"
        >
          Show less
        </Button>
      )}

      {/*Modals for adding and editing data */}
      <Group position="center" mt={15}>
        <Button onClick={() => dispatch(setAltModalState())}>
          Add Expense
        </Button>
        <Modal /* Add Expense Model, opens from button click above */
          opened={opened}
          onClose={() => dispatch(setAltModalState())}
          title="Add Expense!"
        >
          <AddExpense />
        </Modal>
        <Modal /* Details Modal, opens from click on edit in table row */
          opened={detailsOpen}
          onClose={() => dispatch(setModalState())}
          title="Expense Details"
          padding="md"
          size="lg"
        >
          <EditExpense {...rowDetails} />
        </Modal>
      </Group>
    </Container>
  );
}
