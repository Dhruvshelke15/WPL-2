import React, { useState, useEffect } from "react";
// eslint-disable-next-line import/no-extraneous-dependencies
import ReactDOM from "react-dom/client";
import { Grid, Typography, Paper } from "@mui/material";
import { BrowserRouter, Route, Routes, useParams } from "react-router-dom";

import "./styles/main.css";
// Import mock setup - Remove this once you have implemented the actual API calls
import "./lib/mockSetup.js";
import TopBar from "./components/TopBar";
import UserDetail from "./components/UserDetail";
import UserList from "./components/UserList";
import UserPhotos from "./components/UserPhotos";

// Helper component to set context for Home
function Home({ setAppContext }) {
  useEffect(() => {
    setAppContext("Home");
  }, [setAppContext]);

  return (
    <Typography variant="body1">
      Welcome to your photosharing app! This{" "}
      <a
        href="https://mui.com/components/paper/"
        rel="noreferrer"
        target="_blank"
      >
        Paper
      </a>{" "}
      component displays the main content of the application. The
      {" sm={9}"} prop in the{" "}
      <a
        href="https://mui.com/components/grid/"
        rel="noreferrer"
        target="_blank"
      >
        Grid
      </a>{" "}
      item component makes it responsively display 9/12 of the window. The
      Routes component enables us to conditionally render different components
      to this part of the screen. You don&apos;t need to display anything here
      on the homepage, so you should delete this Route component once you get
      started.
    </Typography>
  );
}

// Helper component to pass props and set context for UserDetail
function UserDetailRoute({ setAppContext }) {
  const { userId } = useParams();
  return <UserDetail userId={userId} setAppContext={setAppContext} />;
}

// Helper component to pass props and set context for UserPhotos
function UserPhotosRoute({ setAppContext }) {
  const { userId } = useParams();
  return <UserPhotos userId={userId} setAppContext={setAppContext} />;
}

// Helper component to set context for UserList
function UserListRoute({ setAppContext }) {
  useEffect(() => {
    setAppContext("User List");
  }, [setAppContext]);
  return <UserList />;
}

function PhotoShare() {
  const [appContext, setAppContext] = useState("Home");

  return (
    <BrowserRouter basename="/photo-share.html">
      <div>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TopBar appContext={appContext} />
          </Grid>
          <div className="main-topbar-buffer" />
          <Grid item sm={3}>
            <Paper className="main-grid-item">
              <UserListRoute setAppContext={setAppContext} />
            </Paper>
          </Grid>
          <Grid item sm={9}>
            <Paper className="main-grid-item">
              <Routes>
                <Route
                  path="/"
                  element={<Home setAppContext={setAppContext} />}
                />
                <Route
                  path="/users/:userId"
                  element={<UserDetailRoute setAppContext={setAppContext} />}
                />
                <Route
                  path="/photos/:userId"
                  element={<UserPhotosRoute setAppContext={setAppContext} />}
                />
                <Route
                  path="/users"
                  element={<UserListRoute setAppContext={setAppContext} />}
                />
              </Routes>
            </Paper>
          </Grid>
        </Grid>
      </div>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById("photoshareapp"));
root.render(<PhotoShare />);
