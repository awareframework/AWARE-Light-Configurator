import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/sidebar/Sidebar";
import PageHeader from "../components/PageHeader/PageHeader";

function SurveyLayout() {
  return (
    <div>
      rdliny
      <PageHeader />
      <div
        style={{
          padding: "50px 0px 0px 220px",
        }}
      >
        <Sidebar />
        <Outlet />
      </div>
      ;
    </div>
  );
}

export default SurveyLayout;
