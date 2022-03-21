import {
  Table,
  ScrollArea,
  Button,
  Modal,
  Group,
  Text,
  Title,
  Box,
  SimpleGrid,
} from "@mantine/core";
import { Edit, CurrencyEuro, Link } from "tabler-icons-react";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { RootState } from "../../Redux/store";
import { setSingleUser } from "../../Redux/userSlice";
import AddIncome from "./AddIncome";
import EditIncome from "./EditIncome";
import { setModalState } from "../../Redux/helperSlice";

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
  const [numRowsEnd, setNumRowsEnd] = useState(10);
  const [numRowsStart, setNumRowsStart] = useState(0);
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("currentToken");
  //State for the Add Income Modal
  const [opened, setOpened] = useState(false);
  //State for the Edit Details Modal
  const detailsOpen = useSelector(
    (state: RootState) => state.helper.modalState
  );
  //State for the Add Income Modal
  const [rowDetails, setRowDetails] = useState({});

  const dispatch = useDispatch();

  useEffect(() => {
    try {
      fetch(`http://localhost:5000/api/v1/users/${userId}`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((data) => {
          dispatch(setSingleUser(data));
          console.log(data);
        });
    } catch (error) {
      console.log(error);
    }
  }, [dispatch, token, userId]);

  const incomeDataArray = useSelector(
    (state: RootState) => state.user.user.income
  );

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
            setRowDetails(row);
          }}
        />
      </td>
    </tr>
  ));

  return (
    <div className="flex-column">
      <Title order={4} mb={10}>
        Latest Income
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
          {rows.length > 0 && rows.length <= 10 ? (
            rows
          ) : rows.length > 10 ? (
            <>
              {rows.splice(numRowsStart, numRowsEnd)}

              {numRowsStart < rows.length ? (
                <Button
                  onClick={() => {
                    setNumRowsStart(numRowsStart + 10);
                    setNumRowsEnd(numRowsEnd + 10);
                  }}
                  variant="outline"
                >
                  Load More
                </Button>
              ) : (
                <Button
                  onClick={() => {
                    setNumRowsStart(numRowsStart - 10);
                    setNumRowsEnd(numRowsEnd - 10);
                  }}
                  variant="outline"
                >
                  Show less
                </Button>
              )}
            </>
          ) : (
            <tr>
              <td colSpan={5}>
                {" "}
                <Text weight={500} align="center">
                  Nothing found
                </Text>
              </td>
            </tr>
          )}
        </tbody>
      </Table>

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
