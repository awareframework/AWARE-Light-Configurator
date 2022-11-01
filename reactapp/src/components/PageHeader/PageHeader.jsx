import React from "react";
import "./PageHeader.css";
import { useNavigate } from "react-router-dom";
import { Button, ThemeProvider } from "@mui/material";
import customisedTheme from "../../functions/theme";

export default function PageHeader() {
  const navigateTo = useNavigate();
  return (
    <div>
      <div className="top_bar" />
      <div className="page_header">
        <ThemeProvider theme={customisedTheme}>
          <Button
            color="header"
            onClick={() => {
              navigateTo("/");
            }}
          >
            AWARE-Light Configuration Page
          </Button>
        </ThemeProvider>
      </div>

      {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions,jsx-a11y/click-events-have-key-events */}
      {/* <div */}
      {/*  onClick={() => { */}
      {/*    navigateTo("/"); */}
      {/*  }} */}
      {/* > */}
      {/*  <p className="page_header">AWARE-Light Configuration Page</p> */}
      {/* </div> */}
    </div>
  );
}
