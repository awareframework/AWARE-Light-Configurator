import "./GoogleFitData.css";
import React from "react";
import Grid from "@mui/material/Unstable_Grid2";
import Box from "@mui/material/Box";
import { useRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import { Button, Radio, RadioGroup, ThemeProvider } from "@mui/material";
// import { DateTimePicker } from "@mui/x-date-pickers";
import {
  LocalizationProvider,
  StaticDateTimePicker,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import customisedTheme from "../functions/theme";
import SensorComponent from "../components/SensorComponent/SensorComponent";
import {
  BloodGlucoseState,
  BloodPressureState,
  BodyFatPercentageState,
  BodyMassIndexState,
  CalorieState,
  DistanceState,
  GoogleFitDataState,
  HeartRateState,
  NutritionState,
  OxygenSaturationState,
  SampleState,
  SegmentState,
  StepState,
  WeightState,
} from "../functions/atom";
import GoogleFitComponent from "../components/GoogleFitComponent/GoogleFitComponent";
import TimePicker from "../components/TimePicker/TimePicker";
import Granularity from "../components/Granularity/Granularity";

export default function GoogleFitData() {
  const navigateTo = useNavigate();

  const [googleFitData, setGoogleFitData] = useRecoilState(GoogleFitDataState);
  const [activityStepData, setActivityStepData] = useRecoilState(StepState);
  const [activityDistanceData, setDistanceActivity] =
    useRecoilState(DistanceState);
  const [activitySegmentData, setSegmentActivity] =
    useRecoilState(SegmentState);
  const [activitySampleData, setSampleActivity] = useRecoilState(SampleState);
  const [activityCalorieData, setCalorieActivity] =
    useRecoilState(CalorieState);
  const [activityHeartRateData, setHeartRateActivity] =
    useRecoilState(HeartRateState);
  const [weightData, setWeightData] = useRecoilState(WeightState);
  const [bodyFatPercentageData, setBodyFatPercentageData] = useRecoilState(
    BodyFatPercentageState
  );
  const [bmiData, setBmiData] = useRecoilState(BodyMassIndexState);
  const [nutrientData, setNutrientData] = useRecoilState(NutritionState);
  const [bloodGlucoseData, setBloodGlucoseData] =
    useRecoilState(BloodGlucoseState);
  const [bloodPressureData, setBloodPressureData] =
    useRecoilState(BloodPressureState);
  const [oxygenSaturationData, setOxygenSaturationData] = useRecoilState(
    OxygenSaturationState
  );

  function googleFitSetting(data, mode) {
    return (
      <div>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid width="10%" />
          <Grid width="90%">
            <Granularity
              id={mode}
              title="Set the data granularity to define the level of segmentation for Google Fit data collection."
              description="Setting the data granularity to hour will provide more detailed data segments for analysis, whereas setting it to day or minute will provide less granular data segments, depending on the research question and level of detail required for analysis."
              studyField={data.granularity}
              field="granularity"
              modeState={mode}
            />

            <div style={{ display: "inline-block" }}>
              <TimePicker
                id={mode}
                title="Set start for Fit tracking time"
                description="Fallback to 3G syncing after specified number of hours trying over WiFi."
                studyField={data.start_time}
                field="start_time"
                modeState={mode}
              />
            </div>

            <div style={{ display: "inline-block" }}>
              <TimePicker
                id={mode}
                title="Set end for Fit tracking time"
                description="Fallback to 3G syncing after specified number of hours trying over WiFi."
                studyField={data.end_time}
                field="end_time"
                modeState={mode}
              />
            </div>
          </Grid>
        </Grid>
      </div>
    );
  }

  // eslint-disable-next-line react/no-unstable-nested-components
  function GoogleFitSetting() {
    return (
      <div className="border">
        <p className="title">Google Fit data setting</p>
        <p className="explanation">
          Collect sensor data from the participants' phone during your study.
          Some sensors require specific permissions to be enabled on the phone.
          These are automatically requested when the study is joined. Keep in
          mind that the collection of multiple sensors at high frequency can
          decrease battery life of the phone.
        </p>
        <GoogleFitComponent
          name="Step"
          description="Aggregated step count."
          stateField={googleFitData.step}
          field="step"
          modeState="google_fit"
        />

        {googleFitData.step ? (
          googleFitSetting(activityStepData, "step")
        ) : (
          <div />
        )}

        <GoogleFitComponent
          name="Distance"
          description="Aggregated distance in meters."
          stateField={googleFitData.distance}
          field="distance"
          modeState="google_fit"
        />

        {googleFitData.distance ? (
          googleFitSetting(activityDistanceData, "distance")
        ) : (
          <div />
        )}

        <GoogleFitComponent
          name="Activity Time"
          description="A continuous segment of physical activity, such as walking or running, without indicating any specific intensity level. For example, it could represent a 30-minute segment of walking, regardless of whether the walking was leisurely or brisk."
          stateField={googleFitData.segment}
          field="segment"
          modeState="google_fit"
        />

        {googleFitData.segment ? (
          googleFitSetting(activitySegmentData, "segment")
        ) : (
          <div />
        )}

        <GoogleFitComponent
          name="Activity Type"
          description="A single instance of a physical activity with an associated intensity level. For example, it could represent a single instance of walking with a moderate intensity level, as opposed to a segment of walking without any information about intensity."
          stateField={googleFitData.sample}
          field="sample"
          modeState="google_fit"
        />

        {googleFitData.sample ? (
          googleFitSetting(activitySampleData, "sample")
        ) : (
          <div />
        )}

        <GoogleFitComponent
          name="Calorie"
          description="The amount of energy in kilocalories (kcal) a person has burned during physical activity."
          stateField={googleFitData.calorie}
          field="calorie"
          modeState="google_fit"
        />

        {googleFitData.calorie ? (
          googleFitSetting(activityCalorieData, "calorie")
        ) : (
          <div />
        )}

        <GoogleFitComponent
          name="Heart Rate"
          description="The data representing the number of heartbeats per minute (BPM) of a person's heart."
          stateField={googleFitData.heart_rate}
          field="heart_rate"
          modeState="google_fit"
        />

        {googleFitData.heart_rate ? (
          googleFitSetting(activityHeartRateData, "heart_rate")
        ) : (
          <div />
        )}

        <GoogleFitComponent
          name="Weight"
          description="The data representing a person's body weight in kilograms (kg)." // TODO
          stateField={googleFitData.weight}
          field="weight"
          modeState="google_fit"
        />

        {googleFitData.weight ? (
          googleFitSetting(weightData, "weight")
        ) : (
          <div />
        )}

        <GoogleFitComponent
          name="Body fat percentage"
          description="The percentage of body fat a person has."
          stateField={googleFitData.body_fat_percentage}
          field="body_fat_percentage"
          modeState="google_fit"
        />

        {googleFitData.body_fat_percentage ? (
          googleFitSetting(bodyFatPercentageData, "body_fat_percentage")
        ) : (
          <div />
        )}

        <GoogleFitComponent
          name="Body Mass Index (BMI)"
          description="A person's body mass index, a measure of body fat based on height and weight in kilograms per meter squared (kg/m²)"
          stateField={googleFitData.bmi}
          field="bmi"
          modeState="google_fit"
        />

        {googleFitData.bmi ? googleFitSetting(bmiData, "bmi") : <div />}

        <GoogleFitComponent
          name="Nutrition"
          description="Information about the nutrients (such as calories, protein, or fat) in a food or drink item."
          stateField={googleFitData.nutrition}
          field="nutrition"
          modeState="google_fit"
        />

        {googleFitData.nutrition ? (
          googleFitSetting(nutrientData, "nutrition")
        ) : (
          <div />
        )}

        <GoogleFitComponent
          name="Blood glucose"
          description="A person's blood glucose level, typically measured in milligrams per deciliter (mg/dL)."
          stateField={googleFitData.blood_glucose}
          field="blood_glucose"
          modeState="google_fit"
        />

        {googleFitData.blood_glucose ? (
          googleFitSetting(bloodGlucoseData, "blood_glucose")
        ) : (
          <div />
        )}

        <GoogleFitComponent
          name="Blood pressure"
          description="A person's blood pressure reading, typically measured as two numbers: systolic pressure (the higher number) and diastolic pressure (the lower number) in millimeters of mercury (mmHg)" // TODO
          stateField={googleFitData.blood_pressure}
          field="blood_pressure"
          modeState="google_fit"
        />

        {googleFitData.blood_pressure ? (
          googleFitSetting(bloodPressureData, "blood_pressure")
        ) : (
          <div />
        )}

        <GoogleFitComponent
          name="Oxygen Saturation"
          description="A person's oxygen saturation level, typically measured as a percentage of the maximum amount of oxygen that the blood can carry."
          stateField={googleFitData.oxygen_saturation}
          field="oxygen_saturation"
          modeState="google_fit"
        />

        {googleFitData.oxygen_saturation ? (
          googleFitSetting(oxygenSaturationData, "oxygen_saturation")
        ) : (
          <div />
        )}
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
                  // navigateTo("/study/sensor_data");
                  console.log(activityStepData);
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
