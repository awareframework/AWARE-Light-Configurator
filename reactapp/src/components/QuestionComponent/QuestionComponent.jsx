import Grid from "@mui/material/Unstable_Grid2";
import React, { useState } from "react";
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
import { atom, useRecoilState } from "recoil";
import InputField from "../InputField/InputField";
import Field from "../Field/Field";
import {
  questionOptionState,
  studyFormQuestionsState,
} from "../../functions/atom";
import FrequencyField from "../FrequencyField/FrequencyField";

export default function QuestionComponent({ questionNumber }) {
  // global question
  const [questions, setQuestions] = useRecoilState(studyFormQuestionsState);
  const [questionOption, setQuestionOption] =
    useRecoilState(questionOptionState);

  const updateOptionNumber = (fieldName, value) => {
    setQuestionOption({
      ...questionOption,
      [fieldName]: value,
    });
  };

  // ToDo: should be done in StudyQuestion
  // const addQuestion = () => {
  //   setQuestions((oldArray) => [...oldArray, {}]);
  // };

  // const deleteQuestion = (index) => {
  //   setQuestions([
  //     ...questions.slice(0, index),
  //     ...questions.slice(index + 1, questions.length),
  //   ]);
  // };

  // Choices - options
  // const [option, setOption] = useState([]);
  //
  // const updateOption = (content) => {
  //   setOption((oldArray) => [...oldArray, content]);
  //   setOption([...option, content]);
  // };
  const updateQuestion = (field, value) => {
    const newQuestions = [...questions];
    const question = newQuestions[questionNumber];
    const questionCopy = { ...question };
    questionCopy[field] = value;
    newQuestions[questionNumber] = questionCopy;
    setQuestions(newQuestions);
  };

  function updateCheckbox(index, value) {
    const newQuestions = [...questions];
    const question = newQuestions[questionNumber];
    const questionCopy = { ...question };
    const checkboxArray = { ...questionCopy.esm_checkboxes };
    checkboxArray[index.toString()] = value;
    questionCopy.esm_checkboxes = checkboxArray;
    newQuestions[questionNumber] = questionCopy;
    setQuestions(newQuestions);

    // questionCopy.esm_checkboxes.push(value);
    // newQuestions[questionNumber] = questionCopy;
    // setQuestions(newQuestions);
  }

  function questionTextField(
    fieldName,
    field,
    globalQuestionField,
    questionLabel
  ) {
    return (
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid width="20%">
          <p className="field_name">{fieldName}</p>
        </Grid>
        <Grid width="80%">
          <TextField
            // error={isError}
            // required={required === undefined ? false : required}
            id="submit_label"
            label={questionLabel}
            variant="outlined"
            style={{ width: "100%" }}
            value={globalQuestionField || ""}
            onChange={(event) => {
              updateQuestion(field, event.target.value);
            }}
          />
        </Grid>
      </Grid>
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
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid width="20%">
          <p className="field_name">{fieldName}</p>
        </Grid>
        <Grid width="80%">
          <TextField
            // error={isError}
            // required={required === undefined ? false : required}
            // id="submit_label"
            label={questionLabel}
            type="number"
            variant="outlined"
            style={{ width: "100%" }}
            value={globalQuestionField || ""}
            onChange={(event) => {
              updateQuestion(field, event.target.value);
            }}
          />
          {description ? (
            <p className="description" style={{ width: "100%" }}>
              {description}
            </p>
          ) : (
            <div />
          )}
        </Grid>
      </Grid>
    );
  }

  // checkboxes
  function checkboxLayout(index) {
    return (
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid width="20%">
          <p className="field_name">Option</p>
        </Grid>
        <Grid width="70%">
          <TextField
            // error={isError}
            // required={required === undefined ? false : required}
            id={index.toString()}
            // label={questionLabel}
            variant="outlined"
            style={{ width: "100%" }}
            // value={questions[questionNumber].esm_checkboxes[index] || ""}
            onChange={(event) => {
              // eslint-disable-next-line no-use-before-define
              if (!questions[questionNumber].esm_checkboxes) {
                updateQuestion("esm_checkboxes", {});
                updateCheckbox(index, event.target.value);
              } else {
                updateCheckbox(index, event.target.value);
              }
              console.log(index.toString());
              console.log(event.target.value);
              // updateCheckbox(index.toString(), event.target.value);
            }}
          />
        </Grid>
        <Grid width="10%">
          <Button
            // color="red"
            display="flex"
            variant="contained"
            onClick={() => {
              // console.log(questions[questionNumber]);
              console.log(questionOption[questionNumber]);
              // deleteCheckbox();
            }}
          >
            X
          </Button>
        </Grid>
      </Grid>
    );
  }

  function gatherCheckbox(amount) {
    const checkboxList = [];
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < amount; i++) {
      checkboxList.push(checkboxLayout(i));
    }
    return checkboxList;
  }

  // eslint-disable-next-line consistent-return
  function layout() {
    if (questions[questionNumber].type === "free_text") {
      return (
        <p className="description" style={{ width: "100%" }}>
          Allows participants to enter text using the keyboard. Use when
          question answers are unable to be captured in a small set of choices.
        </p>
      );
    }
    if (questions[questionNumber].type === "single_choice") {
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
              let count;
              if (questionOption[questionNumber]) {
                count = questionOption[questionNumber] + 1;
              } else {
                count = 1;
              }
              updateOptionNumber(questionNumber, count);
            }}
          >
            ADD OPTION
          </Button>

          {gatherCheckbox(questionOption[questionNumber])}

          <div />
        </div>
      );
    }
    if (questions[questionNumber].type === "multiple_choice") {
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
              let count;
              if (questionOption[questionNumber]) {
                count = questionOption[questionNumber] + 1;
              } else {
                count = 1;
              }
              updateOptionNumber(questionNumber, count);
            }}
          >
            ADD OPTION
          </Button>
          {gatherCheckbox(questionOption[questionNumber])}
          <div />
        </div>
      );
    }
    if (questions[questionNumber].type === "likert") {
      return (
        <div>
          <p className="description" style={{ width: "100%" }}>
            Allows participants to indicate level of (dis)agreement with the
            question.
          </p>
          {questionNumberField(
            "maximum value",
            "maximum_value",
            questions[questionNumber].maximum_value,
            "Maximum value of the scale"
          )}
          {questionTextField(
            "minimum label",
            "minimum_label",
            questions[questionNumber].minimum_label,
            "(e.g. completely disagree)"
          )}
          {questionTextField(
            "maximum label",
            "maximum_label",
            questions[questionNumber].maximum_label,
            "(e.g. completely agree)"
          )}
        </div>
      );
    }
    if (questions[questionNumber].type === "quick_answer") {
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
              let count;
              if (questionOption[questionNumber]) {
                count = questionOption[questionNumber] + 1;
              } else {
                count = 1;
              }
              updateOptionNumber(questionNumber, count);
            }}
          >
            ADD OPTION
          </Button>
          {gatherCheckbox(questionOption[questionNumber])}
          <div />
        </div>
      );
    }
    if (questions[questionNumber].type === "scale") {
      return (
        <div>
          <p className="description" style={{ width: "100%" }}>
            Allows participants to select any value between a set minimum and
            maximum.
          </p>
          {questionNumberField(
            "minimum value",
            "minimum_value",
            questions[questionNumber].minimum_value,
            "Minimum value of the scale"
          )}
          {questionNumberField(
            "maximum value",
            "maximum_value",
            questions[questionNumber].maximum_value,
            "Maximum value of the scale"
          )}
          {questionTextField(
            "minimum label",
            "minimum_label",
            questions[questionNumber].minimum_label,
            "(e.g. completely disagree)"
          )}
          {questionTextField(
            "maximum label",
            "maximum_label",
            questions[questionNumber].maximum_label,
            "(e.g. completely agree)"
          )}
          {questionNumberField(
            "step size",
            "step_size",
            questions[questionNumber].step_size,
            "Steps of increment while dragging the sider"
          )}
          {questionNumberField(
            "scale start",
            "scale_start",
            questions[questionNumber].scale_start,
            "Initial scale value"
          )}
        </div>
      );
    }
    if (questions[questionNumber].type === "numeric") {
      return (
        <p className="description" style={{ width: "100%" }}>
          Allows participants to enter numeric only text.
        </p>
      );
    }
  }

  return (
    <div>
      <div className="question_vertical_layout question_border">
        <div className="question_horizontal_layout">
          <p className="question_title">Question {questionNumber + 1}</p>
          <Button>
            <DeleteIcon
              color="error"
              sx={{ fontSize: 40 }}
              onClick={() => {
                // console.log(getObjKey(questions[questionNumber], "type"));
                console.log(questions[questionNumber]);
                console.log(questionOption);
                // console.log(questions.at(questionNumber));
                // alert("delete function has not implemented");
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
            inputLabel="The actual question"
            field="questionTitle"
          />
          <Field
            fieldName="Instructions"
            recoilState={studyFormQuestionsState}
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
                  value={questions[questionNumber].type || ""}
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

              {questions[questionNumber].type ? layout() : <div />}
              {questions[questionNumber].type ? (
                questionTextField(
                  "submit label",
                  "submit_label",
                  questions[questionNumber].submit_label
                )
              ) : (
                <div />
              )}
            </Grid>
          </Grid>

          {questionNumberField(
            "Notification timeout",
            "notification_timeout",
            questions[questionNumber].notification_timeout,
            "",
            "Dismiss the notification after the specified time (in seconds)."
          )}
          {questionNumberField(
            "Expiration time",
            "expiration_time",
            questions[questionNumber].expiration_time,
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

QuestionComponent.propTypes = {
  questionNumber: PropTypes.number,
};

QuestionComponent.defaultProps = {
  questionNumber: 0,
};
