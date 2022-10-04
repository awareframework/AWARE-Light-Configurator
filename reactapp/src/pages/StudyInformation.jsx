import "./StudyInformation.css";
import React, { useState } from "react";
import Grid from "@mui/material/Unstable_Grid2";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useRecoilState, useSetRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import { Button, Modal, ThemeProvider } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import {
  databaseInformationState,
  isLoadingState,
  studyFormStudyInformationState,
} from "../functions/atom";
import Field from "../components/Field/Field";
import customisedTheme from "../functions/theme";
import Axios from "../functions/axiosSettings";
import PasswordField from "../components/PasswordField/PasswordField";

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
  const [isLoading, setIsLoading] = useRecoilState(isLoadingState);
  const navigateTo = useNavigate();

  const [testConnectResponse, setTestConnectResponse] = useState("");
  const [initDBResponse, setInitDBResponse] = useState("");

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

  function validationMessage() {
    const x = document.getElementById("validation_message");
    // Add the "show" class to DIV
    x.className = "show";
    // After 3 seconds, remove the show class from DIV
    setTimeout(function () {
      x.className = x.className.replace("show", "");
    }, 3000);
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
            field="study_title"
            inputLabel="Study title"
            required
          />
          <Field
            fieldName="description*"
            recoilState={studyFormStudyInformationState}
            field="study_description"
            inputLabel="Description"
          />
          <Field
            fieldName="Researcher's first name*"
            recoilState={studyFormStudyInformationState}
            field="researcher_first"
            inputLabel="First name"
          />
          <Field
            fieldName="Researcher's last name*"
            recoilState={studyFormStudyInformationState}
            field="researcher_last"
            inputLabel="Last name"
          />
          <Field
            fieldName="Researcher's email*"
            recoilState={studyFormStudyInformationState}
            field="researcher_contact"
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
            recoilState={databaseInformationState}
            field="database_host"
            inputLabel="Host"
          />
          <Field
            fieldName="Port number*"
            recoilState={databaseInformationState}
            field="database_port"
            inputLabel="Port number"
          />
          <Field
            fieldName="Database name*"
            recoilState={databaseInformationState}
            field="database_name"
            inputLabel="Database name"
          />
          <Field
            fieldName="INSERT-only username*"
            recoilState={databaseInformationState}
            field="database_username"
            inputLabel="Insert only username"
          />
          <PasswordField
            fieldName="INSERT-only password*"
            recoilState={databaseInformationState}
            field="database_password"
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
                    console.log(dbInformation);
                    setIsLoading(true);
                    // test code
                    Axios({
                      method: "post",
                      url: "test_connection/",
                      data: {
                        ip: dbInformation.database_host,
                        port: dbInformation.database_port,
                        database: dbInformation.database_name,
                        username: dbInformation.database_username,
                        password: dbInformation.database_password,
                      },
                    })
                      .then((r) => {
                        setTestConnectResponse({
                          isSuccess: r.data.success,
                          msg: r.data.msg,
                        });
                      })
                      .catch((err) => {
                        setTestConnectResponse({
                          isSuccess: false,
                          msg: err.message,
                        });
                      })
                      .finally(() => {
                        setIsLoading(false);
                      });
                  }}
                >
                  TEST CONNECTION
                </Button>
              </Grid>
              <Grid xs={12}>
                <p
                  className={
                    testConnectResponse.isSuccess ? "success" : "error"
                  }
                >
                  {testConnectResponse.msg}
                </p>
              </Grid>
            </Grid>
          </Box>
        </div>

        <div className="border">
          <p className="explanation">{EXPLANATION3}</p>
          <Field
            fieldName="Root username"
            recoilState={databaseInformationState}
            field="rootUsername"
            inputLabel="Root username"
          />
          <PasswordField
            fieldName="Root password"
            recoilState={databaseInformationState}
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
                    setIsLoading(true);
                    Axios({
                      method: "post",
                      url: "initialize_database/",
                      data: {
                        ip: dbInformation.database_host,
                        port: dbInformation.database_port,
                        database: dbInformation.database_name,
                        username: dbInformation.database_username,
                        password: dbInformation.database_password,
                        root_username: dbInformation.rootUsername,
                        root_password: dbInformation.rootPassword,
                      },
                    })
                      .then((r) => {
                        setInitDBResponse({
                          isSuccess: r.data.success,
                          msg: r.data.msg,
                        });
                      })
                      .catch((err) => {
                        setInitDBResponse({
                          isSuccess: false,
                          msg: err.message,
                        });
                      })
                      .finally(() => {
                        setIsLoading(false);
                      });
                  }}
                >
                  INITIALIZE DATABASE
                </Button>
              </Grid>
              <Grid xs={12}>
                <p className={initDBResponse.isSuccess ? "success" : "error"}>
                  {initDBResponse.msg}
                </p>
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
                  // TODO: validations
                  const validation =
                    studyInformation.study_title &&
                    studyInformation.study_description &&
                    studyInformation.researcher_first &&
                    studyInformation.researcher_last &&
                    studyInformation.researcher_contact &&
                    dbInformation.database_host &&
                    dbInformation.database_port &&
                    dbInformation.database_name &&
                    dbInformation.database_username &&
                    dbInformation.database_password;
                  if (validation) {
                    navigateTo("/study/questions");
                  } else {
                    validationMessage();
                  }
                }}
              >
                NEXT STEP: QUESTIONS
              </Button>
              <div id="validation_message">Missing requred fields</div>
            </Grid>
          </Grid>
        </Box>
        <Modal open={isLoading}>
          <CircularProgress />
        </Modal>
      </div>
    </ThemeProvider>
  );
}
