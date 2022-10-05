import { atom } from "recoil";

export const isLoadingState = atom({
  key: "isLoadingState",
  default: false,
});

export const studyFormStudyInformationState = atom({
  key: "studyFormStudyInformationState",
  default: {},
});

// questions
export const studyFormQuestionsState = atom({
  key: "studyFormQuestionsState",
  default: [{}],
});

// options : key is index, value is how many options for this question
export const questionOptionState = atom({
  key: "questionOptionState",
  default: {},
});

export const studyFormScheduleConfigurationState = atom({
  key: "studyFormScheduleConfigurationState",
  default: {},
});

export const studyFormSensorDataState = atom({
  key: "studyFormSensorDataState",
  default: {},
});

export const sensorDataState = atom({
  key: "sensorDataState",
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
