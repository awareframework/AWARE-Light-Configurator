import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import { Button, Link, ThemeProvider } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ScheduleComponent, {
  SET_SCHEDULES,
} from "../components/ScheduleComponent/ScheduleComponent";
import "./ScheduleConfiguration.css";
import customisedTheme from "../functions/theme";
import { studyFormScheduleConfigurationState } from "../functions/atom";

export default function ScheduleConfiguration() {
  const navigateTo = useNavigate();
  const [schedules, setSchedules] = useRecoilState(
    studyFormScheduleConfigurationState
  );

  const addSchedules = () => {
    const newQuestions = [
      ...schedules,
      {
        schedule_type: SET_SCHEDULES,
        number: `08:00`,
        last_hour: `20:00`,
        number_of_triggers: 6,
        inter_notification_time: 15,
      },
    ];
    setSchedules(newQuestions);
  };

  const deleteSchedules = (curQuestionIdx) => {
    // delete schedule
    const newQuestions = [...schedules];
    newQuestions.splice(curQuestionIdx, 1);
    setSchedules(newQuestions);
  };

  const scheduleList = [
    schedules.map((_, idx) => {
      return (
        <ScheduleComponent
          key={idx}
          scheduleIndex={idx}
          onDelete={() => {
            deleteSchedules(idx);
          }}
        />
      );
    }),
  ];

  return (
    <ThemeProvider theme={customisedTheme}>
      <div className="study_schedule_vertical_layout">
        {scheduleList}

        <Box sx={{ width: "100%" }} mt={5} marginBottom={5}>
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 23 }}
          >
            <Grid xs={12}>
              <Button
                color="main"
                variant="contained"
                onClick={() => {
                  addSchedules();
                }}
              >
                ADD A NEW SCHEDULE
              </Button>
            </Grid>
            <Grid xs={2}>
              <Button
                color="main"
                variant="contained"
                onClick={() => {
                  navigateTo("/study/questions");
                }}
              >
                BACK
              </Button>
            </Grid>
            <Grid xs />
            <Grid xs="auto">
              <Button
                color="main"
                variant="contained"
                onClick={() => {
                  navigateTo("/study/sensor_data");
                }}
              >
                NEXT STEP: SENSOR DATA
              </Button>
            </Grid>
          </Grid>
        </Box>
      </div>
    </ThemeProvider>
  );
}
