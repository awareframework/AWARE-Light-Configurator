import React from "react";
import "./Granularity.css";
import { Radio, RadioGroup, TextField } from "@mui/material";
import { useRecoilState } from "recoil";
import Grid from "@mui/material/Unstable_Grid2";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import {
  DateTimePicker,
  LocalizationProvider,
  StaticDateTimePicker,
} from "@mui/x-date-pickers";
import {
  accelerometerState,
  applicationSensorState,
  barometerState,
  BloodGlucoseState,
  BloodPressureState,
  bluetoothState,
  BodyFatPercentageState,
  BodyMassIndexState,
  CalorieState,
  communicationSensorState,
  DistanceState,
  gravityState,
  gyroscopeState,
  HeartRateState,
  lightState,
  linearAccelerometerState,
  locationsState,
  magnetometerState,
  networkState,
  NutritionState,
  OxygenSaturationState,
  processorState,
  proximityState,
  rotationState,
  SampleState,
  screenSensorState,
  SegmentState,
  sensorDataState,
  StepState,
  temperatureState,
  timezoneState,
  WeightState,
  wifiState,
} from "../../functions/atom";

function Granularity(inputs) {
  // Activity
  const [activityStepData, setActivityStepData] = useRecoilState(StepState);
  const updateActivityStepData = (fieldName, value) => {
    setActivityStepData({
      ...activityStepData,
      [fieldName]: value,
    });
  };

  const [distanceActivity, setDistanceActivity] = useRecoilState(DistanceState);
  const updateActivityDistance = (fieldName, value) => {
    setDistanceActivity({
      ...distanceActivity,
      [fieldName]: value,
    });
  };

  const [segmentActivity, setSegmentActivity] = useRecoilState(SegmentState);
  const updateActivitySegment = (fieldName, value) => {
    setSegmentActivity({
      ...segmentActivity,
      [fieldName]: value,
    });
  };

  const [sampleActivity, setSampleActivity] = useRecoilState(SampleState);
  const updateActivitySample = (fieldName, value) => {
    setSampleActivity({
      ...sampleActivity,
      [fieldName]: value,
    });
  };

  const [calorieActivity, setCalorieActivity] = useRecoilState(CalorieState);
  const updateActivityCalorie = (fieldName, value) => {
    setCalorieActivity({
      ...calorieActivity,
      [fieldName]: value,
    });
  };

  const [HeartRateActivity, setHeartRateActivity] =
    useRecoilState(HeartRateState);
  const updateActivityHeartRate = (fieldName, value) => {
    setHeartRateActivity({
      ...HeartRateActivity,
      [fieldName]: value,
    });
  };

  // Body data
  const [weightData, setWeightData] = useRecoilState(WeightState);
  const updateWeightData = (fieldName, value) => {
    setWeightData({
      ...weightData,
      [fieldName]: value,
    });
  };

  const [bodyFatPercentageData, setBodyFatPercentageData] = useRecoilState(
    BodyFatPercentageState
  );
  const updateBodyFatPercentageData = (fieldName, value) => {
    setBodyFatPercentageData({
      ...bodyFatPercentageData,
      [fieldName]: value,
    });
  };

  const [bmiData, setBmiData] = useRecoilState(BodyMassIndexState);
  const updateBmiData = (fieldName, value) => {
    setBmiData({
      ...bmiData,
      [fieldName]: value,
    });
  };

  // Nutrition data
  const [nutrientData, setNutrientData] = useRecoilState(NutritionState);
  const updateNutrientData = (fieldName, value) => {
    setNutrientData({
      ...nutrientData,
      [fieldName]: value,
    });
  };

  // Blood data
  const [bloodGlucoseData, setBloodGlucoseData] =
    useRecoilState(BloodGlucoseState);
  const updateBloodGlucoseData = (fieldName, value) => {
    setBloodGlucoseData({
      ...bloodGlucoseData,
      [fieldName]: value,
    });
  };

  const [bloodPressureData, setBloodPressureData] =
    useRecoilState(BloodPressureState);
  const updateBloodPressureData = (fieldName, value) => {
    setBloodPressureData({
      ...bloodPressureData,
      [fieldName]: value,
    });
  };

  const [oxygenSaturationData, setOxygenSaturationData] = useRecoilState(
    OxygenSaturationState
  );
  const updateOxygenSaturationData = (fieldName, value) => {
    setOxygenSaturationData({
      ...oxygenSaturationData,
      [fieldName]: value,
    });
  };

  function updateStates(fieldName, value, mode) {
    if (mode === "step") {
      updateActivityStepData(fieldName, value);
    } else if (mode === "distance") {
      updateActivityDistance(fieldName, value);
    } else if (mode === "segment") {
      updateActivitySegment(fieldName, value);
    } else if (mode === "sample") {
      updateActivitySample(fieldName, value);
    } else if (mode === "calorie") {
      updateActivityCalorie(fieldName, value);
    } else if (mode === "heart_rate") {
      updateActivityHeartRate(fieldName, value);
    } else if (mode === "weight") {
      updateWeightData(fieldName, value);
    } else if (mode === "body_fat") {
      updateBodyFatPercentageData(fieldName, value);
    } else if (mode === "bmi") {
      updateBmiData(fieldName, value);
    } else if (mode === "nutrition") {
      updateNutrientData(fieldName, value);
    } else if (mode === "blood_glucose") {
      updateBloodGlucoseData(fieldName, value);
    } else if (mode === "blood_pressure") {
      updateBloodPressureData(fieldName, value);
    } else if (mode === "oxygen_saturation") {
      updateOxygenSaturationData(fieldName, value);
    }
  }

  const { title, description, field, studyField, modeState } = inputs;

  return (
    <div className="sensor_vertical_layout">
      <Grid>
        <p className="field_name" mb={10}>
          {title}
        </p>
      </Grid>
      <Grid marginTop={1}>
        <RadioGroup
          aria-labelledby="clean_data_freq"
          name="clean_data_freq"
          value={studyField || "day"}
          row
        >
          <FormControlLabel
            value="day"
            control={<Radio />}
            label="Day"
            onClick={(_, checked) => {
              updateStates(field.toString(), "day", modeState);
            }}
          />
          <FormControlLabel
            value="hour"
            control={<Radio />}
            label="Hour"
            onClick={(_, checked) => {
              updateStates(field.toString(), "hour", modeState);
            }}
          />
          <FormControlLabel
            value="minute"
            control={<Radio />}
            label="Minute"
            onClick={(_, checked) => {
              updateStates(field.toString(), "minute", modeState);
            }}
          />
        </RadioGroup>
        <p className="schedule-description">{description}</p>
      </Grid>
    </div>
  );
}
export default Granularity;
