import React, { useState, useEffect } from "react";
import {
  Divider,
  List,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import axios from "axios";

import "./styles.css";

function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/user/list")
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching user list:", error);
      });
  }, []); // Empty dependency array means this runs once on mount

  return (
    <div>
      <Typography variant="h6">Users</Typography>
      <List component="nav">
        {users.map((user) => (
          <React.Fragment key={user._id}>
            <ListItemButton component={Link} to={`/users/${user._id}`}>
              <ListItemText primary={`${user.first_name} ${user.last_name}`} />
            </ListItemButton>
            <Divider />
          </React.Fragment>
        ))}
      </List>
      <Typography variant="body2" style={{ marginTop: 16 }}>
        API Endpoint: /user/list
      </Typography>
    </div>
  );
}

export default UserList;
