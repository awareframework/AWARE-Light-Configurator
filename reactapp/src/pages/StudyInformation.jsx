import "./StudyInformation.css";
import React, { useState } from "react";
import Grid from "@mui/material/Unstable_Grid2";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import { Button, ThemeProvider } from "@mui/material";
import {
  databaseInformationState,
  studyFormStudyInformationState,
} from "../functions/atom";
import Field from "../components/Field/Field";
import customisedTheme from "../functions/theme";

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
  const [dbInformation, setdbInformation] = useRecoilState(
    databaseInformationState
  );
  const navigateTo = useNavigate();

  const updateFormByField = (fieldName, value) => {
    setdbInformation({
      ...dbInformation,
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
            fieldName="study title*"
            studyInfoField={studyInformation.study_title}
            inputLabel="Study title"
            field="study_title"
          />
          <Field
            fieldName="description*"
            studyInfoField={studyInformation.study_description}
            inputLabel="Description"
            field="study_description"
          />
          <Field
            fieldName="Researcher's first name*"
            studyInfoField={studyInformation.researcher_first}
            inputLabel="First name"
            field="researcher_first"
          />
          <Field
            fieldName="Researcher's last name*"
            studyInfoField={studyInformation.researcher_last}
            inputLabel="Last name"
            field="researcher_last"
          />
          <Field
            fieldName="Researcher's email*"
            studyInfoField={studyInformation.researcher_contact}
            inputLabel="Email"
            field="researcher_contact"
          />

          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <Grid width="30%" />
            <Grid width="40%">{emailNotification()}</Grid>
          </Grid>
        </div>

        <div className="border">
          <p className="title">{TITLE2}</p>
          <p className="explanation">{EXPLANATION2}</p>
          <Field
            fieldName="Host / Server IP*"
            studyInfoField={dbInformation.database_host}
            inputLabel="Host"
            field="database_host"
          />
          <Field
            fieldName="Port number*"
            studyInfoField={dbInformation.database_port}
            inputLabel="Port number"
            field="database_port"
          />
          <Field
            fieldName="Database name*"
            studyInfoField={dbInformation.database_name}
            inputLabel="Database name"
            field="database_name"
          />
          <Field
            fieldName="INSERT-only username*"
            studyInfoField={dbInformation.database_username}
            inputLabel="Insert only username"
            field="database_username"
          />
          <Field
            fieldName="INSERT-only password*"
            studyInfoField={dbInformation.database_password}
            inputLabel="Insert only password"
            field="database_password"
          />

          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <Grid width="30%" />
            <Grid width="70%">
              <FormControlLabel
                control={
                  <Checkbox
                    checked={
                      dbInformation.config_without_password
                        ? dbInformation.config_without_password
                        : false
                    }
                    onChange={(_, checked) => {
                      updateFormByField("config_without_password", checked);
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
                    navigateTo("/study/questions");
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
            studyInfoField={dbInformation.rootUsername}
            inputLabel="Root username"
            field="rootUsername"
          />
          <Field
            fieldName="Root password"
            studyInfoField={dbInformation.rootPassword}
            inputLabel="Root password"
            field="rootPassword"
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
