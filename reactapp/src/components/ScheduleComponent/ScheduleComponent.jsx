import Grid from "@mui/material/Unstable_Grid2";
import React, { useEffect } from "react";
import PropTypes from "prop-types";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
} from "@mui/material";
import Box from "@mui/material/Box";
import "./ScheduleComponent.css";
import DeleteIcon from "@mui/icons-material/Delete";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { useRecoilState, useRecoilValue } from "recoil";
import { useNavigate } from "react-router-dom";
import Field from "../Field/Field";
import {
  databaseInformationState,
  studyFormQuestionsState,
  studyFormScheduleConfigurationState,
  studyFormStudyInformationState,
} from "../../functions/atom";
import { padding } from "../../functions/utils";
import CustomizedCheckbox from "../CustomizedCheckbox/CustomizedCheckbox";

export const SET_SCHEDULES = "interval";
export const RANDOM_TRIGGERS = "random";
export const REPEAT_INTERVALS = "repeat";

export default function ScheduleComponent(input) {
  const { scheduleIndex, onDelete } = input;
  const [schedules, setSchedules] = useRecoilState(
    studyFormScheduleConfigurationState
  );
  const questions = useRecoilValue(studyFormQuestionsState);

  const updateFormByField = (fieldName, value) => {
    const newSchedules = [...schedules].map((each, idx) => {
      if (idx === scheduleIndex) {
        return { ...each, [fieldName]: value };
      }
      return each;
    });
    setSchedules(newSchedules);
  };
  // initialize schedule type to "set schedules" if type is empty
  useEffect(() => {
    if (
      schedules[scheduleIndex].type === null ||
      schedules[scheduleIndex].type === undefined ||
      schedules[scheduleIndex].type === ""
    ) {
      console.log(schedules[scheduleIndex].type);
      updateFormByField("type", SET_SCHEDULES);
    }
  }, []);

  function getScheduleByType(scheduleName) {
    if (scheduleName === REPEAT_INTERVALS) {
      return (
        <Field
          fieldName="Repeat interval"
          recoilState={studyFormScheduleConfigurationState}
          index={scheduleIndex}
          field="repeatInterval"
          inputLabel="Triggered every X minutes"
          description="Schedule is triggered repeatedly in accordance with the specified interval (in minutes)."
          type="number"
        />
      );
    }
    if (scheduleName === SET_SCHEDULES) {
      const hours = [];
      for (let i = 0; i < 24; i += 1) {
        hours.push(
          <CustomizedCheckbox
            key={i}
            recoilState={studyFormScheduleConfigurationState}
            field={`${padding(i, 2)}:00`}
            index={scheduleIndex}
            inGroup
            groupField="hours"
            label={`${padding(i, 2)}:00`}
          />
        );
      }

      const days = [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ].map((day, idx) => {
        return (
          <CustomizedCheckbox
            key={idx}
            recoilState={studyFormScheduleConfigurationState}
            field={day}
            index={scheduleIndex}
            inGroup
            groupField="days"
            label={day}
          />
        );
      });
      return (
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid width="20%">
            <p className="schedule_field_name">Hours</p>
          </Grid>
          <Grid width="80%">{hours}</Grid>

          <Grid width="20%" />
          <Grid width="80%">
            <p style={{ width: "100%" }}>
              Notification sent at the determined hours.
            </p>
          </Grid>

          <Grid width="20%">
            <p className="schedule_field_name">Days</p>
          </Grid>
          <Grid width="80%">{days}</Grid>

          <Grid width="20%" />
          <Grid width="80%">
            <p style={{ width: "100%" }}>
              Notification sent at the determined days.
            </p>
          </Grid>
        </Grid>
      );
    }
    // if (scheduleName === RANDOM_TRIGGERS)

    const numberList = [];
    for (let i = 0; i < 24; i += 1) {
      const value = `${padding(i, 2)}:00`;
      numberList.push(
        <MenuItem
          key={i}
          value={value}
          onClick={() => {
            const newSchedules = [...schedules].map((schedule, idx) => {
              if (idx === scheduleIndex) {
                return { ...schedule, firsthour: value };
              }
              return schedule;
            });
            setSchedules(newSchedules);
          }}
        >
          {value}
        </MenuItem>
      );
    }

    const lastHourList = [];
    for (let i = 0; i < 24; i += 1) {
      const value = `${padding(i, 2)}:00`;
      lastHourList.push(
        <MenuItem
          key={i}
          value={value}
          onClick={() => {
            const newSchedules = [...schedules].map((schedule, idx) => {
              if (idx === scheduleIndex) {
                return { ...schedule, lasthour: value };
              }
              return schedule;
            });
            setSchedules(newSchedules);
          }}
        >
          {value}
        </MenuItem>
      );
    }
    return (
      <div>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid width="20%">
            <p className="schedule_field_name">Start time</p>
          </Grid>
          <Grid width="80%">
            <Select
              required
              style={{ width: "100%" }}
              id="random-triggers-number"
              value={schedules[scheduleIndex].firsthour}
            >
              {numberList}
            </Select>
          </Grid>

          <Grid width="20%">
            <p className="schedule_field_name">End time</p>
          </Grid>
          <Grid width="80%">
            <Select
              required
              style={{ width: "100%" }}
              id="random-triggers-last-hour"
              value={schedules[scheduleIndex].lasthour}
            >
              {lastHourList}
            </Select>
          </Grid>
        </Grid>

        <Field
          fieldName="Number of triggers"
          recoilState={studyFormScheduleConfigurationState}
          index={scheduleIndex}
          field="randomCount"
          inputLabel="Number of notifications across the scheduled hour(s)."
          type="number"
        />

        <Field
          fieldName="Inter-notification time"
          recoilState={studyFormScheduleConfigurationState}
          index={scheduleIndex}
          field="randomInterval"
          inputLabel="Minimum time in-between two notifications (in minutes)."
          type="number"
        />
      </div>
    );
  }

  function changeType(newType) {
    return () => {
      const newSchedules = [...schedules].map((schedule, curIdx) => {
        if (curIdx === scheduleIndex) {
          return {
            ...schedule,
            type: newType,
          };
        }
        return schedule;
      });
      setSchedules(newSchedules);
    };
  }

  const questionList = questions.map((question, idx) => {
    return (
      <CustomizedCheckbox
        key={idx}
        recoilState={studyFormScheduleConfigurationState}
        field={question.esm_title}
        index={scheduleIndex}
        inGroup
        groupField="questions"
        label={question.esm_title}
      />
    );
  });

  return (
    <div>
      <div className="schedule_vertical_layout question_border">
        <div className="schedule_horizontal_layout">
          <p className="schedule_title">Schedule {scheduleIndex + 1}</p>
          <Button>
            <DeleteIcon
              color="error"
              sx={{ fontSize: 40 }}
              onClick={() => {
                onDelete();
              }}
            >
              REMOVE SCHEDULE
            </DeleteIcon>
          </Button>
        </div>

        <p className="schedule-description">
          If desired, create multiple schedules and assign different questions
          to each schedule.
        </p>

        <Box sx={{ width: "100%" }}>
          <Field
            fieldName="Title"
            inputLabel="The schedule title"
            index={scheduleIndex}
            recoilState={studyFormScheduleConfigurationState}
            field="title"
            required
          />
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <Grid width="30%">
              <p className="schedule_field_name">Carrying Quesitons</p>
            </Grid>
            <Grid width="70%">
              <div className="schedule_vertical_layout">
                <CustomizedCheckbox
                  key="esm_keep"
                  recoilState={studyFormScheduleConfigurationState}
                  field="esm_keep"
                  index={scheduleIndex}
                />
                <Grid width="100%">
                  <p style={{ width: "100%" }}>
                    Carrying over any unanswered EMA questions to the next EMA
                    instance
                  </p>
                </Grid>
              </div>
            </Grid>
          </Grid>
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <Grid width="30%">
              <p className="schedule_field_name">Included questions *</p>
            </Grid>
            <Grid width="50%">
              <div className="schedule_vertical_layout">{questionList}</div>
            </Grid>
          </Grid>
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <Grid width="30%">
              <p className="schedule_field_name">Schedule type</p>
            </Grid>
            <Grid width="50%">
              <RadioGroup
                aria-labelledby="type"
                defaultValue={SET_SCHEDULES}
                value={schedules[scheduleIndex].type}
                name="schedule"
                row
              >
                <FormControlLabel
                  value={SET_SCHEDULES}
                  control={<Radio onClick={changeType(SET_SCHEDULES)} />}
                  label="Set schedules"
                />
                <FormControlLabel
                  value={RANDOM_TRIGGERS}
                  control={<Radio onClick={changeType(RANDOM_TRIGGERS)} />}
                  label="Random triggers"
                />
                <FormControlLabel
                  value={REPEAT_INTERVALS}
                  control={<Radio onClick={changeType(REPEAT_INTERVALS)} />}
                  label="Repeat intervals"
                />
              </RadioGroup>
            </Grid>
          </Grid>
        </Box>
        {getScheduleByType(schedules[scheduleIndex].type)}
      </div>
    </div>
  );
}
