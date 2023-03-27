import "./GoogleFitData.css";
import React from "react";
import Grid from "@mui/material/Unstable_Grid2";
import Box from "@mui/material/Box";
import { useRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import { Button, Radio, RadioGroup, ThemeProvider } from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import customisedTheme from "../functions/theme";
import SensorComponent from "../components/SensorComponent/SensorComponent";
import { GoogleFitDataState } from "../functions/atom";
import GoogleFitComponent from "../components/GoogleFitComponent/GoogleFitComponent";

export default function GoogleFitData() {
  const navigateTo = useNavigate();

  const [googleFitData, setGoogleFitData] = useRecoilState(GoogleFitDataState);

  // eslint-disable-next-line react/no-unstable-nested-components
  function GoogleFitSetting() {
    return (
      <div className="border">
        <p className="title">GoogleFit data setting</p>
        <p className="explanation">
          Collect sensor data from the participants' phone during your study.
          Some sensors require specific permissions to be enabled on the phone.
          These are automatically requested when the study is joined. Keep in
          mind that the collection of multiple sensors at high frequency can
          decrease battery life of the phone.
        </p>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <GoogleFitComponent
            name="Step"
            description="Aggregated step count."
            stateField={googleFitData.step}
            field="step"
            modeState="google_fit"
          />

          <GoogleFitComponent
            name="Distance"
            description="Aggregated distance in meters."
            stateField={googleFitData.distance}
            field="distance"
            modeState="google_fit"
          />

          <GoogleFitComponent
            name="Activity Time"
            description="A continuous segment of physical activity, such as walking or running, without indicating any specific intensity level. For example, it could represent a 30-minute segment of walking, regardless of whether the walking was leisurely or brisk."
            stateField={googleFitData.segment}
            field="segment"
            modeState="google_fit"
          />

          <GoogleFitComponent
            name="Activity Type"
            description="A single instance of a physical activity with an associated intensity level. For example, it could represent a single instance of walking with a moderate intensity level, as opposed to a segment of walking without any information about intensity."
            stateField={googleFitData.activity_type}
            field="activity_type"
            modeState="google_fit"
          />

          <GoogleFitComponent
            name="Calorie"
            description="The amount of energy in kilocalories (kcal) a person has burned during physical activity."
            stateField={googleFitData.google_fit_calorie}
            field="google_fit_calorie"
            modeState="google_fit"
          />

          <GoogleFitComponent
            name="Heart Rate"
            description="The data representing the number of heartbeats per minute (BPM) of a person's heart."
            stateField={googleFitData.google_fit_heart_rate}
            field="google_fit_heart_rate"
            modeState="google_fit"
          />

          <GoogleFitComponent
            name="Weight"
            description="The data representing a person's body weight in kilograms (kg)." // TODO
            stateField={googleFitData.google_fit_weight}
            field="google_fit_weight"
            modeState="google_fit"
          />

          <GoogleFitComponent
            name="Body fat percentage"
            description="The percentage of body fat a person has."
            stateField={googleFitData.google_fit_bodyfatpercentage}
            field="google_fit_bodyfatpercentage"
            modeState="google_fit"
          />

          <GoogleFitComponent
            name="Body Mass Index (BMI)"
            description="A person's body mass index, a measure of body fat based on height and weight in kilograms per meter squared (kg/m²)"
            stateField={googleFitData.google_fit_bmi}
            field="google_fit_bmi"
            modeState="google_fit"
          />

          <GoogleFitComponent
            name="Nutrition"
            description="Information about the nutrients (such as calories, protein, or fat) in a food or drink item."
            stateField={googleFitData.google_fit_nutrition}
            field="google_fit_nutrition"
            modeState="google_fit"
          />

          <GoogleFitComponent
            name="Blood glucose"
            description="A person's blood glucose level, typically measured in milligrams per deciliter (mg/dL)."
            stateField={googleFitData.google_fit_bloodglucose}
            field="google_fit_bloodglucose"
            modeState="google_fit"
          />

          <GoogleFitComponent
            name="Blood pressure"
            description="A person's blood pressure reading, typically measured as two numbers: systolic pressure (the higher number) and diastolic pressure (the lower number) in millimeters of mercury (mmHg)" // TODO
            stateField={googleFitData.google_fit_bloodpressure}
            field="google_fit_bloodpressure"
            modeState="google_fit"
          />
          <GoogleFitComponent
            name="Oxygen Saturation"
            description="A person's oxygen saturation level, typically measured as a percentage of the maximum amount of oxygen that the blood can carry."
            stateField={googleFitData.google_fit_oxygensaturation}
            field="google_fit_oxygensaturation"
            modeState="google_fit"
          />
        </Grid>
      </div>
    );
  }

  return (
    <ThemeProvider theme={customisedTheme}>
      <div className="main_vertical_layout">
        <div className="border">
          <p className="title">GoogleFit data</p>
          <p className="explanation">
            Obtain data from google fit from the participants' google account.
            Some sensors require specific permissions to be enabled on the
            phone. These are automatically requested when the study is joined.
            Keep in mind that the collection of multiple sensors at high
            frequency can decrease battery life of the phone.
          </p>

          <GoogleFitComponent
            name="Collect Google Fit Data"
            description="Deploy a button which when clicked the Google Fit data will be collected from participants' Google account"
            stateField={googleFitData.extract_data}
            field="extract_data"
            modeState="google_fit"
          />
        </div>

        {googleFitData.extract_data ? GoogleFitSetting() : <div />}

        <Box sx={{ width: "100%" }} mt={5} marginBottom={5}>
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 23 }}
          >
            <Grid xs={6}>
              <Button
                color="main"
                variant="contained"
                onClick={() => {
                  navigateTo("/study/sensor_data");
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
                  navigateTo("/study/overview");
                }}
              >
                NEXT STEP: OVERVIEW
              </Button>
            </Grid>
          </Grid>
        </Box>
      </div>
    </ThemeProvider>
  );
}
