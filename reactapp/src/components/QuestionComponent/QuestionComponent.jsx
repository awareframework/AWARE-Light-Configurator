import Grid from "@mui/material/Unstable_Grid2";
import React from "react";
import PropTypes from "prop-types";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import Box from "@mui/material/Box";
import "./QuestionComponent.css";
import DeleteIcon from "@mui/icons-material/Delete";
import Field from "../Field/Field";

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
          <Field
            fieldName="Title*"
            // studyInfoField={studyInformation.questionTitle}
            inputLabel="The actual question"
            // field="questionTitle"
          />
          <Field
            fieldName="Instructions"
            // studyInfoField={studyInformation.instructions}
            inputLabel="Any instructions for the participant(s)"
            // field="instructions"
          />

          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <Grid width="20%">
              <p className="question_field_name">Question type*</p>
            </Grid>
            <Grid width="80%">
              <FormControl fullWidth="100%">
                <InputLabel id="question-type-select">Select One *</InputLabel>
                <Select
                  required
                  style={{ width: "100%" }}
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

          <Field
            fieldName="Notification timeout"
            // studyInfoField={studyInformation.instructions}
            // field="instructions"
            description="Dismiss the notification after the specified time (in seconds)."
          />

          <Field
            fieldName="Expiration time"
            // studyInfoField={studyInformation.instructions}
            // field="instructions"
            description="
                Specify the maximum time the participant has to answer the
                question (in seconds), use 0 for unlimited answer time. If an
                expiration time higher than zero seconds is used, the
                questionnaire will be shown as a pop-up. If the expiration time
                is zero, the questionnaire will be delivered as a notification.
                "
          />
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
