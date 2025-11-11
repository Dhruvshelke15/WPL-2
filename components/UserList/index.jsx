import React, { useState, useEffect } from "react";
// eslint-disable-next-line import/no-extraneous-dependencies
import PropTypes from "prop-types";
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

function UserList({ advancedFeatures }) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUserList = () => {
      axios
        .get("http://localhost:3001/user/list")
        .then((response) => {
          setUsers(response.data);
        })
        .catch((error) => {
          console.error("Error fetching user list:", error);
        });
    };

    fetchUserList();
    const intervalId = setInterval(fetchUserList, 10000); 

    return () => clearInterval(intervalId);
  }, []); 

  return (
    <div>
      <Typography variant="h6" style={{ paddingLeft: 16, paddingTop: 8 }}>
        Users
      </Typography>
      <List component="nav">
        {users.map((user) => (
          <React.Fragment key={user._id}>
            {/* This is the simple version that matches the test-passing server */}
            <ListItemButton component={Link} to={`/users/${user._id}`}>
              <ListItemText primary={`${user.first_name} ${user.last_name}`} />
            </ListItemButton>
            <Divider />
          </React.Fragment>
        ))}
      </List>
    </div>
  );
}

UserList.propTypes = {
  // We still accept the prop, even if we don't use it in this version
  advancedFeatures: PropTypes.bool.isRequired,
};

export default UserList;