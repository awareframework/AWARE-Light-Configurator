import Grid from "@mui/material/Unstable_Grid2";
import React from "react";
import PropTypes from "prop-types";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import Box from "@mui/material/Box";
import "./QuestionComponent.css";
import DeleteIcon from "@mui/icons-material/Delete";

export default function QuestionComponent({ questionNumber }) {
  return (
    <div>
      <div className="question_vertical_layout question_border">
        <div className="question_horizontal_layout">
          <p className="question_title">Question {questionNumber}</p>
          <Button>
            <DeleteIcon
              color="error"
              sx={{ fontSize: 40 }}
              onClick={() => {
                // todo
                alert("delete function has not implemented");
              }}
            >
              REMOVE QUESTION
            </DeleteIcon>
          </Button>
        </div>
        <Box sx={{ width: "100%" }}>
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <Grid width={250}>
              <p className="question_field_name">Title*</p>
            </Grid>
            <Grid width={300}>
              <TextField
                id="outlined-basic"
                label="The actual question"
                variant="outlined"
                style={{ width: 600 }}
                // value={
                //   studyInformation.studyTitle ? studyInformation.studyTitle : ""
                // }
                // onChange={(event) => {
                //   updateFormByField("studyTitle", event.target.value);
                // }}
              />
            </Grid>
          </Grid>

          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <Grid width={250}>
              <p className="question_field_name">Instructions</p>
            </Grid>
            <Grid width={300}>
              <TextField
                id="outlined-basic"
                label="Any instructions for the participant(s)"
                variant="outlined"
                style={{ width: 600 }}
                // value={
                //   studyInformation.description
                //     ? studyInformation.description
                //     : ""
                // }
                // onChange={(event) => {
                //   updateFormByField("description", event.target.value);
                // }}
              />
            </Grid>
          </Grid>

          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <Grid width={250}>
              <p className="question_field_name">Question type*</p>
            </Grid>
            <Grid width={300}>
              <FormControl>
                <InputLabel id="question-type-select">Select One</InputLabel>
                <Select
                  style={{ width: 600 }}
                  labelId="question-type-select"
                  id="question-type"
                  label="Select One"
                  // value={age}
                  // onChange={handleChange}
                >
                  <MenuItem value="Free Text">Free Text</MenuItem>
                  <MenuItem value="Single Choice(Radio)">
                    Single Choice(Radio)
                  </MenuItem>
                  <MenuItem value="Multiple Choice(Checkbox)">
                    Multiple Choice(Checkbox)
                  </MenuItem>
                  <MenuItem value="Likert Scale">Likert Scale</MenuItem>
                  <MenuItem value="Quick Answer">Quick Answer</MenuItem>
                  <MenuItem value="Scale">Scale</MenuItem>
                  <MenuItem value="Numeric">Numeric</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <Grid width={250}>
              <p className="question_field_name">Notification timeout</p>
            </Grid>
            <Grid width={300}>
              <TextField
                id="outlined-basic"
                variant="outlined"
                style={{ width: 600 }}
                type="number"
                // value={
                //   studyInformation.lastName ? studyInformation.lastName : ""
                // }
                // onChange={(event) => {
                //   updateFormByField("lastName", event.target.value);
                // }}
              />
              <p className="question-description">
                Dismiss the notification after the specified time (in seconds).
              </p>
            </Grid>
          </Grid>

          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <Grid width={250}>
              <p className="question_field_name">Expiration time</p>
            </Grid>
            <Grid width={300}>
              <TextField
                id="outlined-basic"
                variant="outlined"
                style={{ width: 600 }}
                type="number"
                // value={studyInformation.email ? studyInformation.email : ""}
                // onChange={(event) => {
                //   updateFormByField("email", event.target.value);
                // }}
              />
              <p className="question-description">
                Specify the maximum time the participant has to answer the
                question (in seconds), use 0 for unlimited answer time. If an
                expiration time higher than zero seconds is used, the
                questionnaire will be shown as a pop-up. If the expiration time
                is zero, the questionnaire will be delivered as a notification.
              </p>
            </Grid>
          </Grid>
        </Box>
      </div>
    </div>
  );
}

QuestionComponent.propTypes = {
  questionNumber: PropTypes.number,
};

QuestionComponent.defaultProps = {
  questionNumber: 1,
};
