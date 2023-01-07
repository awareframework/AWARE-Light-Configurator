import React, { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import { Button, Link, ThemeProvider } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./ScheduleConfiguration.css";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import {
  studyFormQuestionsState,
  studyFormScheduleConfigurationState,
} from "../functions/atom";
import customisedTheme from "../functions/theme";
import ScheduleComponent, {
  SET_SCHEDULES,
} from "../components/ScheduleComponent/ScheduleComponent";

export default function ScheduleConfiguration() {
  const navigateTo = useNavigate();
  const [schedules, setSchedules] = useRecoilState(
    studyFormScheduleConfigurationState
  );

  const questions = useRecoilValue(studyFormQuestionsState);
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

  const [validation, setValidation] = React.useState(true);

  const validate = (value) => {
    setValidation(value);
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
            Schedule incorrect or with missing values.
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              The following schedules are missing values or having problems:
              {"\n"}
              {/* {blankFields} */}
              {blankFields.map((item) => (
                <li key={item}>Schedule {item + 1}</li>
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
                navigateTo("/study/sensor_data");
              }}
            >
              Next page
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }

  const addSchedules = () => {
    const newQuestions = [
      ...schedules,
      {
        type: SET_SCHEDULES,
        firsthour: `08:00`,
        lasthour: `20:00`,
        randomCount: 6,
        randomInterval: 15,
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

  const checkValidation = () => {
    if (
      (questions.length === 0 || Object.keys(questions).length === 0) &&
      !(schedules.length === 0)
    ) {
      return false;
    }

    if (!(questions.length === 0) && schedules.length === 0) {
      return false;
    }

    for (let i = 0; i < schedules.length; i += 1) {
      const each = schedules[i];
      if (!each.questions || !each.title || !("title" in each)) {
        return false;
      }

      let flag = false;
      // eslint-disable-next-line no-restricted-syntax
      for (const key in each.questions) {
        if (each.questions[key] === true) {
          flag = true;
          break;
        }
      }
      if (!flag) {
        return false;
      }
    }
    return true;
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
                  validationOn();
                  validate(checkValidation());
                  console.log(questions.length);
                  console.log(questions);
                  if (checkValidation()) {
                    navigateTo("/study/sensor_data");
                  }
                  if (
                    (questions.length === 0 ||
                      Object.keys(questions).length === 0) &&
                    !(schedules.length === 0)
                  ) {
                    updateBlankFields(
                      "More than one schedule but zero questions"
                    );
                  } else if (
                    !(
                      questions.length === 0 ||
                      Object.keys(questions).length === 0
                    ) &&
                    schedules.length === 0
                  ) {
                    updateBlankFields("No schedules");
                  } else {
                    for (let i = 0; i < schedules.length; i += 1) {
                      const each = schedules[i];
                      if (
                        !each.questions ||
                        !each.title ||
                        !("title" in each)
                      ) {
                        updateBlankFields(i);
                      }
                    }
                  }
                }}
                // disabled={!checkValidation()}
              >
                NEXT STEP: SENSOR DATA
              </Button>
              {!validation ? alertDialog() : <div />}
            </Grid>
          </Grid>
        </Box>
      </div>
    </ThemeProvider>
  );
}
