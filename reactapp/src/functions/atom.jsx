import { atom } from "recoil";

export const isLoadingState = atom({
  key: "isLoadingState",
  default: false,
});

export const studyFormStudyInformationState = atom({
  key: "studyFormStudyInformationState",
  default: {},
});

// database connection
export const databaseConnectionState = atom({
  key: "databaseConnectionState",
  default: false,
});

// questions
export const studyFormQuestionsState = atom({
  key: "studyFormQuestionsState",
  default: [{}],
});

export const studyFormScheduleConfigurationState = atom({
  key: "studyFormScheduleConfigurationState",
  default: [{}],
});

export const studyFormSensorDataState = atom({
  key: "studyFormSensorDataState",
  default: {},
});

export const sensorDataState = atom({
  key: "sensorDataState",
  default: {},
});

export const GoogleFitDataState = atom({
  key: "GoogleFitDataState",
  default: {},
});

export const StepState = atom({
  key: "StepState",
  default: {},
});

export const DistanceState = atom({
  key: "DistanceState",
  default: {},
});

export const SegmentState = atom({
  key: "SegmentState",
  default: {},
});

export const SampleState = atom({
  key: "SampleState",
  default: {},
});

export const CalorieState = atom({
  key: "CalorieState",
  default: {},
});

export const HeartRateState = atom({
  key: "HeartRateState",
  default: {},
});

export const WeightState = atom({
  key: "WeightState",
  default: {},
});

export const BodyFatPercentageState = atom({
  key: "BodyFatPercentageState",
  default: {},
});

export const BodyMassIndexState = atom({
  key: "BodyMassIndexState",
  default: {},
});

export const LocationState = atom({
  key: "LocationState",
  default: {},
});

export const NutritionState = atom({
  key: "NutritionState",
  default: {},
});

export const BloodGlucoseState = atom({
  key: "BloodGlucoseState",
  default: {},
});

export const BloodPressureState = atom({
  key: "BloodPressureState",
  default: {},
});

export const OxygenSaturationState = atom({
  key: "OxygenSaturationState",
  default: {},
});

export const databaseInformationState = atom({
  key: "databaseDataState",
  default: {},
});

// Software Sensor SubFields:

export const applicationSensorState = atom({
  key: "applicationSensorState",
  default: {},
});

export const communicationSensorState = atom({
  key: "communicationSensorState",
  default: {},
});

export const screenSensorState = atom({
  key: "screenSensorState",
  default: {},
});
export const timezoneState = atom({
  key: "timezoneState",
  default: {},
});

// Hardware Sensor SubFields:

export const accelerometerState = atom({
  key: "accelerometerState",
  default: {},
});

export const barometerState = atom({
  key: "barometerState",
  default: {},
});

export const bluetoothState = atom({
  key: "bluetoothState",
  default: {},
});

export const gravityState = atom({
  key: "gravityState",
  default: {},
});

export const gyroscopeState = atom({
  key: "gyroscopeState",
  default: {},
});

export const lightState = atom({
  key: "lightState",
  default: {},
});

export const linearAccelerometerState = atom({
  key: "linearAccelerometerState",
  default: {},
});

export const locationsState = atom({
  key: "locationsState",
  default: {},
});

export const magnetometerState = atom({
  key: "magnetometerState",
  default: {},
});

export const networkState = atom({
  key: "networkState",
  default: {},
});

export const processorState = atom({
  key: "processorState",
  default: {},
});

export const proximityState = atom({
  key: "proximityState",
  default: {},
});

export const rotationState = atom({
  key: "rotationState",
  default: {},
});

export const temperatureState = atom({
  key: "temperatureState",
  default: {},
});

export const wifiState = atom({
  key: "wifiState",
  default: {},
});

export const studyIdState = atom({
  key: "studyIdState",
  default: "",
});

export const createTimeState = atom({
  key: "createTimeState",
  default: "",
});

export const dialogState = atom({
  key: "dialogState",
  default: { isOpen: false, title: "", content: "" },
});
