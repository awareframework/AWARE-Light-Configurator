import Grid from "@mui/material/Unstable_Grid2";
import React, { useState } from "react";
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
import { useRecoilState } from "recoil";
import Field from "../Field/Field";
import { studyFormQuestionsState } from "../../functions/atom";

export default function QuestionComponent(input) {
  const { questionIndex, onDelete } = input;
  const [questions, setQuestions] = useRecoilState(studyFormQuestionsState);

  const updateOptions = (curQuestionIndex, curOptionIndex, isAdd = true) => {
    if (isAdd) {
      const newQuestions = [...questions].map((question, curIndex) => {
        if (curIndex === questionIndex) {
          let newOptions = [];
          if (question.options !== undefined) {
            newOptions = [...question.options];
          }
          newOptions.push("");
          return { ...question, options: newOptions };
        }
        return question;
      });
      setQuestions(newQuestions);
    } else {
      // delete option branch
      const newQuestions = [...questions].map((question, curIndex) => {
        if (curIndex === questionIndex) {
          const newOptions = [...question.options];
          newOptions.splice(curOptionIndex, 1);
          return { ...question, options: newOptions };
        }
        return question;
      });
      setQuestions(newQuestions);
    }
  };

  const updateQuestion = (field, value) => {
    const newQuestions = [...questions];
    const question = newQuestions[questionIndex];
    const questionCopy = { ...question };
    questionCopy[field] = value;
    newQuestions[questionIndex] = questionCopy;
    setQuestions(newQuestions);
  };

  function questionTextField(
    fieldName,
    field,
    globalQuestionField,
    questionLabel
  ) {
    return (
      <Field
        fieldName={fieldName}
        recoilState={studyFormQuestionsState}
        index={questionIndex}
        field={field}
        inputLabel={questionLabel}
      />
    );
  }

  function questionNumberField(
    fieldName,
    field,
    globalQuestionField,
    questionLabel,
    description
  ) {
    return (
      <Field
        fieldName={fieldName}
        recoilState={studyFormQuestionsState}
        index={questionIndex}
        field={field}
        inputLabel={questionLabel}
        description={description}
        type="number"
      />
    );
  }

  // checkboxes
  function optionsLayout(index) {
    return (
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid xs={10}>
          <Field
            fieldName={`Option ${index + 1}`}
            recoilState={studyFormQuestionsState}
            index={questionIndex}
            subIndex={index}
            field="options"
          />
        </Grid>
        <Grid xs={1}>
          <Button
            variant="contained"
            onClick={() => {
              updateOptions(questionIndex, index, false);
            }}
          >
            X
          </Button>
        </Grid>
      </Grid>
    );
  }

  function gatherOptions() {
    const checkboxList = [];
    if (questions[questionIndex].options === undefined) {
      return checkboxList;
    }
    const optionNum = questions[questionIndex].options.length;
    for (let i = 0; i < optionNum; i += 1) {
      checkboxList.push(optionsLayout(i));
    }
    return checkboxList;
  }

  function layout() {
    if (questions[questionIndex].type === "free_text") {
      return (
        <p className="description" style={{ width: "100%" }}>
          Allows participants to enter text using the keyboard. Use when
          question answers are unable to be captured in a small set of choices.
        </p>
      );
    }
    if (questions[questionIndex].type === "single_choice") {
      return (
        <div>
          <p className="description" style={{ width: "100%" }}>
            Allows participants to quickly select one of the presented options.
          </p>
          <Button
            color="main"
            display="flex"
            variant="contained"
            onClick={() => {
              let nextOptionIdx = 0;
              if (questions.options) {
                nextOptionIdx = questions.options.length();
              }
              updateOptions(questionIndex, nextOptionIdx, true);
            }}
          >
            ADD OPTION
          </Button>

          {gatherOptions()}

          <div />
        </div>
      );
    }
    if (questions[questionIndex].type === "multiple_choice") {
      return (
        <div>
          <p className="description" style={{ width: "100%" }}>
            Allows participants to select multiple options out of the presented
            possibilities.
          </p>
          <Button
            color="main"
            display="flex"
            variant="contained"
            onClick={() => {
              let nextOptionIdx = 0;
              if (questions.options) {
                nextOptionIdx = questions.options.length();
              }
              updateOptions(questionIndex, nextOptionIdx, true);
            }}
          >
            ADD OPTION
          </Button>
          {gatherOptions()}
          <div />
        </div>
      );
    }
    if (questions[questionIndex].type === "likert") {
      return (
        <div>
          <p className="description" style={{ width: "100%" }}>
            Allows participants to indicate level of (dis)agreement with the
            question.
          </p>
          {questionNumberField(
            "maximum value",
            "maximum_value",
            questions[questionIndex].maximum_value,
            "Maximum value of the scale"
          )}
          {questionTextField(
            "minimum label",
            "minimum_label",
            questions[questionIndex].minimum_label,
            "(e.g. completely disagree)"
          )}
          {questionTextField(
            "maximum label",
            "maximum_label",
            questions[questionIndex].maximum_label,
            "(e.g. completely agree)"
          )}
        </div>
      );
    }
    if (questions[questionIndex].type === "quick_answer") {
      return (
        <div>
          <p className="description" style={{ width: "100%" }}>
            Allows participants to quickly select one of the presented options.
          </p>
          <Button
            color="main"
            display="flex"
            variant="contained"
            onClick={() => {
              let nextOptionIdx = 0;
              if (questions.options) {
                nextOptionIdx = questions.options.length();
              }
              updateOptions(questionIndex, nextOptionIdx, true);
            }}
          >
            ADD OPTION
          </Button>
          {gatherOptions()}
          <div />
        </div>
      );
    }
    if (questions[questionIndex].type === "scale") {
      return (
        <div>
          <p className="description" style={{ width: "100%" }}>
            Allows participants to select any value between a set minimum and
            maximum.
          </p>
          {questionNumberField(
            "minimum value",
            "minimum_value",
            questions[questionIndex].minimum_value,
            "Minimum value of the scale"
          )}
          {questionNumberField(
            "maximum value",
            "maximum_value",
            questions[questionIndex].maximum_value,
            "Maximum value of the scale"
          )}
          {questionTextField(
            "minimum label",
            "minimum_label",
            questions[questionIndex].minimum_label,
            "(e.g. completely disagree)"
          )}
          {questionTextField(
            "maximum label",
            "maximum_label",
            questions[questionIndex].maximum_label,
            "(e.g. completely agree)"
          )}
          {questionNumberField(
            "step size",
            "step_size",
            questions[questionIndex].step_size,
            "Steps of increment while dragging the sider"
          )}
          {questionNumberField(
            "scale start",
            "scale_start",
            questions[questionIndex].scale_start,
            "Initial scale value"
          )}
        </div>
      );
    }
    // if questions[questionNumber].type === "numeric"
    return (
      <p className="description" style={{ width: "100%" }}>
        Allows participants to enter numeric only text.
      </p>
    );
  }

  return (
    <div>
      <div className="question_vertical_layout question_border">
        <div className="question_horizontal_layout">
          <p className="question_title">Question {questionIndex + 1}</p>
          <Button>
            <DeleteIcon
              color="error"
              sx={{ fontSize: 40 }}
              onClick={() => {
                onDelete();
              }}
            >
              REMOVE QUESTION
            </DeleteIcon>
          </Button>
        </div>
        <Box sx={{ width: "100%" }}>
          <Field
            fieldName="Title*"
            recoilState={studyFormQuestionsState}
            index={questionIndex}
            inputLabel="The actual question"
            field="question_title"
          />
          <Field
            fieldName="Instructions"
            recoilState={studyFormQuestionsState}
            index={questionIndex}
            inputLabel="Any instructions for the participant(s)"
            field="instructions"
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
              <FormControl fullWidth>
                <InputLabel id="question-type-select">Select One *</InputLabel>
                <Select
                  required
                  style={{ width: "100%" }}
                  labelId="question-type-select"
                  id="question-type"
                  label="Select One"
                  value={questions[questionIndex].type || ""}
                >
                  <MenuItem
                    value="free_text"
                    onClick={(event) => {
                      updateQuestion("type", "free_text");
                    }}
                  >
                    Free Text
                  </MenuItem>
                  <MenuItem
                    value="single_choice"
                    onClick={(event) => {
                      updateQuestion("type", "single_choice");
                    }}
                  >
                    Single Choice(Radio)
                  </MenuItem>
                  <MenuItem
                    value="multiple_choice"
                    onClick={(event) => {
                      updateQuestion("type", "multiple_choice");
                    }}
                  >
                    Multiple Choice(Checkbox)
                  </MenuItem>
                  <MenuItem
                    value="likert"
                    onClick={(event) => {
                      updateQuestion("type", "likert");
                    }}
                  >
                    Likert Scale
                  </MenuItem>
                  <MenuItem
                    value="quick_answer"
                    onClick={(event) => {
                      updateQuestion("type", "quick_answer");
                    }}
                  >
                    Quick Answer
                  </MenuItem>
                  <MenuItem
                    value="scale"
                    onClick={(event) => {
                      updateQuestion("type", "scale");
                    }}
                  >
                    Scale
                  </MenuItem>
                  <MenuItem
                    value="numeric"
                    onClick={(event) => {
                      updateQuestion("type", "numeric");
                    }}
                  >
                    Numeric
                  </MenuItem>
                </Select>
              </FormControl>

              {questions[questionIndex].type ? layout() : <div />}
              {questions[questionIndex].type ? (
                questionTextField(
                  "submit label",
                  "submit_label",
                  questions[questionIndex].submit_label
                )
              ) : (
                <div />
              )}
            </Grid>
          </Grid>

          {questionNumberField(
            "Notification timeout",
            "notification_timeout",
            questions[questionIndex].notification_timeout,
            "",
            "Dismiss the notification after the specified time (in seconds)."
          )}
          {questionNumberField(
            "Expiration time",
            "expiration_time",
            questions[questionIndex].expiration_time,
            "",
            "Specify the maximum time the participant has to answer the question\n" +
              "            (in seconds), use 0 for unlimited answer time. If an expiration time\n" +
              "            higher than zero seconds is used, the questionnaire will be shown as\n" +
              "            a pop-up. If the expiration time is zero, the questionnaire will be\n" +
              "            delivered as a notification."
          )}
        </Box>
      </div>
    </div>
  );
}
