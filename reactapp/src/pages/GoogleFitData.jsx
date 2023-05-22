import "./GoogleFitData.css";
import React from "react";
import Grid from "@mui/material/Unstable_Grid2";
import Box from "@mui/material/Box";
import { useRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import { Button, Radio, RadioGroup, ThemeProvider } from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import customisedTheme from "../functions/theme";
import { GoogleFitDataState } from "../functions/atom";
import GoogleFitComponent from "../components/GoogleFitComponent/GoogleFitComponent";
import FrequencyField from "../components/FrequencyField/FrequencyField";

export default function GoogleFitData() {
  const navigateTo = useNavigate();

  const [googleFitData, setGoogleFitData] = useRecoilState(GoogleFitDataState);

  const updateGoogleFitData = (fieldName, value) => {
    setGoogleFitData({
      ...googleFitData,
      [fieldName]: value,
    });
  };

  // eslint-disable-next-line react/no-unstable-nested-components
  function GoogleFitSensors() {
    return (
      <div className="border">
        <p className="title">Google Fit Data Type</p>
        <p className="explanation">
          Please select the data types that you would like to include in your
          study. Some data types require specific permissions to be enabled on
          the phone. These will be requested when the study is joined and when
          the button of retrieving the data is clicked.
        </p>

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
          name="Activity time"
          description="A continuous segment of physical activity, such as walking or running, without indicating any specific intensity level. For example, it could represent a 30-minute segment of walking, regardless of whether the walking was leisurely or brisk."
          stateField={googleFitData.segment}
          field="segment"
          modeState="google_fit"
        />

        <GoogleFitComponent
          name="Speed"
          description="A measure of how fast an object or person is moving, typically measured in units of distance traveled per unit of time"
          stateField={googleFitData.speed}
          field="speed"
          modeState="google_fit"
        />

        <GoogleFitComponent
          name="Calorie"
          description="The amount of energy in kilocalories (kcal) a person has burned during physical activity."
          stateField={googleFitData.calorie}
          field="calorie"
          modeState="google_fit"
        />

        <GoogleFitComponent
          name="Heart rate"
          description="The data representing the number of heartbeats per minute (BPM) of a person's heart."
          stateField={googleFitData.heart_rate}
          field="heart_rate"
          modeState="google_fit"
        />

        <GoogleFitComponent
          name="Weight"
          description="The data representing a person's body weight in kilograms (kg)." // TODO
          stateField={googleFitData.weight}
          field="weight"
          modeState="google_fit"
        />

        <GoogleFitComponent
          name="Body fat percentage"
          description="The percentage of body fat a person has."
          stateField={googleFitData.body_fat_percentage}
          field="body_fat_percentage"
          modeState="google_fit"
        />

        <GoogleFitComponent
          name="Hydration"
          description="The measurement of water intake or the monitoring of fluid levels in the body"
          stateField={googleFitData.hydration}
          field="hydration"
          modeState="google_fit"
        />

        <GoogleFitComponent
          name="Nutrition"
          description="Information about the nutrients (such as calories, protein, or fat) in a food or drink item."
          stateField={googleFitData.nutrition}
          field="nutrition"
          modeState="google_fit"
        />

        <GoogleFitComponent
          name="Power"
          description="Power, measured in watts (W), is a physical quantity that represents the rate at which work is done or energy is transferred."
          stateField={googleFitData.power}
          field="power"
          modeState="google_fit"
        />

        <GoogleFitComponent
          name="Basal metabolic rate (BMR)"
          description="The number of calories that an individual's body needs to perform basic functions while at rest"
          stateField={googleFitData.bmr}
          field="bmr"
          modeState="google_fit"
        />
      </div>
    );
  }

  // eslint-disable-next-line react/no-unstable-nested-components
  function GoogleFitSetting() {
    return (
      <div className="border">
        <p className="title">Setting for Google Fit data</p>
        <p className="explanation">
          Collect google fit data from the participants' phone during the study.
        </p>
        <div className="sensor_vertical_layout">
          <Grid>
            <p className="field_name" mb={10}>
              Set the frequency to define the level of segmentation for Google
              Fit data collection.
            </p>
          </Grid>
          <Grid marginTop={1}>
            <RadioGroup
              aria-labelledby="granularity"
              name="granularity"
              value={googleFitData.granularity || "minute"}
              row
            >
              <FormControlLabel
                value="day"
                control={<Radio />}
                label="Day"
                onClick={(_, checked) => {
                  updateGoogleFitData("granularity", "day");
                }}
              />
              <FormControlLabel
                value="hour"
                control={<Radio />}
                label="Hour"
                onClick={(_, checked) => {
                  updateGoogleFitData("granularity", "hour");
                }}
              />
              <FormControlLabel
                value="minute"
                control={<Radio />}
                label="Minute"
                onClick={(_, checked) => {
                  updateGoogleFitData("granularity", "minute");
                }}
              />
            </RadioGroup>
            <p className="explanation">
              Please be advised that once a higher level of data collection has
              been selected, it cannot be changed to a lower level. Thus,
              selecting a time interval of day/hour for data collection may
              result in a decrease in the level of detail available for analysis
              as compared to collecting data at a minute-level granularity. We
              highly recommend that you proceed with caution when making your
              selection in order to avoid any potential negative impacts on the
              accuracy and quality of the data collected.
            </p>
          </Grid>
        </div>

        <FrequencyField
          id="prestudy_retrieve_period"
          title="Pre-study data collection period"
          inputLabel=""
          defaultNum={0}
          description="The number of days for which the Google Fit data will be retrieved prior to the start of the study. Please set this field to 0 if not requiring any pre-study google fit data collection."
          field="prestudy_retrieve_period"
          studyField={googleFitData.prestudy_retrieve_period}
          modeState="google_fit"
        />

        <FrequencyField
          id="retrieval_period"
          title="Retrieve period"
          inputLabel=""
          defaultNum={0}
          description="The number of days for which the Google Fit data will be retrieved upon clicking the designated button. Please set this field to 0 if not requiring any google fit data collection during the study."
          field="retrieval_period"
          studyField={googleFitData.retrieval_period}
          modeState="google_fit"
        />
      </div>
    );
  }

  return (
    <ThemeProvider theme={customisedTheme}>
      <div className="main_vertical_layout">
        <div className="border">
          <p className="title">Google Fit data</p>
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

        {googleFitData.extract_data ? GoogleFitSetting(googleFitData) : <div />}
        {googleFitData.extract_data ? GoogleFitSensors() : <div />}

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
                  console.log(googleFitData);
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
