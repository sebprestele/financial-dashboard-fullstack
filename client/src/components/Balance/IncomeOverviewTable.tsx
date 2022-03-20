import { Table, ScrollArea, Button, Modal, Group, Text } from "@mantine/core";
import { Edit } from "tabler-icons-react";

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { RootState } from "../../Redux/store";
import AddIncome from "./AddIncome";
import { setSingleUser } from "../../Redux/userSlice";
import axios from "axios";
interface RowData {
  _id: string;
  name: string;
  amount: string;
  date: string;
  tag: string;
}

export function IncomeOverviewTable() {
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("currentToken");
  const dispatch = useDispatch();
  const [opened, setOpened] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false);

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
      <td>{row.amount} </td>
      <td>{row.tag}</td>
      <td>{row.date != null && row.date.substring(5, 10)}</td>
      <td>
        <Edit
          onClick={async () => {
            await axios
              .delete(`http://localhost:5000/api/v1/income/${row._id}`)
              .then((res) => console.log(res));
            await fetch(`http://localhost:5000/api/v1/users/${userId}`, {
              method: "GET",
              headers: { Authorization: `Bearer ${token}` },
            })
              .then((res) => res.json())
              .then((data) => {
                dispatch(setSingleUser(data));
                console.log(data);
              });
          }}
        />
      </td>
    </tr>
  ));

  return (
    <div className="flex-column">
      <ScrollArea>
        <Text size="md" mb={10}>
          Latest Income
        </Text>
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
              <th
              /*  sorted={sortBy === "name"}
                reversed={reverseSortDirection}
                onSort={() => setSorting("name")} */
              >
                Name
              </th>
              <th
              /*    //sorted={sortBy === "email"}
                reversed={reverseSortDirection}
                onSort={() => setSorting("email")} */
              >
                Amount
              </th>
              <th
              /*  //sorted={sortBy === "company"}
                reversed={reverseSortDirection}
                onSort={() => setSorting("company")} */
              >
                Category
              </th>

              <th
              /*  //sorted={sortBy === "company"}
                reversed={reverseSortDirection}
                onSort={() => setSorting("company")} */
              >
                Date
              </th>

              <th
              /*  //sorted={sortBy === "company"}
                reversed={reverseSortDirection}
                onSort={() => setSorting("company")} */
              >
                Edit
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.length > 0 ? (
              rows
            ) : (
              <tr>
                <td colSpan={Object.keys(incomeDataArray[0]).length}>
                  <Text weight={500} align="center">
                    Nothing found
                  </Text>
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </ScrollArea>
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="Add Income!"
      >
        <AddIncome />
      </Modal>
      <Group position="center" mt={15}>
        <Button onClick={() => setOpened(true)}>Add Income</Button>
        {/*   <Button variant="outline" type="submit" onClick={handleSubmit}>
          Remove Selected
        </Button> */}
      </Group>
    </div>
  );
}
