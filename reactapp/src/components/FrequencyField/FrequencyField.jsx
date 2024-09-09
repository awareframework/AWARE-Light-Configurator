import React, { useState, useEffect } from "react";
import "./FrequencyField.css";
import { TextField } from "@mui/material";
import { useRecoilState } from "recoil";
import Grid from "@mui/material/Unstable_Grid2";
import {
  accelerometerState,
  applicationSensorState,
  barometerState,
  bluetoothState,
  communicationSensorState,
  gravityState,
  gyroscopeState,
  lightState,
  linearAccelerometerState,
  locationsState,
  magnetometerState,
  networkState,
  processorState,
  proximityState,
  rotationState,
  screenSensorState,
  sensorDataState,
  temperatureState,
  timezoneState,
  wifiState,
  screenshotSensorState,
} from "../../functions/atom";

function FrequencyField(inputs) {
  const {
    id,
    title,
    inputLabel,
    defaultNum,
    description,
    field,
    studyField,
    modeState,
  } = inputs;

  const [localValue, setLocalValue] = useState(
    studyField || defaultNum.toString()
  );

  useEffect(() => {
    setLocalValue(studyField || defaultNum.toString());
  }, [studyField, defaultNum]);

  const [sensorData, setSensorData] = useRecoilState(sensorDataState);
  const [applicationSensor, setApplicationSensor] = useRecoilState(
    applicationSensorState
  );
  const [screenData, setScreenData] = useRecoilState(screenSensorState);
  const [communicationData, setCommunicationData] = useRecoilState(
    communicationSensorState
  );
  const [timezoneData, setTimezoneData] = useRecoilState(timezoneState);
  const [accelerometerData, setAccelerometerData] =
    useRecoilState(accelerometerState);
  const [barometerData, setBarometerData] = useRecoilState(barometerState);
  const [bluetoothData, setBluetoothData] = useRecoilState(bluetoothState);
  const [gravityData, setGravityData] = useRecoilState(gravityState);
  const [gyroscopeData, setGyroscopeData] = useRecoilState(gyroscopeState);
  const [lightData, setLightData] = useRecoilState(lightState);
  const [linearAccelerometerData, setLinearAccelerometerData] = useRecoilState(
    linearAccelerometerState
  );
  const [locationsData, setLocationsData] = useRecoilState(locationsState);
  const [magnetometerData, setMagnetometerData] =
    useRecoilState(magnetometerState);
  const [networkData, setNetworkData] = useRecoilState(networkState);
  const [processorData, setProcessorData] = useRecoilState(processorState);
  const [rotationData, setRotationData] = useRecoilState(rotationState);
  const [temperatureData, setTemperatureData] =
    useRecoilState(temperatureState);
  const [proximityData, setProximityData] = useRecoilState(proximityState);
  const [wifiData, setWifiData] = useRecoilState(wifiState);
  const [screenshotData, setScreenshotData] = useRecoilState(
    screenshotSensorState
  );

  function updateStates(fieldName, value, mode) {
    const numValue = parseFloat(value);
    if (!Number.isNaN(numValue) && numValue > 0) {
      switch (mode) {
        case "sensor":
          setSensorData((prevData) => ({ ...prevData, [fieldName]: numValue }));
          break;
        case "application":
          setApplicationSensor((prevData) => ({
            ...prevData,
            [fieldName]: numValue,
          }));
          break;
        case "screen":
          setScreenData((prevData) => ({ ...prevData, [fieldName]: numValue }));
          break;
        case "communication":
          setCommunicationData((prevData) => ({
            ...prevData,
            [fieldName]: numValue,
          }));
          break;
        case "timezone":
          setTimezoneData((prevData) => ({
            ...prevData,
            [fieldName]: numValue,
          }));
          break;
        case "accelerometer":
          setAccelerometerData((prevData) => ({
            ...prevData,
            [fieldName]: numValue,
          }));
          break;
        case "barometer":
          setBarometerData((prevData) => ({
            ...prevData,
            [fieldName]: numValue,
          }));
          break;
        case "bluetooth":
          setBluetoothData((prevData) => ({
            ...prevData,
            [fieldName]: numValue,
          }));
          break;
        case "gravity":
          setGravityData((prevData) => ({
            ...prevData,
            [fieldName]: numValue,
          }));
          break;
        case "gyroscope":
          setGyroscopeData((prevData) => ({
            ...prevData,
            [fieldName]: numValue,
          }));
          break;
        case "light":
          setLightData((prevData) => ({ ...prevData, [fieldName]: numValue }));
          break;
        case "linearAccelerometer":
          setLinearAccelerometerData((prevData) => ({
            ...prevData,
            [fieldName]: numValue,
          }));
          break;
        case "locations":
          setLocationsData((prevData) => ({
            ...prevData,
            [fieldName]: numValue,
          }));
          break;
        case "magnetometer":
          setMagnetometerData((prevData) => ({
            ...prevData,
            [fieldName]: numValue,
          }));
          break;
        case "network":
          setNetworkData((prevData) => ({
            ...prevData,
            [fieldName]: numValue,
          }));
          break;
        case "processor":
          setProcessorData((prevData) => ({
            ...prevData,
            [fieldName]: numValue,
          }));
          break;
        case "rotation":
          setRotationData((prevData) => ({
            ...prevData,
            [fieldName]: numValue,
          }));
          break;
        case "temperature":
          setTemperatureData((prevData) => ({
            ...prevData,
            [fieldName]: numValue,
          }));
          break;
        case "proximity":
          setProximityData((prevData) => ({
            ...prevData,
            [fieldName]: numValue,
          }));
          break;
        case "wifi":
          setWifiData((prevData) => ({ ...prevData, [fieldName]: numValue }));
          break;
        case "screenshot":
          setScreenshotData((prevData) => ({
            ...prevData,
            [fieldName]: numValue,
          }));
          break;

        default:
          console.warn(`Unexpected mode: ${mode}`);
          break;
      }
    }
  }

  const handleChange = (event) => {
    const newValue = event.target.value;
    setLocalValue(newValue);

    // Allow typing decimal numbers, but don't update state yet
    if (
      newValue === "" ||
      newValue === "0" ||
      newValue === "0." ||
      /^0?\.\d*$/.test(newValue)
    ) {
      return;
    }

    updateStates(field.toString(), newValue, modeState);
  };

  const handleBlur = () => {
    const numValue = parseFloat(localValue);
    if (Number.isNaN(numValue) || numValue <= 0) {
      setLocalValue(defaultNum.toString());
      updateStates(field.toString(), defaultNum, modeState);
    } else {
      setLocalValue(numValue.toString());
      updateStates(field.toString(), numValue, modeState);
    }
  };

  return (
    <div className="sensor_vertical_layout">
      <Grid>
        <p className="field_name" mb={10}>
          {title}
        </p>
      </Grid>
      <Grid marginTop={2}>
        <TextField
          id={id}
          label={inputLabel}
          value={localValue}
          type="text"
          InputLabelProps={{
            shrink: true,
          }}
          style={{ width: "100%" }}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <p className="schedule-description">{description}</p>
      </Grid>
    </div>
  );
}

export default FrequencyField;
