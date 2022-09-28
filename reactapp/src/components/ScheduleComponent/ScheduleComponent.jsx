import Grid from "@mui/material/Unstable_Grid2";
import React from "react";
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
import { useRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import Field from "../Field/Field";
import { studyFormStudyInformationState } from "../../functions/atom";

function Schedule(scheduleName) {
  console.log(scheduleName);
  if (scheduleName === "repeat_intervals") {
    return (
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid width="30%">
          <p className="schedule_field_name">Repeat interval</p>
        </Grid>
        <Grid width="50%">
          <TextField
            id="outlined-number"
            label="Triggered every X minutes"
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
            style={{ width: "140%" }}
          />
          <p className="schedule-description">
            Schedule is triggered repeatedly in accordance with the specified
            interval (in minutes).
          </p>
        </Grid>
      </Grid>
    );
  }
  if (scheduleName === "set_schedules") {
    return <p>set schedules</p>;
  }
  if (scheduleName === "random_triggers") {
    return <p>random triggers</p>;
  }
}

export default function ScheduleComponent({ ScheduleNumber }) {
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

  let scheduleChoice;
  const changeSchedule = (name) => {
    scheduleChoice = name;
  };

  return (
    <div>
      <div className="schedule_vertical_layout question_border">
        <div className="schedule_horizontal_layout">
          <p className="schedule_title">Schedule {ScheduleNumber}</p>
          <Button>
            <DeleteIcon
              color="error"
              sx={{ fontSize: 40 }}
              onClick={() => {
                // todo
                alert("delete function has not implemented");
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
          <Field fieldName="Title*" inputLabel="The schedule title" />
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <Grid width="30%">
              <p className="schedule_field_name">Included questions*</p>
            </Grid>
            <Grid width="50%">
              <div className="schedule_vertical_layout">
                {/* ToDo: Display all the questions here */}
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={
                        studyInformation.includedQuestions
                          ? studyInformation.includedQuestions
                          : false
                      }
                      onChange={(_, checked) => {
                        updateFormByField("Question X", checked);
                      }}
                    />
                  }
                  label="Question X"
                />
              </div>
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
                aria-labelledby="schedule_type"
                defaultValue="set_schedules"
                name="schedule"
                row
              >
                <FormControlLabel
                  value="set_schedules"
                  control={<Radio />}
                  label="Set schedules"
                  // ToDo: Update values - 存的时候因为存的是const所以应当render出Schedule()
                  // checked={}
                  // onClick={(_, checked) => {
                  //   updateFormByField("NoPasswordInJSONFile", checked);
                  // }}
                />
                <FormControlLabel
                  value="random_triggers"
                  control={<Radio />}
                  label="Random triggers"
                  // ToDo: Update values
                  // checked={}
                  // onClick={(_, checked) => {
                  //   updateFormByField("NoPasswordInJSONFile", checked);
                  // }}
                />
                <FormControlLabel
                  value="repeat_intervals"
                  control={<Radio />}
                  label="Repeat intervals"
                  // ToDo: Update values
                  // checked={}
                  onClick={(_, checked) => {
                    changeSchedule("repeat_intervals");
                    console.log(scheduleChoice);
                    // updateFormByField("NoPasswordInJSONFile", checked);
                  }}
                />
              </RadioGroup>
            </Grid>
          </Grid>
        </Box>
        {Schedule(scheduleChoice)}
      </div>
    </div>
  );
}

ScheduleComponent.propTypes = {
  ScheduleNumber: PropTypes.number,
};

ScheduleComponent.defaultProps = {
  ScheduleNumber: 1,
};
