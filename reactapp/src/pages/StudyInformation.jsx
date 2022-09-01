import "./StudyInformation.css";
import React, { useState } from "react";
import Grid from "@mui/material/Unstable_Grid2";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { studyFormStudyInformationState } from "../functions/atom";
import InputField from "../components/InputField/InputField";
import Field from "../components/Field/Field";

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
    <div>
      <div className="main_vertical_layout">
        <p className="title">{TITLE1}</p>
        <p className="explanation">{EXPLANATION1}</p>

        <Box
          sx={{ width: "120%" }}
          mt={1}
          marginBottom={5}
          ml={-1}
          boxShadow="1px 2px 9px #F4AAB9"
        >
          <Field
            fieldName="study title*"
            studyInfoField={studyInformation.studyTitle}
            inputLabel="Study title"
            field="studyTitle"
          />
          <Field
            fieldName="description*"
            studyInfoField={studyInformation.description}
            inputLabel="Description"
            field="description"
          />
          <Field
            fieldName="Researcher's first name*"
            studyInfoField={studyInformation.firstName}
            inputLabel="First name"
            field="firstName"
          />
          <Field
            fieldName="Researcher's last name*"
            studyInfoField={studyInformation.lastName}
            inputLabel="Last name"
            field="lastName"
          />
          <Field
            fieldName="Researcher's email*"
            studyInfoField={studyInformation.email}
            inputLabel="Email"
            field="email"
          />

          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <Grid width={250} />
            <Grid width={300}>{emailNotification()}</Grid>
          </Grid>
        </Box>

        <p className="title">{TITLE2}</p>
        <p className="explanation">{EXPLANATION2}</p>
        <Box sx={{ width: "100%" }}>
          <Field
            fieldName="Host / Server IP*"
            studyInfoField={studyInformation.host}
            inputLabel="Host"
            field="host"
          />
          <Field
            fieldName="Port number*"
            studyInfoField={studyInformation.portNumber}
            inputLabel="Port number"
            field="portNumber"
          />
          <Field
            fieldName="Database name*"
            studyInfoField={studyInformation.databaseName}
            inputLabel="Database name"
            field="databaseName"
          />
          <Field
            fieldName="INSERT-only username*"
            studyInfoField={studyInformation.insertOnlyUsername}
            inputLabel="Insert only username"
            field="insertOnlyUsername"
          />
          <Field
            fieldName="INSERT-only password*"
            studyInfoField={studyInformation.insertOnlyPassword}
            inputLabel="Insert only password"
            field="insertOnlyPassword"
          />

          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <Grid width={250} />
            <Grid width={500}>
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
          <Button variant="contained">TEST CONNECTION</Button>
        </Box>

        <p className="explanation">{EXPLANATION3}</p>
        <Box sx={{ width: "100%" }}>
          <Field
            fieldName="Root username"
            studyInfoField={studyInformation.rootUsername}
            inputLabel="Root username"
            field="rootUsername"
          />
          <Field
            fieldName="Root password"
            studyInfoField={studyInformation.rootPassword}
            inputLabel="Root password"
            field="rootPassword"
          />
        </Box>

        <Box sx={{ width: "100%" }} mt={2}>
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <Grid width={250}>
              <Button variant="contained">INITIALIZE DATABASE</Button>
            </Grid>
            <Grid width={300} />
          </Grid>
        </Box>

        <Box sx={{ width: "100%" }} mt={5} marginBottom={5}>
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 23 }}
            justifyContent="flex-end"
          >
            <Button
              variant="contained"
              onClick={() => {
                // console.log(studyInformation);
                navigateTo("/study/overview");
                console.log(studyInformation);
              }}
            >
              NEXT STEP: QUESTIONS
            </Button>
          </Grid>
        </Box>
      </div>
    </div>

    // <div>Study Information</div>
  );
}
