import { Table, Button, Modal, Group, Text, Title } from "@mantine/core";
import { Edit, CurrencyEuro } from "tabler-icons-react";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { RootState } from "../../Redux/store";
import { setSingleUser } from "../../Redux/userSlice";
import { setModalState } from "../../Redux/helperSlice";
import AddIncome from "./AddIncome";
import EditIncome from "./EditIncome";
export interface RowData {
  _id?: string;
  name?: string;
  amount?: string;
  date?: string;
  tag?: string;
  comments?: string;
}

export function IncomeOverviewTable() {
  // sets the number of rows to be displayed at once
  const numRows = 5;
  const [numRowsEnd, setNumRowsEnd] = useState(numRows);
  const [numRowsStart, setNumRowsStart] = useState(0);
  //Get userId and JWT token from storage
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("currentToken");
  //State for the Add Income Modal
  const [opened, setOpened] = useState(false);
  //State for the Edit Details Modal
  const detailsOpen = useSelector(
    (state: RootState) => state.helper.modalState
  );
  // Get Income Data from Redux Store
  const incomeDataArray = useSelector(
    (state: RootState) => state.user.user.income
  );
  //State for the Edit Income Modal
  const [rowDetails, setRowDetails] = useState({});
  const dispatch = useDispatch();

  //Get the userData from Backend and dispatch to Redux Store
  useEffect(() => {
    try {
      fetch(
        `https://finans-fullstack-app-server.herokuapp.com/api/v1/users/${userId}`,
        {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        }
      )
        .then((res) => res.json())
        .then((data) => {
          dispatch(setSingleUser(data));
          console.log(data);
        });
    } catch (error) {
      console.log(error);
    }
  }, [dispatch, token, userId]);

  // Set the Income Overview table with the data userData
  const rows = incomeDataArray.map((row: RowData) => (
    <tr key={row._id}>
      <td>{row.name}</td>
      <td>
        <CurrencyEuro size={18} strokeWidth={1.5} className="currency-icon" />
        {row.amount}
      </td>
      <td>{row.tag}</td>
      <td>{row.date != null && row.date.substring(0, 10)}</td>
      <td>
        <Edit
          onClick={() => {
            dispatch(setModalState());
            // Gets the ID of the current row to display data on the modal
            setRowDetails(row);
          }}
        />
      </td>
    </tr>
  ));

  return (
    <div className="flex-column">
      <Title order={3} mb={10} mt={30}>
        Latest Income
      </Title>
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
          {rows.length >= 0 && rows.length <= 10 ? (
            rows
          ) : rows.length > 10 ? (
            <>
              {/*Displays the current income data in batches of numRows, currently set to 5 */}
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
        <Button onClick={() => setOpened(true)}>Add Income</Button>

        <Modal /* Add Income Model, opens from button click above */
          opened={opened}
          onClose={() => setOpened(false)}
          title="Add Income!"
        >
          <AddIncome />
        </Modal>
        <Modal /* Details Modal, opens from click on edit in table row */
          opened={detailsOpen}
          onClose={() => dispatch(setModalState())}
          title="Income Details"
          padding="md"
          size="lg"
        >
          <EditIncome {...rowDetails} />
        </Modal>
      </Group>
    </div>
  );
}
