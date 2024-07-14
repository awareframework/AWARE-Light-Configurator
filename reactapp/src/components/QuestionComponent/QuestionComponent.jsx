import Grid from "@mui/material/Unstable_Grid2";
import React, { useEffect } from "react";
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

const FREE_TEXT = 1;
const SINGLE_CHOICE = 2;
const MULTIPLE_CHOICE = 3;
const LIKERT_SCALE = 4;
const QUICK_ANSWER = 5;
const SCALE = 6;
const NUMERIC = 9;

const TYPE_MAP = {
  1: "Free Text",
  2: "Single Choice(Radio)",
  3: "Multiple Choice(Checkbox)",
  4: "Likert Scale",
  5: "Quick Answer",
  6: "Scale",
  9: "Numeric",
};

export default function QuestionComponent(input) {
  const { questionIndex, onDelete } = input;
  const [questions, setQuestions] = useRecoilState(studyFormQuestionsState);

  const updateOptions = (
    curQuestionIndex,
    groupFieldName,
    curOptionIndex,
    isAdd = true
  ) => {
    if (isAdd) {
      const newQuestions = [...questions].map((question, curIndex) => {
        if (curIndex === questionIndex) {
          let newOptions = [];
          if (question[groupFieldName] !== undefined) {
            newOptions = [...question[groupFieldName]];
          }
          newOptions.push("");
          return { ...question, [groupFieldName]: newOptions };
        }
        return question;
      });
      setQuestions(newQuestions);
    } else {
      // delete option branch
      const newQuestions = [...questions].map((question, curIndex) => {
        if (curIndex === questionIndex) {
          const newOptions = [...question[groupFieldName]];
          newOptions.splice(curOptionIndex, 1);
          return { ...question, [groupFieldName]: newOptions };
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

  function requiredQuestionNumberField(
    fieldName,
    field,
    globalQuestionField,
    questionLabel,
    description,
    defaultNum
  ) {
    return (
      <Field
        fieldName={fieldName}
        recoilState={studyFormQuestionsState}
        index={questionIndex}
        field={field}
        defaultNum={defaultNum}
        inputLabel={questionLabel}
        description={description}
        type="number"
      />
    );
  }

  // checkboxes
  function optionsLayout(index, groupFieldName) {
    return (
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid xs={10}>
          <Field
            fieldName={`Option ${index + 1}`}
            recoilState={studyFormQuestionsState}
            index={questionIndex}
            subIndex={index}
            field={groupFieldName}
          />
        </Grid>
        <Grid xs={1}>
          <Button
            variant="contained"
            onClick={() => {
              updateOptions(questionIndex, groupFieldName, index, false);
            }}
          >
            X
          </Button>
        </Grid>
      </Grid>
    );
  }

  function gatherOptions(groupFieldName) {
    const checkboxList = [];
    if (questions[questionIndex][groupFieldName] === undefined) {
      return checkboxList;
    }
    const optionNum = questions[questionIndex][groupFieldName].length;
    for (let i = 0; i < optionNum; i += 1) {
      checkboxList.push(optionsLayout(i, groupFieldName));
    }
    return checkboxList;
  }

  function layout() {
    if (questions[questionIndex].esm_type === FREE_TEXT) {
      return (
        <p className="description" style={{ width: "100%" }}>
          Allows participants to enter text using the keyboard. Use when
          question answers are unable to be captured in a small set of choices.
        </p>
      );
    }
    if (questions[questionIndex].esm_type === SINGLE_CHOICE) {
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
              updateOptions(questionIndex, "esm_radios", nextOptionIdx, true);
            }}
          >
            ADD OPTION
          </Button>

          {gatherOptions("esm_radios")}

          <div />
        </div>
      );
    }
    if (questions[questionIndex].esm_type === MULTIPLE_CHOICE) {
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
              updateOptions(
                questionIndex,
                "esm_checkboxes",
                nextOptionIdx,
                true
              );
            }}
          >
            ADD OPTION
          </Button>
          {gatherOptions("esm_checkboxes")}
          <div />
        </div>
      );
    }
    if (questions[questionIndex].esm_type === LIKERT_SCALE) {
      return (
        <div>
          <p className="description" style={{ width: "100%" }}>
            Allows participants to indicate level of (dis)agreement with the
            question.
          </p>
          {questionNumberField(
            "maximum value",
            "esm_likert_max",
            questions[questionIndex].esm_likert_max,
            "Maximum value of the scale"
          )}
          {questionTextField(
            "minimum label",
            "esm_likert_min_label",
            questions[questionIndex].esm_likert_min_label,
            "(e.g. completely disagree)"
          )}
          {questionTextField(
            "maximum label",
            "esm_likert_max_label",
            questions[questionIndex].esm_likert_max_label,
            "(e.g. completely agree)"
          )}
        </div>
      );
    }
    if (questions[questionIndex].esm_type === QUICK_ANSWER) {
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
              updateOptions(
                questionIndex,
                "esm_quick_answers",
                nextOptionIdx,
                true
              );
            }}
          >
            ADD OPTION
          </Button>
          {gatherOptions("esm_quick_answers")}
          <div />
        </div>
      );
    }
    if (questions[questionIndex].esm_type === SCALE) {
      return (
        <div>
          <p className="description" style={{ width: "100%" }}>
            Allows participants to select any value between a set minimum and
            maximum.
          </p>
          {questionNumberField(
            "minimum value",
            "esm_scale_min",
            questions[questionIndex].esm_scale_min,
            "Minimum value of the scale"
          )}
          {questionNumberField(
            "maximum value",
            "esm_scale_max",
            questions[questionIndex].esm_scale_max,
            "Maximum value of the scale"
          )}
          {questionTextField(
            "minimum label",
            "esm_scale_min_label",
            questions[questionIndex].esm_scale_min_label,
            "(e.g. completely disagree)"
          )}
          {questionTextField(
            "maximum label",
            "esm_scale_max_label",
            questions[questionIndex].esm_scale_max_label,
            "(e.g. completely agree)"
          )}
          {questionNumberField(
            "step size",
            "esm_scale_step",
            questions[questionIndex].esm_scale_step,
            "Steps of increment while dragging the sider"
          )}
          {questionNumberField(
            "scale start",
            "esm_scale_start",
            questions[questionIndex].esm_scale_start,
            "Initial scale value"
          )}
        </div>
      );
    }
    // if questions[questionNumber].esm_type === NUMERIC
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
            fieldName="Title"
            recoilState={studyFormQuestionsState}
            index={questionIndex}
            inputLabel="The actual question"
            field="esm_title"
            required
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
                  value={questions[questionIndex].esm_type || ""}
                >
                  <MenuItem
                    value={FREE_TEXT}
                    onClick={(event) => {
                      updateQuestion("esm_type", FREE_TEXT);
                    }}
                  >
                    Free Text
                  </MenuItem>
                  <MenuItem
                    value={SINGLE_CHOICE}
                    onClick={(event) => {
                      updateQuestion("esm_type", SINGLE_CHOICE);
                    }}
                  >
                    Single Choice(Radio)
                  </MenuItem>
                  <MenuItem
                    value={MULTIPLE_CHOICE}
                    onClick={(event) => {
                      updateQuestion("esm_type", MULTIPLE_CHOICE);
                    }}
                  >
                    Multiple Choice(Checkbox)
                  </MenuItem>
                  <MenuItem
                    value={LIKERT_SCALE}
                    onClick={(event) => {
                      updateQuestion("esm_type", LIKERT_SCALE);
                    }}
                  >
                    Likert Scale
                  </MenuItem>
                  <MenuItem
                    value={QUICK_ANSWER}
                    onClick={(event) => {
                      updateQuestion("esm_type", QUICK_ANSWER);
                    }}
                  >
                    Quick Answer
                  </MenuItem>
                  <MenuItem
                    value={SCALE}
                    onClick={(event) => {
                      updateQuestion("esm_type", SCALE);
                    }}
                  >
                    Scale
                  </MenuItem>
                  <MenuItem
                    value={NUMERIC}
                    onClick={(event) => {
                      updateQuestion("esm_type", NUMERIC);
                    }}
                  >
                    Numeric
                  </MenuItem>
                </Select>
              </FormControl>

              {questions[questionIndex].esm_type ? layout() : <div />}
              {questions[questionIndex].esm_type ? (
                questionTextField(
                  "submit label",
                  "esm_submit",
                  questions[questionIndex].esm_submit
                )
              ) : (
                <div />
              )}
            </Grid>
          </Grid>

          {requiredQuestionNumberField(
            "Notification timeout",
            "esm_notification_timeout",
            questions[questionIndex].esm_notification_timeout,
            "",
            "Dismiss the notification after the specified time (in seconds).",
            600
          )}
          {requiredQuestionNumberField(
            "Expiration time",
            "esm_expiration_threshold",
            questions[questionIndex].esm_expiration_threshold,
            "",
            "Specify the maximum time the participant has to answer the question (in seconds), use 0 for unlimited answer time.",
            600
          )}
        </Box>
      </div>
    </div>
  );
}
