import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";
// eslint-disable-next-line import/no-extraneous-dependencies
import PropTypes from "prop-types";

import "./styles.css";

function TopBar({ appContext }) {
  return (
    <AppBar className="topbar-appBar" position="absolute">
      <Toolbar>
        <Typography variant="h5" color="inherit" style={{ flexGrow: 1 }}>
          Gemini&apos;s Photo App
        </Typography>
        <Typography variant="h5" color="inherit">
          {appContext}
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

TopBar.propTypes = {
  appContext: PropTypes.string.isRequired,
};

export default TopBar;
