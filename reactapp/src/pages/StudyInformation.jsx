import "./StudyInformation.css";
import React, { useState } from "react";
import Grid from "@mui/material/Unstable_Grid2";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import { Button, ThemeProvider } from "@mui/material";
import { studyFormStudyInformationState } from "../functions/atom";
import Field from "../components/Field/Field";
import customisedTheme from "../functions/theme";
import Axios from "../functions/axiosSettings";

const TITLE1 = "Study Information";
const EXPLANATION1 =
  "Basic information of the study. This information will be presented to participants upon joining your study.";

const TITLE2 = "Database Configuration";
const EXPLANATION2 =
  "Where will the study data be stored? Please insert credentials for a user with INSERT only privilege to the specified database to proceed.";
const EXPLANATION3 =
  "If it is your first time setting up a study, please provide your database's ROOT credentials and click the INITIALISE DATABASE button to setup the tables and a user with INSERT only privilege for this database.";
const NO_PASSWORD_EXPLANATION =
  "By clicking this checkbox, you are selecting to not include the MySQL INSERT-only user password in the JSON study config file used by AWARE-Light. You will instead provide the password to study users who will then input it manually into AWARE-Light when they sign up to the study.";
export default function StudyInformation() {
  const [studyInformation, setStudyInformation] = useRecoilState(
    studyFormStudyInformationState
  );
  const navigateTo = useNavigate();

  const updateFormByField = (fieldName, value) => {
    setStudyInformation({
      ...studyInformation,
      [fieldName]: value,
    });
  };

  function isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  }

  function emailNotification() {
    if (studyInformation.email == null) {
      return <p />;
    }
    if (!isValidEmail(studyInformation.email)) {
      // email not valid
      return (
        <p
          className="validity"
          style={{ color: "red" }}
          // marginTop={5}
          // marginLeft={10}
        >
          Invalid email
        </p>
      );
    }
    return (
      <p className="validity" style={{ color: "green" }}>
        Email is valid.
      </p>
    );
  }

  return (
    <ThemeProvider theme={customisedTheme}>
      <div className="main_vertical_layout">
        <div className="border">
          <p className="title">{TITLE1}</p>
          <p className="explanation">{EXPLANATION1}</p>
          <Field
            fieldName="Study title*"
            recoilState={studyFormStudyInformationState}
            field="studyTitle"
            inputLabel="Study title"
            required
          />
          <Field
            fieldName="description*"
            recoilState={studyFormStudyInformationState}
            field="description"
            inputLabel="Description"
          />
          <Field
            fieldName="Researcher's first name*"
            recoilState={studyFormStudyInformationState}
            field="firstName"
            inputLabel="First name"
          />
          <Field
            fieldName="Researcher's last name*"
            recoilState={studyFormStudyInformationState}
            field="lastName"
            inputLabel="Last name"
          />
          <Field
            fieldName="Researcher's email*"
            recoilState={studyFormStudyInformationState}
            field="email"
            inputLabel="Email"
          />

          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <Grid width="20%" />
            <Grid width="80%">{emailNotification()}</Grid>
          </Grid>
        </div>

        <div className="border">
          <p className="title">{TITLE2}</p>
          <p className="explanation">{EXPLANATION2}</p>
          <Field
            fieldName="Host / Server IP*"
            recoilState={studyFormStudyInformationState}
            field="host"
            inputLabel="Host"
          />
          <Field
            fieldName="Port number*"
            recoilState={studyFormStudyInformationState}
            field="portNumber"
            inputLabel="Port number"
          />
          <Field
            fieldName="Database name*"
            recoilState={studyFormStudyInformationState}
            field="databaseName"
            inputLabel="Database name"
          />
          <Field
            fieldName="INSERT-only username*"
            recoilState={studyFormStudyInformationState}
            field="insertOnlyUsername"
            inputLabel="Insert only username"
          />
          <Field
            fieldName="INSERT-only password*"
            recoilState={studyFormStudyInformationState}
            field="insertOnlyPassword"
            inputLabel="Insert only password"
          />

          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <Grid width="20%" />
            <Grid width="80%">
              <FormControlLabel
                control={
                  <Checkbox
                    checked={
                      studyInformation.NoPasswordInJSONFile
                        ? studyInformation.NoPasswordInJSONFile
                        : false
                    }
                    onChange={(_, checked) => {
                      updateFormByField("NoPasswordInJSONFile", checked);
                    }}
                  />
                }
                label="No password in JSON file"
              />
              <p style={{ fontSize: "1 rem" }}>{NO_PASSWORD_EXPLANATION}</p>
            </Grid>
          </Grid>

          <Box sx={{ width: "100%" }} mt={5} marginBottom={2}>
            <Grid
              container
              rowSpacing={1}
              columnSpacing={{ xs: 1, sm: 2, md: 23 }}
            >
              <Grid xs={6}>
                <Button
                  color="main"
                  variant="contained"
                  onClick={() => {
                    // test code
                    Axios({
                      method: "post",
                      url: "test_connection/",
                      data: {
                        key1: "val1",
                        key2: "val2",
                        key3: "val3",
                      },
                    })
                      .then((r) => {
                        console.log(r);
                      })
                      .catch((err) => {
                        console.log(err);
                      });
                  }}
                >
                  TEST CONNECTION
                </Button>
              </Grid>
            </Grid>
          </Box>
        </div>

        <div className="border">
          <p className="explanation">{EXPLANATION3}</p>
          <Field
            fieldName="Root username"
            recoilState={studyFormStudyInformationState}
            field="rootUsername"
            inputLabel="Root username"
          />
          <Field
            fieldName="Root password"
            recoilState={studyFormStudyInformationState}
            field="rootPassword"
            inputLabel="Root password"
          />

          <Box sx={{ width: "100%" }} mt={5} marginBottom={2}>
            <Grid
              container
              rowSpacing={1}
              columnSpacing={{ xs: 1, sm: 2, md: 23 }}
            >
              <Grid xs={6}>
                <Button
                  color="main"
                  variant="contained"
                  onClick={() => {
                    navigateTo("/study/questions");
                  }}
                >
                  INITIALIZE DATABASE
                </Button>
              </Grid>
            </Grid>
          </Box>
        </div>

        <Box sx={{ width: "100%" }} mt={5} marginBottom={5}>
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 23 }}
          >
            <Grid xs />
            <Grid xs="auto">
              <Button
                color="main"
                variant="contained"
                onClick={() => {
                  navigateTo("/study/questions");
                }}
              >
                NEXT STEP: QUESTIONS
              </Button>
            </Grid>
          </Grid>
        </Box>
      </div>
    </ThemeProvider>
  );
}
