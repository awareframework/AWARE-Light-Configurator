import "./Main.css";
import { Button, Divider, ThemeProvider } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { createTheme } from "@mui/material/styles";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import LockIcon from "@mui/icons-material/Lock";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import GitHubIcon from "@mui/icons-material/GitHub";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import Grid from "@mui/material/Unstable_Grid2";
import React from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import PageHeader from "../components/PageHeader/PageHeader";
import {
  studyFormQuestionsState,
  studyFormScheduleConfigurationState,
  studyFormStudyInformationState,
} from "../functions/atom";
import customisedTheme from "../functions/theme";
import Axios from "../functions/axiosSettings";
import { SET_SCHEDULES } from "../components/ScheduleComponent/ScheduleComponent";

export default function Main() {
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
  return (
    <div>
      <PageHeader />
      <div className="main_vertical_layout">
        <p className="main_title">AWARE-Light Configuration Page</p>
        <p className="main_description">
          Use this page to create a study configuration for AWARE-Light. Here,
          you can define studies that use smartphones to conduct Experience
          Sampling, and to collect sensor data.
        </p>

        <ThemeProvider theme={customisedTheme}>
          <div className="main_horizontal_layout">
            <Button
              variant="contained"
              style={{ marginRight: "1rem" }}
              color="main"
              onClick={() => {
                setStudyInformation({});
                setStudyFormQuestions([{}]);
                setStudyFormScheduleConfiguration([
                  {
                    schedule_type: SET_SCHEDULES,
                    number: `08:00`,
                    last_hour: `20:00`,
                    number_of_triggers: 6,
                    inter_notification_time: 15,
                  },
                ]);

                navigateTo("/study/study_information");
              }}
            >
              <AddIcon />
              Design your own study
            </Button>

            <Button variant="outlined" color="main">
              <EditIcon />
              Update an existing study
            </Button>
          </div>

          <Grid container spacing={2} className="main_grid">
            <Grid xs={4}>
              <AutoFixHighIcon color="main" sx={{ fontSize: 70 }} />
              <p>Easy to use, no programming required!</p>
            </Grid>
            <Grid xs={4}>
              <PhoneIphoneIcon color="main" sx={{ fontSize: 70 }} />
              <p>Collect data from virtually any sensor on the phone.</p>
            </Grid>
            <Grid xs={4}>
              <LockIcon color="main" sx={{ fontSize: 70 }} />
              <p>
                Your participant's data is secure,thanks to SHA-256 RSA
                encryption.
              </p>
            </Grid>
            <Grid xs={4}>
              <AccessTimeIcon color="main" sx={{ fontSize: 70 }} />
              <p>Detailed scheduling configuration options.</p>
            </Grid>
            <Grid xs={4}>
              <GitHubIcon color="main" sx={{ fontSize: 70 }} />
              <p>
                Source code is{" "}
                <a href="https://github.com/awareframework/AWARE-Light-Configurator">
                  publicly available
                </a>
                , and we welcome your ideas and contributions.
              </p>
            </Grid>
            <Grid xs={4}>
              <AttachMoneyIcon color="main" sx={{ fontSize: 70 }} />
              <p>AWARE-Light is completely free to use.</p>
            </Grid>
          </Grid>
        </ThemeProvider>

        <Divider light />

        <Grid container spacing={2}>
          <Grid xs={6}>
            <p style={{ fontSize: "1.5rem", color: "black" }}>
              Experience Sampling
            </p>
            <p>
              Experience Sampling is a widely applied method to measure
              behaviour, thoughts, and feelings of study participants throughout
              their daily lives. Data is collected through self-reports
              filled-out by the study participants. Study data is collected{" "}
              <em>in situ</em> data; in the participant’s actual context and
              close to the onset of the studied phenomenon.
            </p>
          </Grid>
          <Grid xs={6}>
            <p style={{ fontSize: "1.5rem", color: "black" }}>About</p>
            <p>
              AWARE-Light is a version of the AWARE Android framework dedicated
              to instrument, infer, log, and share mobile context information.
              It allows for the collection of over 25 different sensors, ranging
              from the user's GPS location to application usage.
            </p>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
