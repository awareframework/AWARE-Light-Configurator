import "./StudyInformation.css";
import React from "react";
import { Button, TextField } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import { studyFormStudyInformationState } from "../functions/atom";

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

  return (
    <div>
      <div className="main_vertical_layout">
        <p className="title">{TITLE1}</p>
        <p className="explanation">{EXPLANATION1}</p>

        <Box sx={{ width: "100%" }}>
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <Grid width={250}>
              <p style={{ fontSize: "1 rem", color: "black" }}>study title*</p>
            </Grid>
            <Grid width={300}>
              <TextField
                id="outlined-basic"
                label="The title of your study"
                variant="outlined"
                style={{ width: 600 }}
                value={
                  studyInformation.studyTitle ? studyInformation.studyTitle : ""
                }
                onChange={(event) => {
                  updateFormByField("studyTitle", event.target.value);
                }}
              />
            </Grid>
          </Grid>

          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <Grid width={250}>
              <p style={{ fontSize: "1 rem", color: "black" }}>description*</p>
            </Grid>
            <Grid width={300}>
              <TextField
                id="outlined-basic"
                label="A short description of your study"
                variant="outlined"
                style={{ width: 600 }}
                value={
                  studyInformation.description
                    ? studyInformation.description
                    : ""
                }
                onChange={(event) => {
                  updateFormByField("description", event.target.value);
                }}
              />
            </Grid>
          </Grid>

          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <Grid width={250}>
              <p style={{ fontSize: "1 rem", color: "black" }}>
                Researcher's first name*
              </p>
            </Grid>
            <Grid width={300}>
              <TextField
                id="outlined-basic"
                label="First name"
                variant="outlined"
                style={{ width: 600 }}
                value={
                  studyInformation.firstName ? studyInformation.firstName : ""
                }
                onChange={(event) => {
                  updateFormByField("firstName", event.target.value);
                }}
              />
            </Grid>
          </Grid>

          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <Grid width={250}>
              <p style={{ fontSize: "1 rem", color: "black" }}>
                Researcher's last name*
              </p>
            </Grid>
            <Grid width={300}>
              <TextField
                id="outlined-basic"
                label="Last name"
                variant="outlined"
                style={{ width: 600 }}
                value={
                  studyInformation.lastName ? studyInformation.lastName : ""
                }
                onChange={(event) => {
                  updateFormByField("lastName", event.target.value);
                }}
              />
            </Grid>
          </Grid>

          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <Grid width={250}>
              <p style={{ fontSize: "1 rem", color: "black" }}>
                Researcher's email*
              </p>
            </Grid>
            <Grid width={300}>
              <TextField
                id="outlined-basic"
                label="example@email.com"
                variant="outlined"
                style={{ width: 600 }}
                value={studyInformation.email ? studyInformation.email : ""}
                onChange={(event) => {
                  updateFormByField("email", event.target.value);
                }}
              />
            </Grid>
          </Grid>
        </Box>

        <p className="title">{TITLE2}</p>
        <p className="explanation">{EXPLANATION2}</p>
        <Box sx={{ width: "100%" }}>
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <Grid width={250}>
              <p style={{ fontSize: "1 rem", color: "black" }}>
                Host / Server IP*
              </p>
            </Grid>
            <Grid width={300}>
              <TextField
                id="outlined-basic"
                label="e.g. 139.130.4.5"
                variant="outlined"
                style={{ width: 600 }}
                value={
                  studyInformation.ipAddress ? studyInformation.ipAddress : ""
                }
                onChange={(event) => {
                  updateFormByField("ipAddress", event.target.value);
                }}
              />
            </Grid>
          </Grid>

          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <Grid width={250}>
              <p style={{ fontSize: "1 rem", color: "black" }}>Port number*</p>
            </Grid>
            <Grid width={300}>
              <TextField
                id="outlined-basic"
                label="e.g. 3306"
                variant="outlined"
                style={{ width: 600 }}
                value={
                  studyInformation.portNumber ? studyInformation.portNumber : ""
                }
                onChange={(event) => {
                  updateFormByField("portNumber", event.target.value);
                }}
              />
            </Grid>
          </Grid>

          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <Grid width={250}>
              <p style={{ fontSize: "1 rem", color: "black" }}>
                Database name*
              </p>
            </Grid>
            <Grid width={300}>
              <TextField
                id="outlined-basic"
                label="Database name"
                variant="outlined"
                style={{ width: 600 }}
                value={
                  studyInformation.databaseName
                    ? studyInformation.databaseName
                    : ""
                }
                onChange={(event) => {
                  updateFormByField("databaseName", event.target.value);
                }}
              />
            </Grid>
          </Grid>

          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <Grid width={250}>
              <p style={{ fontSize: "1 rem", color: "black" }}>
                INSERT-only username*
              </p>
            </Grid>
            <Grid width={300}>
              <TextField
                id="outlined-basic"
                label="Username"
                variant="outlined"
                style={{ width: 600 }}
                value={
                  studyInformation.databaseUserName
                    ? studyInformation.databaseUserName
                    : ""
                }
                onChange={(event) => {
                  updateFormByField("databaseUserName", event.target.value);
                }}
              />
            </Grid>
          </Grid>

          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <Grid width={250}>
              <p style={{ fontSize: "1 rem", color: "black" }}>
                INSERT-only password*
              </p>
            </Grid>
            <Grid width={300}>
              <TextField
                id="outlined-basic"
                label="Password"
                variant="outlined"
                style={{ width: 600 }}
                value={
                  studyInformation.databasePassword
                    ? studyInformation.databasePassword
                    : ""
                }
                onChange={(event) => {
                  updateFormByField("databasePassword", event.target.value);
                }}
              />
            </Grid>
          </Grid>

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
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <Grid width={250}>
              <p style={{ fontSize: "1 rem", color: "black" }}>Root username</p>
            </Grid>
            <Grid width={300}>
              <TextField
                id="outlined-basic"
                label="Root username"
                variant="outlined"
                style={{ width: 600 }}
                value={
                  studyInformation.rootUserName
                    ? studyInformation.rootUserName
                    : ""
                }
                onChange={(event) => {
                  updateFormByField("rootUserName", event.target.value);
                }}
              />
            </Grid>
          </Grid>

          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <Grid width={250}>
              <p style={{ fontSize: "1 rem", color: "black" }}>Root password</p>
            </Grid>
            <Grid width={300}>
              <TextField
                id="outlined-basic"
                label="Root password"
                variant="outlined"
                style={{ width: 600 }}
                value={
                  studyInformation.rootPassword
                    ? studyInformation.rootPassword
                    : ""
                }
                onChange={(event) => {
                  updateFormByField("rootPassword", event.target.value);
                }}
              />
            </Grid>
          </Grid>
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
                console.log(studyInformation);
                navigateTo("/study/questions");
              }}
            >
              NEXT STEP: QUESTIONS
            </Button>
            {/* <Grid width={500}></Grid> */}
            {/* <Grid width={500}> */}
            {/*    */}
            {/* </Grid> */}
          </Grid>
        </Box>
      </div>
    </div>

    // <div>Study Information</div>
  );
}
