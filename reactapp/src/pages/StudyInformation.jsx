import "./StudyInformation.css";
import React, { useRef, useState } from "react";
import Grid from "@mui/material/Unstable_Grid2";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useRecoilState, useSetRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import { Button, Modal, ThemeProvider } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import {
  databaseInformationState,
  databaseConnectionState,
  isLoadingState,
  studyFormStudyInformationState,
} from "../functions/atom";
import Field from "../components/Field/Field";
import customisedTheme from "../functions/theme";
import Axios from "../functions/axiosSettings";
import PasswordField from "../components/PasswordField/PasswordField";
import CustomizedCheckbox from "../components/CustomizedCheckbox/CustomizedCheckbox";

const TITLE1 = "Study Information";
const EXPLANATION1 =
  "Basic information of the study. This information will be presented to participants upon joining your study.";

const TITLE2 = "Database Configuration";
const NO_PASSWORD_EXPLANATION =
  "By clicking this checkbox, you are selecting to not include the MySQL INSERT-only user password in the JSON study config file used by AWARE-Light. You will instead provide the password to study participants who will then input it manually into AWARE-Light when they sign up to the study.";

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
  const [isDbConnected, setIsDbConnected] = useRecoilState(
    databaseConnectionState
  );

  const [blankFields, setBlankFields] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const updateBlankFields = (name) => {
    setBlankFields((oldArray) => [...oldArray, name]);
  };

  const validationOn = () => {
    setOpen(true);
  };

  const validationClose = () => {
    setOpen(false);
    setBlankFields((oldArray) => []);
  };

  const updateFormByField = (fieldName, value) => {
    setdbInformation({
      ...dbInformation,
      [fieldName]: value,
    });
  };

  const [validation, setValidation] = React.useState(true);

  const validate = (value) => {
    setValidation(value);
  };

  function initializeDB() {
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
        require_ssl: dbInformation.require_ssl,
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
  }

  function testDBConnection() {
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
        setIsDbConnected(r.data.success);
      })
      .catch((err) => {
        setTestConnectResponse({
          isSuccess: false,
          msg: err.message,
        });
        setIsDbConnected(false);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  const checkValidation = () => {
    if (
      !("study_title" in studyInformation) ||
      !("study_description" in studyInformation) ||
      !("researcher_first" in studyInformation) ||
      !("researcher_last" in studyInformation) ||
      !("researcher_contact" in studyInformation) ||
      !("database_host" in dbInformation) ||
      !("database_port" in dbInformation) ||
      !("database_name" in dbInformation) ||
      !("database_username" in dbInformation) ||
      !("database_password" in dbInformation) ||
      !studyInformation.study_title ||
      !studyInformation.study_description ||
      !studyInformation.researcher_first ||
      !studyInformation.researcher_last ||
      !studyInformation.researcher_contact ||
      !dbInformation.database_host ||
      !dbInformation.database_port ||
      !dbInformation.database_name ||
      !dbInformation.database_username ||
      !dbInformation.database_password
      // !isDbConnected
    ) {
      return false;
    }
    return true;
  };

  function alertDialog() {
    // console.log(blankFields);
    return (
      <div>
        <Dialog
          open={open}
          onClose={validationClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            Required fields are left blank.
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Fields are missing or problems occur:{"\n"}
              {/* {blankFields} */}
              {blankFields.map((item) => (
                <li key={item}>{item}</li>
              ))}
              Are you sure going to next page?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={validationClose} autoFocus>
              Cancel
            </Button>
            <Button
              onClick={() => {
                validationClose();
                navigateTo("/study/questions");
              }}
            >
              Next page
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }

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
        <p className="validity" style={{ color: "red" }}>
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

  function alertDBConnectionFailed() {
    return (
      <div>
        <Dialog
          open={open}
          onClose={validationClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            Database Connection Failed
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Please click the TEST CONNECTION button to make sure the database
              information is correct. Are you sure to go to next page without
              verifying or with the incorrect database information?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={validationClose} autoFocus>
              Back
            </Button>
            <Button
              onClick={() => {
                validationClose();
                navigateTo("/study/questions");
              }}
            >
              Yes
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }

  function nextPage() {
    if (!validation) {
      return alertDialog();
    }
    if (!isDbConnected) {
      return alertDBConnectionFailed();
    }
    return <div />;
  }

  return (
    <ThemeProvider theme={customisedTheme}>
      <div className="main_vertical_layout">
        <div className="border">
          <p className="title">{TITLE1}</p>
          <p className="explanation">{EXPLANATION1}</p>
          <Field
            fieldName="Study title"
            recoilState={studyFormStudyInformationState}
            field="study_title"
            inputLabel="Study title"
            required
          />
          <Field
            fieldName="description"
            recoilState={studyFormStudyInformationState}
            field="study_description"
            inputLabel="Description"
            required
          />
          <Field
            fieldName="Researcher's first name"
            recoilState={studyFormStudyInformationState}
            field="researcher_first"
            inputLabel="First name"
            required
          />
          <Field
            fieldName="Researcher's last name"
            recoilState={studyFormStudyInformationState}
            field="researcher_last"
            inputLabel="Last name"
            required
          />
          <Field
            fieldName="Researcher's email"
            recoilState={studyFormStudyInformationState}
            field="researcher_contact"
            inputLabel="Email"
            required
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
          <p className="explanation">
            For this step you will need the name of your MySQL database, its
            hostname and port number.
            <br />
            <br />
            If this is your first time setting up the study, then you will need
            to set up the database tables and the required INSERT-only user
            account by the following initialisation process:
            <br />
            <br />
            1) Create a new database
            <br />
            <br />
            2) Provide the name of the database you just created, a username for
            an INSERT-only account that will be created, and the password for
            the account to be created.
            <br />
            <br />
            3) Fill in the root username and password of your database.
            <br />
            <br />
            4) Press the INITIALIZE DATABASE button.
            <br />
            <br />
            The TEST CONNECTION button can then be used to test that the
            database and INSERT-only account are working.
          </p>

          <Field
            fieldName="Host Server IP/URL"
            recoilState={databaseInformationState}
            field="database_host"
            inputLabel="Host"
            required
          />
          <Field
            fieldName="Port number"
            recoilState={databaseInformationState}
            field="database_port"
            inputLabel="Port number"
            required
          />
          <Field
            fieldName="Database name"
            recoilState={databaseInformationState}
            field="database_name"
            inputLabel="Database name"
            required
          />
          <Field
            fieldName="INSERT-only username"
            recoilState={databaseInformationState}
            field="database_username"
            inputLabel="Insert only username"
            required
          />
          <Field
            fieldName="INSERT-only password"
            recoilState={databaseInformationState}
            field="database_password"
            inputLabel="Insert only password"
            type="password"
            required
          />

          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <Grid width="20%" />
            <Grid width="80%">
              <CustomizedCheckbox
                recoilState={databaseInformationState}
                field="config_without_password"
                label="No password in JSON file"
              />
              <p style={{ fontSize: "1 rem" }}>{NO_PASSWORD_EXPLANATION}</p>
            </Grid>
          </Grid>

          <p />
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
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <Grid width="20%" />
            <Grid width="80%">
              <CustomizedCheckbox
                recoilState={databaseInformationState}
                field="require_ssl"
                label="Require SSL connection for database"
              />
              <p style={{ fontSize: "1rem" }}>
                By clicking this checkbox, your INSERT-only user will be created
                such that your server will accept incoming connections from your
                INSERT-only user ONLY if they use SSL/TLS encryption. See &nbsp;
                <a
                  href="https://dev.mysql.com/doc/refman/8.0/en/using-encrypted-connections.html#mandatory-encrypted-connections"
                  target="_blank"
                  style={{ fontStyle: "italic" }}
                  rel="noreferrer"
                >
                  SSL/TLS encryption
                </a>{" "}
                for more information on managing SSL/TLS in MySQL. Please note
                that if you are using this Configurator to edit an existing
                study, checking/unchecking this option will have no effect, and
                any further changes to the INSERT-only user will need to be made
                directly via MySQL.
              </p>
            </Grid>
          </Grid>
          <Box sx={{ width: "100%", margin: "0 auto" }}>
            <Grid
              container
              justifyContent="center"
              rowSpacing={1}
              columnSpacing={{ xs: 1, sm: 4, md: 6 }}
            >
              <Grid>
                <Button
                  color="main"
                  variant="contained"
                  onClick={() => {
                    setIsLoading(true);
                    initializeDB();
                  }}
                >
                  INITIALIZE DATABASE
                </Button>
              </Grid>
              <Grid>
                <Button
                  color="main"
                  variant="contained"
                  onClick={() => {
                    setIsLoading(true);
                    testDBConnection();
                  }}
                >
                  TEST CONNECTION
                </Button>
              </Grid>
            </Grid>
            <Grid
              container
              rowSpacing={1}
              columnSpacing={{ xs: 1, sm: 2, md: 23 }}
            >
              <Grid xs={12}>
                <p className={initDBResponse.isSuccess ? "success" : "error"}>
                  {initDBResponse.msg}
                </p>
              </Grid>
              {/* <Grid xs={12}> */}
              {/*  <p className="explanation"> */}
              {/*    Note: if INITIALISE DATABASE is failing despite correct root */}
              {/*    credentials, (1) make sure port 3306 is open and (2) if your */}
              {/*    DB enforces an SSL connection, temporarily turn it off while */}
              {/*    using the configurator. */}
              {/*  </p> */}
              {/* </Grid> */}
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
                  validationOn();
                  validate(checkValidation());
                  // testDBConnection();
                  // console.log(checkValidation());

                  if (checkValidation() && isDbConnected) {
                    navigateTo("/study/questions");
                  } else {
                    if (!studyInformation.study_title) {
                      updateBlankFields("study title");
                    }
                    if (!studyInformation.study_description) {
                      updateBlankFields("study description");
                    }
                    if (!studyInformation.researcher_first) {
                      updateBlankFields("researcher's first name");
                    }
                    if (!studyInformation.researcher_last) {
                      updateBlankFields("researcher's last name");
                    }
                    if (!studyInformation.researcher_contact) {
                      updateBlankFields("researcher's contact (email)");
                    }
                    if (!dbInformation.database_host) {
                      updateBlankFields("database host (server IP)");
                    }
                    if (!dbInformation.database_port) {
                      updateBlankFields("database port number");
                    }
                    if (!dbInformation.database_name) {
                      updateBlankFields("datatbase name");
                    }
                    if (!dbInformation.database_username) {
                      updateBlankFields("INSERT-only username");
                    }
                    if (!dbInformation.database_password) {
                      updateBlankFields("INSERT-only password");
                    }
                    if (!isDbConnected) {
                      updateBlankFields("Incorrect database information");
                    }
                  }
                }}
                // disabled={!checkValidation()}
              >
                NEXT STEP: QUESTIONS
              </Button>
              {nextPage()}
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
