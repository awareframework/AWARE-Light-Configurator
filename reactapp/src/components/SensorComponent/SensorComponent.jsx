import React from "react";
import "./SensorComponent.css";
import { TextField } from "@mui/material";

import { useRecoilState } from "recoil";
import Grid from "@mui/material/Unstable_Grid2";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
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
  pluginSensorState,
} from "../../functions/atom";

export default function SensorComponent(inputs) {
  const [sensorData, setsensorData] = useRecoilState(sensorDataState);
  const updateSensorData = (fieldName, value) => {
    setsensorData({
      ...sensorData,
      [fieldName]: value,
    });
  };

  // software sensor states
  const [applicationSensor, setapplicationSensor] = useRecoilState(
    applicationSensorState
  );
  const updateApplicationData = (fieldName, value) => {
    setapplicationSensor({
      ...applicationSensor,
      [fieldName]: value,
    });
  };

  const [screenData, setscreenData] = useRecoilState(screenSensorState);
  const updateScreenData = (fieldName, value) => {
    setscreenData({
      ...screenData,
      [fieldName]: value,
    });
  };

  const [communicationData, setCommunicationData] = useRecoilState(
    communicationSensorState
  );
  const updateCommunicationData = (fieldName, value) => {
    setCommunicationData({
      ...communicationData,
      [fieldName]: value,
    });
  };

  const [timezoneData, setTimezoneData] = useRecoilState(timezoneState);
  const updateTimezoneData = (fieldName, value) => {
    setTimezoneData({
      ...timezoneData,
      [fieldName]: value,
    });
  };

  // hardware sensor states
  const [accelerometerData, setAccelerometerData] =
    useRecoilState(accelerometerState);
  const updateAccelerometerData = (fieldName, value) => {
    setAccelerometerData({
      ...accelerometerData,
      [fieldName]: value,
    });
  };

  const [barometerData, setBarometerData] = useRecoilState(barometerState);
  const updateBarometerData = (fieldName, value) => {
    setBarometerData({
      ...barometerData,
      [fieldName]: value,
    });
  };

  const [bluetoothData, setBluetoothData] = useRecoilState(bluetoothState);
  const updateBluetoothData = (fieldName, value) => {
    setBluetoothData({
      ...bluetoothData,
      [fieldName]: value,
    });
  };

  const [gravityData, setGravityData] = useRecoilState(gravityState);
  const updateGravityData = (fieldName, value) => {
    setGravityData({
      ...gravityData,
      [fieldName]: value,
    });
  };

  const [gyroscopeData, setGyroscopeData] = useRecoilState(gyroscopeState);
  const updateGyroscopeData = (fieldName, value) => {
    setGyroscopeData({
      ...gyroscopeData,
      [fieldName]: value,
    });
  };

  const [lightData, setLightData] = useRecoilState(lightState);
  const updateLightData = (fieldName, value) => {
    setLightData({
      ...lightData,
      [fieldName]: value,
    });
  };

  const [screenshotData, setScreenshotData] = useRecoilState(
    screenshotSensorState
  );
  const updateScreenshotData = (fieldName, value) => {
    setScreenshotData({
      ...screenshotData,
      [fieldName]: value,
    });
  };

  const [pluginData, setPluginData] = useRecoilState(pluginSensorState);
  const updatePluginData = (fieldName, value) => {
    setPluginData({
      [fieldName]: value,
    });
  };

  const [linearAccelerometerData, setLinearAccelerometerData] = useRecoilState(
    linearAccelerometerState
  );
  const updateLinearAccelerometerData = (fieldName, value) => {
    setLinearAccelerometerData({
      ...linearAccelerometerData,
      [fieldName]: value,
    });
  };

  const [locationsData, setLocationsData] = useRecoilState(locationsState);
  const updateLocationsData = (fieldName, value) => {
    setLocationsData({
      ...locationsData,
      [fieldName]: value,
    });
  };

  const [magnetometerData, setMagnetometerData] =
    useRecoilState(magnetometerState);
  const updateMagnetometerData = (fieldName, value) => {
    setMagnetometerData({
      ...magnetometerData,
      [fieldName]: value,
    });
  };

  const [networkData, setNetworkData] = useRecoilState(networkState);
  const updateNetworkData = (fieldName, value) => {
    setNetworkData({
      ...networkData,
      [fieldName]: value,
    });
  };

  const [processorData, setProcessorData] = useRecoilState(processorState);
  const updateProcessorData = (fieldName, value) => {
    setProcessorData({
      ...processorData,
      [fieldName]: value,
    });
  };

  const [rotationData, setRotationData] = useRecoilState(rotationState);
  const updateRotationData = (fieldName, value) => {
    setRotationData({
      ...rotationData,
      [fieldName]: value,
    });
  };

  const [temperatureData, setTemperatureData] =
    useRecoilState(temperatureState);
  const updateTemperatureData = (fieldName, value) => {
    setTemperatureData({
      ...temperatureData,
      [fieldName]: value,
    });
  };

  const [proximityData, setProximityData] = useRecoilState(proximityState);
  const updateProximityData = (fieldName, value) => {
    setProximityData({
      ...proximityData,
      [fieldName]: value,
    });
  };

  const [wifiData, setWifiData] = useRecoilState(wifiState);
  const updateWifiData = (fieldName, value) => {
    setWifiData({
      ...wifiData,
      [fieldName]: value,
    });
  };

  function updateStates(fieldName, value, mode) {
    if (mode === "sensor") {
      updateSensorData(fieldName, value);
    }

    // software sensors
    if (mode === "application") {
      updateApplicationData(fieldName, value);
    }
    if (mode === "screen") {
      updateScreenData(fieldName, value);
    }
    if (mode === "communication") {
      updateCommunicationData(fieldName, value);
    }
    if (mode === "timezone") {
      updateTimezoneData(fieldName, value);
    }

    // hardware sensors
    if (mode === "accelerometer") {
      updateAccelerometerData(fieldName, value);
    }
    if (mode === "barometer") {
      updateBarometerData(fieldName, value);
    }
    if (mode === "bluetooth") {
      updateBluetoothData(fieldName, value);
    }
    if (mode === "gravity") {
      updateGravityData(fieldName, value);
    }
    if (mode === "gyroscope") {
      updateGyroscopeData(fieldName, value);
    }
    if (mode === "light") {
      updateLightData(fieldName, value);
    }
    if (mode === "linearAccelerometer") {
      updateLinearAccelerometerData(fieldName, value);
    }
    if (mode === "locations") {
      updateLocationsData(fieldName, value);
    }
    if (mode === "magnetometer") {
      updateMagnetometerData(fieldName, value);
    }
    if (mode === "network") {
      updateNetworkData(fieldName, value);
    }
    if (mode === "processor") {
      updateProcessorData(fieldName, value);
    }
    if (mode === "rotation") {
      updateRotationData(fieldName, value);
    }
    if (mode === "temperature") {
      updateTemperatureData(fieldName, value);
    }
    if (mode === "proximity") {
      updateProximityData(fieldName, value);
    }
    if (mode === "wifi") {
      updateWifiData(fieldName, value);
    }
    if (mode === "screenshot") {
      updateScreenshotData(fieldName, value);
    }
    if (mode === "plugin") {
      updatePluginData(fieldName, value);
    }
  }

  const { sensorName, sensorDescription, stateField, field, modeState } =
    inputs;

  return (
    <div className="sensor_vertical_layout">
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
          label={sensorName}
        />
      </Grid>
      <Grid>
        <p className="explanation">{sensorDescription}</p>
      </Grid>
    </div>
  );
}
