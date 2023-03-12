import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function AllUser() {
  const classes = useStyles();
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    async function getUsers() {
      try {
        const response = await axios.get("http://localhost:5001/all-user");
        setUsers(response.data);
      } catch (error) {
        console.error(error);
      }
    }
    getUsers();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/farmers/${id}`);
      setUsers(users.filter((user) => user.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredUsers = users.filter((user) =>
    user.phone.includes(searchQuery)
  );

  return (
    <div style={{ marginLeft: "80px" }}>
      <h1>All Users</h1>
      <TextField
        label="Search by phone number"
        variant="outlined"
        value={searchQuery}
        onChange={handleSearch}
        style={{ marginBottom: "20px" }}
      />
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>User</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>NID</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Area</TableCell>
              <TableCell>Extension Center</TableCell>
              <TableCell>Village Name</TableCell>
              <TableCell>Edit</TableCell>
              <TableCell>Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.user}</TableCell>
                <TableCell>{user.date}</TableCell>
                <TableCell>{user.farmersName}</TableCell>
                <TableCell>{user.nid}</TableCell>
                <TableCell>{user.phone}</TableCell>
                <TableCell>{user.area}</TableCell>
                <TableCell>{user.extensionCenter}</TableCell>
                <TableCell>{user.villageName}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    component={Link}
                    to={`/edit/${user.id}`}
                    color="primary"
                  >
                    Edit
                  </Button>
                </TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleDelete(user.id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default AllUser;
