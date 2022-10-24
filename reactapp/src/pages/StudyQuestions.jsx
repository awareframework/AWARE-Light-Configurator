import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import { Button, Link, ThemeProvider } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./StudyQuestions.css";

import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import { studyFormQuestionsState } from "../functions/atom";
import customisedTheme from "../functions/theme";
import QuestionComponent from "../components/QuestionComponent/QuestionComponent";

export default function StudyQuestions() {
  const navigateTo = useNavigate();
  const [questions, setQuestions] = useRecoilState(studyFormQuestionsState);
  const [open, setOpen] = React.useState(false);
  const [blankFields, setBlankFields] = React.useState([]);

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

  const addQuestion = () => {
    const newQuestions = [...questions, { esm_submit: "Submit" }];
    setQuestions(newQuestions);
  };

  const [validation, setValidation] = React.useState(false);
  const validate = (value) => {
    setValidation(value);
  };

  const deleteQuestion = (curQuestionIdx) => {
    // delete question branch
    const newQuestions = [...questions];
    newQuestions.splice(curQuestionIdx, 1);
    setQuestions(newQuestions);
  };

  const checkValidation = () => {
    for (let i = 0; i < questions.length; i += 1) {
      const each = questions[i];
      if (
        !each.esm_type ||
        !each.esm_title ||
        !("esm_type" in each) ||
        !("esm_title" in each)
      ) {
        return false;
      }
    }
    return true;
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
            Required fields are left blank.
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Title or type of the following questions is missing:{"\n"}
              {blankFields.map((item) => (
                <li key={item}>Question {item + 1}</li>
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
                navigateTo("/study/schedule_configuration");
              }}
            >
              Next page
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }

  const questionList = [
    questions.map((_, idx) => {
      return (
        <QuestionComponent
          key={idx}
          questionIndex={idx}
          onDelete={() => {
            deleteQuestion(idx);
          }}
        />
      );
    }),
  ];

  return (
    <ThemeProvider theme={customisedTheme}>
      <div className="study_question_vertical_layout">
        {questionList}

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
                  addQuestion();
                }}
              >
                ADD A NEW QUESTION
              </Button>
            </Grid>
            <Grid xs={2}>
              <Button
                color="main"
                variant="contained"
                onClick={() => {
                  navigateTo("/study/study_information");
                }}
              >
                BACK
              </Button>
            </Grid>
            <Grid xs />

            <Grid xs="auto">
              <Button
                color="main"
                display="flex"
                variant="contained"
                onClick={() => {
                  validationOn();
                  validate(checkValidation());
                  console.log(questions);
                  if (questions.length === 0 || checkValidation()) {
                    navigateTo("/study/schedule_configuration");
                  } else {
                    for (let i = 0; i < questions.length; i += 1) {
                      const each = questions[i];
                      if (
                        !each.esm_type ||
                        !each.esm_title ||
                        !("esm_type" in each) ||
                        !("esm_title" in each)
                      ) {
                        updateBlankFields(i);
                      }
                    }
                  }
                }}
                // disabled={!checkValidation()}
              >
                NEXT STEP:SCHEDULE CONFIGURATION
              </Button>
              {!validation ? alertDialog() : <div />}
            </Grid>
          </Grid>
        </Box>
      </div>
    </ThemeProvider>
  );
}
