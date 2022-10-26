import "./Upload.css";
import { Button, Divider, ThemeProvider } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";
import React, { useState } from "react";
import { DropzoneArea } from "mui-file-dropzone";
import PageHeader from "../components/PageHeader/PageHeader";
import {
  studyFormQuestionsState,
  studyFormScheduleConfigurationState,
  studyFormStudyInformationState,
} from "../functions/atom";
import customisedTheme from "../functions/theme";
import Axios from "../functions/axiosSettings";
import { SET_SCHEDULES } from "../components/ScheduleComponent/ScheduleComponent";

export default function Upload() {
  // initialize csrf token
  Axios({
    method: "get",
    url: "get_token/",
  });

  const navigateTo = useNavigate();
  const [studyInformation, setStudyInformation] = useRecoilState(
    studyFormStudyInformationState
  );
  const setStudyFormQuestions = useSetRecoilState(studyFormQuestionsState);
  const setStudyFormScheduleConfiguration = useSetRecoilState(
    studyFormScheduleConfigurationState
  );
  const getData = (file) => {
    fetch(file, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then(function (response) {
        console.log(response);
        return response.json();
      })
      .then(function (myJson) {
        console.log(myJson);
      });
  };

  const [jsonObject, setJsonObject] = useState("");
  const readJsonObject = (value) => {
    setJsonObject(value);
  };
  function readInputFile(e) {
    const fileReader = new FileReader();
    fileReader.readAsText(e.target.files[0], "UTF-8");
    // eslint-disable-next-line no-shadow
    fileReader.onload = (e) => {
      readJsonObject(e.target.result);
    };
  }

  return (
    <div>
      <PageHeader />
      <div className="main_vertical_layout">
        <p className="main_title">Upload study configuration file to EDIT</p>
        <p className="main_description">
          Please upload your study configuration file if you already have one
          and would like to make some changes.
        </p>
        <Button variant="contained" component="label">
          Upload File
          <input
            type="file"
            hidden
            onChange={(event) => {
              readInputFile(event);
            }}
            accept=".json"
          />
        </Button>

        {/* <DropzoneArea */}
        {/*  acceptedfiles={[".json"]} */}
        {/*  cancelButtonText="cancel" */}
        {/*  submitButtonText="submit" */}
        {/*  multiple={1} */}
        {/*  maxFileSize={50000000} */}
        {/*  maxfiles={1} */}
        {/*  // open={open} */}
        {/*  // onClose={() => setOpen(false)} */}
        {/*  onSave={(files) => { */}
        {/*    console.log("Files:", files); */}
        {/*    // setOpen(false); */}
        {/*  }} */}
        {/*  // onChange={this.handleChange.bind(this)} */}
        {/*  // showPreviews */}
        {/*  // showFileNamesInPreview */}
        {/* /> */}
        <Button
          onClick={() => {
            console.log(jsonObject);
            navigateTo("/main");
          }}
        >
          Back to main page
        </Button>
      </div>
    </div>
  );
}
