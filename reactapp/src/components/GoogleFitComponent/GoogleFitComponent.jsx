import React from "react";
import "./GoogleFitComponent.css";
import { useRecoilState } from "recoil";
import Grid from "@mui/material/Unstable_Grid2";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
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
} from "../../functions/atom";

export default function GoogleFitComponent(inputs) {
  const [googleFitData, setGoogleFitData] = useRecoilState(GoogleFitDataState);
  const updateGoogleFitData = (fieldName, value) => {
    setGoogleFitData({
      ...googleFitData,
      [fieldName]: value,
    });
  };

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
    if (mode === "google_fit") {
      updateGoogleFitData(fieldName, value);
    }

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
    } else if (mode === "heartrate") {
      updateActivityHeartRate(fieldName, value);
    } else if (mode === "weight") {
      updateWeightData(fieldName, value);
    } else if (mode === "bodyfatpercentage") {
      updateBodyFatPercentageData(fieldName, value);
    } else if (mode === "bmi") {
      updateBmiData(fieldName, value);
    } else if (mode === "nutrition") {
      updateNutrientData(fieldName, value);
    } else if (mode === "bloodglucose") {
      updateBloodGlucoseData(fieldName, value);
    } else if (mode === "bloodpressure") {
      updateBloodPressureData(fieldName, value);
    } else if (mode === "oxygensaturation") {
      updateOxygenSaturationData(fieldName, value);
    }
  }

  const { name, description, stateField, field, modeState } = inputs;

  return (
    <div className="google_fit_vertical_layout">
      <Grid>
        <FormControlLabel
          control={
            <Checkbox
              checked={stateField || false}
              onChange={(_, checked) => {
                updateStates(field.toString(), checked, modeState);
                console.log(stateField, modeState);
              }}
            />
          }
          label={name}
        />
      </Grid>
      <Grid>
        <p className="explanation">{description}</p>
      </Grid>
    </div>
  );
}
