import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import { Button, Link, ThemeProvider } from "@mui/material";
import { useNavigate } from "react-router-dom";
import QuestionComponent from "../components/QuestionComponent/QuestionComponent";
import "./StudyQuestions.css";
import customisedTheme from "../functions/theme";

import { studyFormQuestionsState } from "../functions/atom";

export default function StudyQuestions() {
  const navigateTo = useNavigate();
  const [questions, setQuestions] = useRecoilState(studyFormQuestionsState);

  const addQuestion = () => {
    const newQuestions = [...questions, { esm_submit: "Submit" }];
    setQuestions(newQuestions);
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
      if (!each.esm_type || !each.esm_title) {
        return false;
      }
    }
    return true;
  };

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
                  console.log(questions);
                  navigateTo("/study/schedule_configuration");
                }}
                disabled={!checkValidation()}
              >
                NEXT STEP:SCHEDULE CONFIGURATION
              </Button>
            </Grid>
          </Grid>
        </Box>
      </div>
    </ThemeProvider>
  );
}
