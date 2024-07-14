import "./SensorData.css";
import React from "react";
import Grid from "@mui/material/Unstable_Grid2";
import Box from "@mui/material/Box";
import { useRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import { Button, Radio, RadioGroup, ThemeProvider } from "@mui/material";
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
  studyFormStudyInformationState,
  temperatureState,
  timezoneState,
  wifiState,
  screenshotSensorState,
} from "../functions/atom";
import SensorComponent from "../components/SensorComponent/SensorComponent";
import FrequencyField from "../components/FrequencyField/FrequencyField";
import customisedTheme from "../functions/theme";
import Field from "../components/Field/Field";

export default function SensorData() {
  const navigateTo = useNavigate();
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

  const updateApplicationSensorData = (fieldName, value) => {
    setapplicationSensor({
      ...applicationSensor,
      [fieldName]: value,
    });
  };

  const [screenData, setscreenData] = useRecoilState(screenSensorState);

  const [communicationData, setcommunicationData] = useRecoilState(
    communicationSensorState
  );

  const [accelerometerData, setaccelerometerData] =
    useRecoilState(accelerometerState);

  const [gravityData, setgravityData] = useRecoilState(gravityState);

  const [timezoneData, setTimezoneData] = useRecoilState(timezoneState);

  const [barometerData, setbarometerData] = useRecoilState(barometerState);

  const [gyroscopeData, setgyroscopeData] = useRecoilState(gyroscopeState);

  const [lightData, setlightData] = useRecoilState(lightState);

  const [linearAccelerometerData, setLinearAccelerometerData] = useRecoilState(
    linearAccelerometerState
  );

  const [locationsData, setLocationsData] = useRecoilState(locationsState);

  const [magnetometerData, setmagnetometerData] =
    useRecoilState(magnetometerState);

  const [bluetoothData, setBluetoothData] = useRecoilState(bluetoothState);

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

  // eslint-disable-next-line react/no-unstable-nested-components
  function TextReader() {
    return (
      <div>
        <p className="field_name" mb={10}>
          Include or exclude specific package to study *
        </p>
        <Grid marginTop={2}>
          <RadioGroup
            aria-labelledby="package_specification"
            name="package_specification"
            value={applicationSensor.package_specification || "2"}
            row
          >
            <FormControlLabel
              value="0"
              control={<Radio />}
              label="Inclusive packages"
              onClick={(_, checked) => {
                updateApplicationSensorData("package_specification", "0");
              }}
            />
            <FormControlLabel
              value="1"
              control={<Radio />}
              label="Exclusive packages"
              onClick={(_, checked) => {
                updateApplicationSensorData("package_specification", "1");
              }}
            />
            <FormControlLabel
              value="2"
              control={<Radio />}
              label="Default track all packages"
              onClick={(_, checked) => {
                updateApplicationSensorData("package_specification", "2");
              }}
            />
          </RadioGroup>
        </Grid>

        <Field
          fieldName="Package names"
          recoilState={applicationSensorState}
          field="package_names"
          inputLabel="Package names from google store"
        />

        <Grid>
          <p className="explanation">
            You may leave the field blank if default is selected. Please list
            the package names separated by comma or space.
            <br />
            Example 1: com.phone.aware com.twitter.android
            <br />
            Example 2: com.phone.aware,com.twitter.android
            <br />
            Example 3: com.phone.aware, com.twitter.android
          </p>
        </Grid>
      </div>
    );
  }

  // eslint-disable-next-line react/no-unstable-nested-components
  function SensorApplicationSubContent() {
    return (
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid width="10%" />
        <Grid width="70%">
          <SensorComponent
            sensorName="Notifications"
            sensorDescription="Activate or deactivate application notifications sensor."
            stateField={applicationSensor.notifications}
            field="notifications"
            modeState="application"
          />

          <SensorComponent
            sensorName="Crashes"
            sensorDescription="Activate or deactivate application crashes sensor."
            stateField={applicationSensor.crashes}
            field="crashes"
            modeState="application"
          />

          <FrequencyField
            id="frequency_applications"
            title="Frequency applications"
            inputLabel="seconds waiting for checking updates on background applications"
            defaultNum={30}
            description="How frequently to check updates on background applications and services statuses (default 30 seconds)"
            field="frequency_applications"
            studyField={applicationSensor.frequency_applications}
            modeState="application"
          />

          <SensorComponent
            sensorName="Keyboard sensor"
            sensorDescription="Log keyboard input."
            stateField={applicationSensor.keyboard}
            field="keyboard"
            modeState="application"
          />

          <SensorComponent
            sensorName="Mask keyboard"
            sensorDescription="Swaps all alphanumeric characters by A, a, and 1"
            stateField={applicationSensor.mask_keyboard}
            field="mask_keyboard"
            modeState="application"
          />

          <SensorComponent
            sensorName="Mask notification content"
            sensorDescription="Convert the notification messages into a irreversible code by applying a hash function"
            stateField={applicationSensor.mask_notification}
            field="mask_notification"
            modeState="application"
          />

          <SensorComponent
            sensorName="Mask touch text"
            sensorDescription="Swaps all alphanumeric characters by A, a, and 1"
            stateField={applicationSensor.mask_touch_text}
            field="mask_touch_text"
            modeState="application"
          />

          <SensorComponent
            sensorName="Text tracker"
            sensorDescription="Log text on the screen. By default all information shown on the screen will be recorded."
            stateField={applicationSensor.status_screentext}
            field="status_screentext"
            modeState="application"
          />

          {applicationSensor.status_screentext ? TextReader() : <div />}
        </Grid>
      </Grid>
    );
  }

  // eslint-disable-next-line react/no-unstable-nested-components
  function SensorCommunicationSubContent() {
    return (
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid width="10%" />
        <Grid width="70%">
          <SensorComponent
            sensorName="Communication events"
            sensorDescription="Activate or deactivate high-level context of users’ communication usage."
            stateField={communicationData.events}
            field="events"
            modeState="communication"
          />

          <SensorComponent
            sensorName="Calls sensor"
            sensorDescription="Activate or deactivate calls sensor."
            stateField={communicationData.calls}
            field="calls"
            modeState="communication"
          />

          <SensorComponent
            sensorName="Text messages sensor"
            sensorDescription="Activate or deactivate messages sensor."
            stateField={communicationData.messages}
            field="messages"
            modeState="communication"
          />
        </Grid>
      </Grid>
    );
  }

  // eslint-disable-next-line react/no-unstable-nested-components
  function SensorTimezoneSubContent() {
    return (
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid width="10%" />
        <Grid width="70%">
          <FrequencyField
            id="frequency_timezone"
            title="Frequency timezone"
            inputLabel="seconds checking for timezone change"
            defaultNum={200000}
            description="Frequency in seconds to check for changes in timezone."
            field="frequency_timezone"
            studyField={timezoneData.frequency_timezone}
            modeState="timezone"
          />
        </Grid>
      </Grid>
    );
  }

  // eslint-disable-next-line react/no-unstable-nested-components
  function SensorAccelerometerSubContent() {
    return (
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid width="10%" />
        <Grid width="70%">
          <FrequencyField
            id="frequency_sample_accelerometer"
            title="Sampling frequency (in microsec.)"
            inputLabel="frequency in microseconds"
            defaultNum={200000}
            description="Non-deterministic frequency in microseconds (dependent of the hardware sensor capabilities and resources), e.g., 200000 (normal), 60000 (UI), 20000 (game), 0 (fastest)."
            field="frequency_sample_accelerometer"
            studyField={accelerometerData.frequency_sample_accelerometer}
            modeState="accelerometer"
          />

          <FrequencyField
            id="threshold"
            title="Threshold accelerometer"
            inputLabel="threshold"
            defaultNum={0}
            description="E.g., log only if [x,y,z] >= 0.01. 0 = disabled"
            field="threshold"
            studyField={accelerometerData.threshold}
            modeState="accelerometer"
          />

          <SensorComponent
            sensorName="Frequency accelerometer enforce"
            sensorDescription="Enforce sampling rate"
            stateField={accelerometerData.enforce}
            field="enforce"
            modeState="accelerometer"
          />
        </Grid>
      </Grid>
    );
  }

  // eslint-disable-next-line react/no-unstable-nested-components
  function SensorBarometerSubContent() {
    return (
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid width="10%" />
        <Grid width="70%">
          <FrequencyField
            id="frequency_sample_barometer"
            title="Sampling frequency (in microsec.)"
            inputLabel="frequency in microseconds"
            defaultNum={200000}
            description="Non-deterministic frequency in microseconds (dependent of the hardware sensor capabilities and resources), e.g., 200000 (normal), 60000 (UI), 20000 (game), 0 (fastest)."
            field="frequency_sample_barometer"
            studyField={barometerData.frequency_sample_barometer}
            modeState="barometer"
          />

          <FrequencyField
            id="threshold"
            title="Threshold barometer"
            inputLabel="threshold"
            defaultNum={0}
            description="E.g., log only if [x,y,z] >= 0.01. 0 = disabled"
            field="threshold"
            studyField={barometerData.threshold}
            modeState="barometer"
          />

          <SensorComponent
            sensorName="Frequency barometer enforce"
            sensorDescription="Enforce the frequency"
            stateField={barometerData.enforce}
            field="enforce"
            modeState="barometer"
          />
        </Grid>
      </Grid>
    );
  }

  // eslint-disable-next-line react/no-unstable-nested-components
  function SensorBluetoothSubContent() {
    return (
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid width="10%" />
        <Grid width="70%">
          <FrequencyField
            id="frequency_bluetooth"
            title="Frequency bluetooth"
            inputLabel="frequency in seconds"
            defaultNum={60}
            description="Deterministic frequency in seconds (default is 60 seconds)."
            field="frequency_bluetooth"
            studyField={bluetoothData.frequency_bluetooth}
            modeState="bluetooth"
          />
        </Grid>
      </Grid>
    );
  }

  // eslint-disable-next-line react/no-unstable-nested-components
  function SensorGravitySubContent() {
    return (
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid width="10%" />
        <Grid width="70%">
          <FrequencyField
            id="frequency_gravity"
            title="Frequency gravity"
            inputLabel="frequency in microseconds"
            defaultNum={200000}
            description="Non-deterministic frequency in microseconds (dependent of the hardware sensor capabilities and resources), e.g., 200000 (normal), 60000 (UI), 20000 (game), 0 (fastest)"
            field="frequency_gravity"
            studyField={gravityData.frequency_gravity}
            modeState="gravity"
          />

          <FrequencyField
            id="threshold"
            title="Threshold gravity"
            inputLabel="threshold"
            defaultNum={0}
            description="E.g., log only if [x,y,z] >= 0.01. 0 = disabled"
            field="threshold"
            studyField={gravityData.threshold}
            modeState="gravity"
          />

          <SensorComponent
            sensorName="Frequency gravity enforce"
            sensorDescription="Enforce the frequency"
            stateField={gravityData.enforce}
            field="enforce"
            modeState="gravity"
          />
        </Grid>
      </Grid>
    );
  }

  // eslint-disable-next-line react/no-unstable-nested-components
  function SensorGyroscopeSubContent() {
    return (
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid width="10%" />
        <Grid width="70%">
          <FrequencyField
            id="frequency_gyroscope"
            title="Frequency gyroscope"
            inputLabel="frequency in microseconds"
            defaultNum={200000}
            description="Non-deterministic frequency in microseconds (dependent of the hardware sensor capabilities and resources), e.g., 200000 (normal), 60000 (UI), 20000 (game), 0 (fastest)"
            field="frequency_gyroscope"
            studyField={gyroscopeData.frequency_gyroscope}
            modeState="gyroscope"
          />

          <FrequencyField
            id="threshold"
            title="Threshold gyroscope"
            inputLabel="threshold"
            defaultNum={0}
            description="E.g., log only if [x,y,z] >= 0.01. 0 = disabled"
            field="threshold"
            studyField={gyroscopeData.threshold}
            modeState="gyroscope"
          />

          <SensorComponent
            sensorName="Frequency gyroscope enforce"
            sensorDescription="Enforce the frequency"
            stateField={gyroscopeData.enforce}
            field="enforce"
            modeState="gyroscope"
          />
        </Grid>
      </Grid>
    );
  }

  // eslint-disable-next-line react/no-unstable-nested-components
  function SensorLightSubContent() {
    return (
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid width="10%" />
        <Grid width="70%">
          <FrequencyField
            id="frequency_light"
            title="Frequency light"
            inputLabel="frequency in microseconds"
            defaultNum={200000}
            description="Non-deterministic frequency in microseconds (dependent of the hardware sensor capabilities and resources), e.g., 200000 (normal), 60000 (UI), 20000 (game), 0 (fastest)"
            field="frequency_light"
            studyField={lightData.frequency_light}
            modeState="light"
          />

          <FrequencyField
            id="threshold"
            title="Threshold light"
            inputLabel="threshold"
            defaultNum={0}
            description="E.g., log only if [x,y,z] >= 0.01. 0 = disabled"
            field="threshold"
            studyField={lightData.threshold}
            modeState="light"
          />

          <SensorComponent
            sensorName="Frequency light enforce"
            sensorDescription="Enforce the frequency"
            stateField={lightData.enforce}
            field="enforce"
            modeState="light"
          />
        </Grid>
      </Grid>
    );
  }

  // eslint-disable-next-line react/no-unstable-nested-components
  function SensorLinearAccelerometerSubContent() {
    return (
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid width="10%" />
        <Grid width="70%">
          <FrequencyField
            id="frequency_linear_accelerometer"
            title="Frequency linear accelerometer"
            inputLabel="frequency in microseconds"
            defaultNum={200000}
            description="Non-deterministic frequency in microseconds (dependent of the hardware sensor capabilities and resources), e.g., 200000 (normal), 60000 (UI), 20000 (game), 0 (fastest)"
            field="frequency_linear_accelerometer"
            studyField={linearAccelerometerData.frequency_linear_accelerometer}
            modeState="linearAccelerometer"
          />

          <FrequencyField
            id="threshold"
            title="Threshold linear accelerometer"
            inputLabel="threshold"
            defaultNum={0}
            description="E.g., log only if [x,y,z] >= 0.01. 0 = disabled"
            field="threshold"
            studyField={linearAccelerometerData.threshold}
            modeState="linearAccelerometer"
          />

          <SensorComponent
            sensorName="Frequency linear accelerometer enforce"
            sensorDescription="Enforce the frequency"
            stateField={linearAccelerometerData.enforce}
            field="enforce"
            modeState="linearAccelerometer"
          />
        </Grid>
      </Grid>
    );
  }

  // eslint-disable-next-line react/no-unstable-nested-components
  function SensorLocationsSubContent() {
    return (
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid width="10%" />
        <Grid width="70%">
          <SensorComponent
            sensorName="Location (GPS)"
            sensorDescription="Activate or deactivate GPS locations."
            stateField={locationsData.gps}
            field="gps"
            modeState="locations"
          />

          <SensorComponent
            sensorName="Location (Network)"
            sensorDescription="Activate or deactivate Network locations."
            stateField={locationsData.network}
            field="network"
            modeState="locations"
          />

          <FrequencyField
            id="frequency_gps"
            title="Frequency GPS"
            inputLabel="frequency in seconds"
            defaultNum={180}
            description="How frequent to check the GPS location, in seconds. By default, every 180 seconds. Setting to 0 (zero) will keep the GPS location tracking always on."
            field="frequency_gps"
            studyField={locationsData.frequency_gps}
            modeState="locations"
          />

          <FrequencyField
            id="frequency_network"
            title="Frequency network"
            inputLabel="frequency in seconds"
            defaultNum={300}
            description="How frequently to check the network location, in seconds. By default, every 300 seconds. Setting to 0 (zero) will keep the network location tracking always on."
            field="frequency_network"
            studyField={locationsData.frequency_network}
            modeState="locations"
          />
          <FrequencyField
            id="min_gps_freq"
            title="Min location gps accuracy"
            inputLabel="minimum accuracy in meters"
            defaultNum={150}
            description="The minimum acceptable accuracy of GPS location, in meters. By default, 150 meters. Setting to 0 (zero) will keep the GPS location tracking always on."
            field="min_gps_freq"
            studyField={locationsData.min_gps_freq}
            modeState="locations"
          />

          <FrequencyField
            id="min_network_freq"
            title="Min location network accuracy"
            inputLabel="minimum accuracy in meters"
            defaultNum={1500}
            description="The minimum acceptable accuracy of network location, in meters. By default, 1500 meters. Setting to 0 (zero) will keep the network location tracking always on."
            field="min_network_freq"
            studyField={locationsData.min_network_freq}
            modeState="locations"
          />

          <FrequencyField
            id="expiration"
            title="Location expiration time"
            inputLabel="expiration time in seconds"
            defaultNum={300}
            description="The amount of elapsed time, in seconds, until the location is considered outdated. By default, 300 seconds."
            field="expiration"
            studyField={locationsData.expiration}
            modeState="locations"
          />

          <SensorComponent
            sensorName="Passive location"
            sensorDescription="Don't fetch locations, but use locations if other apps request them."
            stateField={locationsData.passive}
            field="passive"
            modeState="locations"
          />

          <SensorComponent
            sensorName="Save all locations"
            sensorDescription="Don't use heuristics to only record best locations"
            stateField={locationsData.save_all}
            field="save_all"
            modeState="locations"
          />
        </Grid>
      </Grid>
    );
  }

  // eslint-disable-next-line react/no-unstable-nested-components
  function SensorMagnetometerSubContent() {
    return (
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid width="10%" />
        <Grid width="70%">
          <FrequencyField
            id="frequency_magnetometer"
            title="Frequency magnetometer"
            inputLabel="frequency in microseconds"
            defaultNum={200000}
            description="Non-deterministic frequency in microseconds (dependent of the hardware sensor capabilities and resources), e.g., 200000 (normal), 60000 (UI), 20000 (game), 0 (fastest)"
            field="frequency_magnetometer"
            studyField={magnetometerData.frequency_magnetometer}
            modeState="magnetometer"
          />

          <FrequencyField
            id="threshold"
            title="Threshold magnetometer"
            inputLabel="threshold"
            defaultNum={0}
            description="E.g., log only if [x,y,z] >= 0.01. 0 = disabled"
            field="threshold"
            studyField={magnetometerData.threshold}
            modeState="magnetometer"
          />

          <SensorComponent
            sensorName="Frequency magnetometer enforce"
            sensorDescription="Enforce the frequency"
            stateField={magnetometerData.enforce}
            field="enforce"
            modeState="magnetometer"
          />
        </Grid>
      </Grid>
    );
  }

  // eslint-disable-next-line react/no-unstable-nested-components
  function SensorNetworkSubContent() {
    return (
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid width="10%" />
        <Grid width="70%">
          <SensorComponent
            sensorName="Network events"
            sensorDescription="Activate or deactivate sensor."
            stateField={networkData.events}
            field="events"
            modeState="network"
          />

          <SensorComponent
            sensorName="Network traffic"
            sensorDescription="Activate or deactivate sensor."
            stateField={networkData.traffic}
            field="traffic"
            modeState="network"
          />
        </Grid>
      </Grid>
    );
  }

  // eslint-disable-next-line react/no-unstable-nested-components
  function SensorProcessorSubContent() {
    return (
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid width="10%" />
        <Grid width="70%">
          <FrequencyField
            id="frequency_processor"
            title="Frequency processor"
            inputLabel="frequency in seconds"
            defaultNum={10}
            description="Frequency in seconds to update the processor load, by default is 10 seconds."
            field="frequency_processor"
            studyField={processorData.frequency_processor}
            modeState="processor"
          />
        </Grid>
      </Grid>
    );
  }

  // eslint-disable-next-line react/no-unstable-nested-components
  function SensorProximitySubContent() {
    return (
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid width="10%" />
        <Grid width="70%">
          <FrequencyField
            id="frequency_proximity"
            title="Frequency proximity"
            inputLabel="frequency in microseconds"
            defaultNum={200000}
            description="Non-deterministic frequency in microseconds (dependent of the hardware sensor capabilities and resources), e.g., 200000 (normal), 60000 (UI), 20000 (game), 0 (fastest)"
            field="frequency_proximity"
            studyField={proximityData.frequency_proximity}
            modeState="proximity"
          />

          <FrequencyField
            id="threshold"
            title="Threshold proximity"
            inputLabel="threshold"
            defaultNum={0}
            description="E.g., log only if [x,y,z] >= 0.01. 0 = disabled"
            field="threshold"
            studyField={proximityData.threshold}
            modeState="proximity"
          />

          <SensorComponent
            sensorName="Frequency proximity enforce"
            sensorDescription="Enforce the frequency"
            stateField={proximityData.enforce}
            field="enforce"
            modeState="proximity"
          />
        </Grid>
      </Grid>
    );
  }

  // eslint-disable-next-line react/no-unstable-nested-components
  function SensorRotationSubContent() {
    return (
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid width="10%" />
        <Grid width="70%">
          <FrequencyField
            id="frequency_rotation"
            title="Frequency rotation"
            inputLabel="frequency in microseconds"
            defaultNum={200000}
            description="Non-deterministic frequency in microseconds (dependent of the hardware sensor capabilities and resources), e.g., 200000 (normal), 60000 (UI), 20000 (game), 0 (fastest)"
            field="frequency_rotation"
            studyField={rotationData.frequency_rotation}
            modeState="rotation"
          />

          <FrequencyField
            id="threshold"
            title="Threshold rotation"
            inputLabel="threshold"
            defaultNum={0}
            description="E.g., log only if [x,y,z] >= 0.01. 0 = disabled"
            field="threshold"
            studyField={rotationData.threshold}
            modeState="rotation"
          />

          <SensorComponent
            sensorName="Frequency rotation enforce"
            sensorDescription="Enforce the frequency"
            stateField={rotationData.enforce}
            field="enforce"
            modeState="rotation"
          />
        </Grid>
      </Grid>
    );
  }

  // eslint-disable-next-line react/no-unstable-nested-components
  function SensorTemperatureSubContent() {
    return (
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid width="10%" />
        <Grid width="70%">
          <FrequencyField
            id="frequency_temperature"
            title="Frequency temperature"
            inputLabel="frequency in microseconds"
            defaultNum={200000}
            description="Non-deterministic frequency in microseconds (dependent of the hardware sensor capabilities and resources), e.g., 200000 (normal), 60000 (UI), 20000 (game), 0 (fastest)"
            field="frequency_temperature"
            studyField={temperatureData.frequency_temperature}
            modeState="temperature"
          />

          <FrequencyField
            id="threshold"
            title="Threshold temperature"
            inputLabel="threshold"
            defaultNum={0}
            description="E.g., log only if [x,y,z] >= 0.01. 0 = disabled"
            field="threshold"
            studyField={temperatureData.threshold}
            modeState="temperature"
          />

          <SensorComponent
            sensorName="Frequency temperature enforce"
            sensorDescription="Enforce the frequency"
            stateField={temperatureData.enforce}
            field="enforce"
            modeState="temperature"
          />
        </Grid>
      </Grid>
    );
  }

  // eslint-disable-next-line react/no-unstable-nested-components
  function SensorWifiSubContent() {
    return (
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid width="10%" />
        <Grid width="70%">
          <FrequencyField
            id="frequency_wifi"
            title="Frequency wi-fi"
            inputLabel="frequency in microseconds"
            defaultNum={60}
            description="How often to scan for devices, in seconds (default = 60 seconds)."
            field="frequency_wifi"
            studyField={wifiData.frequency_wifi}
            modeState="wifi"
          />
        </Grid>
      </Grid>
    );
  }

  // eslint-disable-next-line react/no-unstable-nested-components
  function SensorScreenSubContent() {
    return (
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid width="10%" />
        <Grid width="70%">
          <SensorComponent
            sensorName="Touch"
            sensorDescription="Logs clicks, long-clicks and scroll up/down events."
            stateField={screenData.sensor_touch}
            field="sensor_touch"
            modeState="screen"
          />
        </Grid>
      </Grid>
    );
  }

  // eslint-disable-next-line react/no-unstable-nested-components
  function SensorScreenshotSubContent() {
    return (
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid width="10%" />
        <Grid width="70%">
          <FrequencyField
            id="capture_time_interval"
            title="Capture Time Interval"
            inputLabel="Time interval between screenshots (seconds)"
            defaultNum={5}
            description="Time interval between each screenshot capture in seconds."
            field="capture_time_interval"
            studyField={screenshotData.capture_time_interval}
            modeState="screenshot"
          />
          <FrequencyField
            id="compress_rate"
            title="Compression Rate"
            inputLabel="Compression rate for screenshots"
            defaultNum={20}
            description="Compression rate for the screenshots (1-100)."
            field="compress_rate"
            studyField={screenshotData.compress_rate}
            modeState="screenshot"
          />
          <SensorComponent
            sensorName="Local Storage"
            sensorDescription="Enable or disable local storage of screenshots."
            stateField={screenshotData.status_screenshot_local_storage}
            field="status_screenshot_local_storage"
            modeState="screenshot"
          />
        </Grid>
      </Grid>
    );
  }

  return (
    <ThemeProvider theme={customisedTheme}>
      <div className="main_vertical_layout">
        <div className="border">
          <p className="title">Sensors data</p>
          <p className="explanation">
            Collect sensor data from the participants' phone during your study.
            Some sensors require specific permissions to be enabled on the
            phone. These are automatically requested when the study is joined.
            Keep in mind that the collection of multiple sensors at high
            frequency can decrease battery life of the phone.
          </p>
        </div>

        <div className="border">
          <p className="title">Configuration settings</p>
          <SensorComponent
            sensorName="Wifi only"
            sensorDescription="Upload data only when connected to Wi-Fi."
            stateField={sensorData.wifi_only}
            field="wifi_only"
            modeState="sensor"
          />
          <SensorComponent
            sensorName="Charging only"
            sensorDescription="Upload only if charging."
            stateField={sensorData.charging_only}
            field="charging_only"
            modeState="sensor"
          />

          <FrequencyField
            id="offload_frequency"
            title="Offload frequency"
            inputLabel="sychronised frequency in minutes"
            defaultNum={30}
            description="How often the data is synchronised with the webservices (min)?"
            field="offload_frequency"
            studyField={sensorData.offload_frequency}
            modeState="sensor"
          />

          <div>
            <Grid>
              <p className="field_name" mb={10}>
                Clean data frequency
              </p>
            </Grid>
            <Grid marginTop={2}>
              <RadioGroup
                aria-labelledby="clean_data_freq"
                name="clean_data_freq"
                value={sensorData.clean_data_freq || "0"}
                row
              >
                <FormControlLabel
                  value="0"
                  control={<Radio />}
                  label="Never"
                  onClick={(_, checked) => {
                    updateSensorData("clean_data_freq", "0");
                  }}
                />
                <FormControlLabel
                  value="2"
                  control={<Radio />}
                  label="Monthly"
                  onClick={(_, checked) => {
                    updateSensorData("clean_data_freq", "2");
                  }}
                />
                <FormControlLabel
                  value="1"
                  control={<Radio />}
                  label="Weekly"
                  onClick={(_, checked) => {
                    updateSensorData("clean_data_freq", "1");
                  }}
                />
                <FormControlLabel
                  value="3"
                  control={<Radio />}
                  label="Daily"
                  // checked={}
                  onClick={(_, checked) => {
                    updateSensorData("clean_data_freq", "3");
                  }}
                />
                <FormControlLabel
                  value="4"
                  control={<Radio />}
                  label="Always"
                  // checked={}
                  onClick={(_, checked) => {
                    updateSensorData("clean_data_freq", "4");
                  }}
                />
              </RadioGroup>
              <p className="schedule-description">
                How frequently to clean old data?
              </p>
            </Grid>
          </div>

          <SensorComponent
            sensorName="Silent"
            sensorDescription="Don't show sync notifications."
            stateField={sensorData.no_sync_notify}
            field="no_sync_notify"
            modeState="sensor"
          />

          <FrequencyField
            id="fallback_network"
            title="Fallback network"
            inputLabel="maximum number of trying over wifi"
            defaultNum={30}
            description="Fallback to 3G syncing after specified number of hours trying over WiFi."
            studyField={sensorData.fallback_network}
            field="fallback_network"
            modeState="sensor"
          />

          <SensorComponent
            sensorName="Remind to charge"
            sensorDescription="Remind to charge when 15% battery is left."
            stateField={sensorData.charge_reminder}
            field="charge_reminder"
            modeState="sensor"
          />
          <SensorComponent
            sensorName="Foreground priority"
            sensorDescription="Recommended to keep AWARE running non-stop."
            stateField={sensorData.foreground_priority}
            field="foreground_priority"
            modeState="sensor"
          />
          <SensorComponent
            sensorName="Debug flag"
            sensorDescription="Show debug messages in logcat."
            stateField={sensorData.debug_flag}
            field="debug_flag"
            modeState="sensor"
          />

          <FrequencyField
            id="config_update_freq"
            title="Config update frequency"
            inputLabel="minutes waiting for checking updates"
            defaultNum={60}
            description="How frequently to check for new study config (min)?"
            field="config_update_freq"
            studyField={sensorData.config_update_freq}
            modeState="sensor"
          />

          <SensorComponent
            sensorName="Enable settings update"
            sensorDescription="Allow participants to modify the study config from the mobile."
            stateField={sensorData.setting_update}
            field="setting_update"
            modeState="sensor"
          />
        </div>

        <div className="border">
          <p className="title">Software sensors</p>
          <SensorComponent
            sensorName="Application"
            sensorDescription="Application usage and incoming notifications on the device."
            stateField={sensorData.sensor_application}
            field="sensor_application"
            modeState="sensor"
          />

          {sensorData.sensor_application ? (
            SensorApplicationSubContent()
          ) : (
            <div />
          )}

          <SensorComponent
            sensorName="Battery"
            sensorDescription="Battery information and power related events (phone shutting down, rebooting)."
            stateField={sensorData.sensor_battery}
            field="sensor_battery"
            modeState="sensor"
          />
          <SensorComponent
            sensorName="Communication"
            sensorDescription="Communication events such as calls and messages, performed by or received by the user."
            stateField={sensorData.sensor_communication}
            field="sensor_communication"
            modeState="sensor"
          />

          {sensorData.sensor_communication ? (
            SensorCommunicationSubContent()
          ) : (
            <div />
          )}

          <SensorComponent
            sensorName="Installations"
            sensorDescription="Application installations, removal, and updates."
            stateField={sensorData.sensor_installation}
            field="sensor_installation"
            modeState="sensor"
          />

          <SensorComponent
            sensorName="Screen"
            sensorDescription="Smartphone screen status; turning on, turning off, lock, and unlock."
            stateField={sensorData.sensor_screen}
            field="sensor_screen"
            modeState="sensor"
          />
          {sensorData.sensor_screen ? SensorScreenSubContent() : <div />}

          <SensorComponent
            sensorName="Screenshot"
            sensorDescription="Smartphone screenshot capture;"
            stateField={sensorData.sensor_screenshot}
            field="sensor_screenshot"
            modeState="sensor"
          />
          {sensorData.sensor_screenshot ? (
            SensorScreenshotSubContent()
          ) : (
            <div />
          )}

          <SensorComponent
            sensorName="Telephony"
            sensorDescription="Information on the mobile phone capabilities of the device, connected cell towers, and neighboring towers."
            stateField={sensorData.sensor_telephony}
            field="sensor_telephony"
            modeState="sensor"
          />
          <SensorComponent
            sensorName="Timezone"
            sensorDescription="Logs user's current timezone."
            stateField={sensorData.sensor_timezone}
            field="sensor_timezone"
            modeState="sensor"
          />

          {sensorData.sensor_timezone ? SensorTimezoneSubContent() : <div />}
        </div>

        <div className="border">
          <p className="title">Hardware sensors</p>
          <SensorComponent
            sensorName="Accelerometer"
            sensorDescription="Acceleration applied to the device, including the force of gravity."
            stateField={sensorData.sensor_accelerometer}
            field="sensor_accelerometer"
            modeState="sensor"
          />

          {sensorData.sensor_accelerometer ? (
            SensorAccelerometerSubContent()
          ) : (
            <div />
          )}

          <SensorComponent
            sensorName="Barometer"
            sensorDescription="Ambient air pressure."
            stateField={sensorData.sensor_barometer}
            field="sensor_barometer"
            modeState="sensor"
          />

          {sensorData.sensor_barometer ? SensorBarometerSubContent() : <div />}

          <SensorComponent
            sensorName="Bluetooth"
            sensorDescription="Smartphone's Bluetooth sensor and surrounding Bluetooth-enabled and visible devices. Includes respective RSSI dB values."
            stateField={sensorData.sensor_bluetooth}
            field="sensor_bluetooth"
            modeState="sensor"
          />

          {sensorData.sensor_bluetooth ? SensorBluetoothSubContent() : <div />}

          <SensorComponent
            sensorName="Gravity"
            sensorDescription="Force of gravity applied to the the device, provides a three dimensional vector indicating the direction and magnitude of gravity."
            stateField={sensorData.sensor_gravity}
            field="sensor_gravity"
            modeState="sensor"
          />

          {sensorData.sensor_gravity ? SensorGravitySubContent() : <div />}

          <SensorComponent
            sensorName="Gyroscope"
            sensorDescription="Rate or rotation in rad/s around a device’s x-, y-, and z-axis."
            stateField={sensorData.sensor_gyroscope}
            field="sensor_gyroscope"
            modeState="sensor"
          />
          {sensorData.sensor_gyroscope ? SensorGyroscopeSubContent() : <div />}

          <SensorComponent
            sensorName="Light"
            sensorDescription="Level of ambient light."
            stateField={sensorData.sensor_light}
            field="sensor_light"
            modeState="sensor"
          />

          {sensorData.sensor_light ? SensorLightSubContent() : <div />}

          <SensorComponent
            sensorName="Linear accelerometer"
            sensorDescription="Acceleration applied to the device, excluding the force of gravity."
            stateField={sensorData.sensor_linear_accelerometer}
            field="sensor_linear_accelerometer"
            modeState="sensor"
          />

          {sensorData.sensor_linear_accelerometer ? (
            SensorLinearAccelerometerSubContent()
          ) : (
            <div />
          )}

          <SensorComponent
            sensorName="Locations"
            sensorDescription="Best location estimate of the users’ current location, based on an algorithm that results in minimum battery impact."
            stateField={sensorData.sensor_locations}
            field="sensor_locations"
            modeState="sensor"
          />

          {sensorData.sensor_locations ? SensorLocationsSubContent() : <div />}

          <SensorComponent
            sensorName="Magnetometer"
            sensorDescription="Geomagnetic field strength around the device."
            stateField={sensorData.sensor_magnetometer}
            field="sensor_magnetometer"
            modeState="sensor"
          />

          {sensorData.sensor_magnetometer ? (
            SensorMagnetometerSubContent()
          ) : (
            <div />
          )}

          <SensorComponent
            sensorName="Network"
            sensorDescription="Information on the network sensors availability of the device. These include use of airplane mode, Wi-Fi, Bluetooth, GPS, mobile, and WIMAX status as well as internet availability."
            stateField={sensorData.sensor_network}
            field="sensor_network"
            modeState="sensor"
          />

          {sensorData.sensor_network ? SensorNetworkSubContent() : <div />}

          <SensorComponent
            sensorName="Processor"
            sensorDescription="Processor load."
            stateField={sensorData.sensor_processor}
            field="sensor_processor"
            modeState="sensor"
          />

          {sensorData.sensor_processor ? SensorProcessorSubContent() : <div />}

          <SensorComponent
            sensorName="Proximity"
            sensorDescription="Distance to an object in front of the device."
            stateField={sensorData.sensor_proximity}
            field="sensor_proximity"
            modeState="sensor"
          />

          {sensorData.sensor_proximity ? SensorProximitySubContent() : <div />}

          <SensorComponent
            sensorName="Rotation"
            sensorDescription="Orientation of the device as a combination of an angle and an axis."
            stateField={sensorData.sensor_rotation}
            field="sensor_rotation"
            modeState="sensor"
          />

          {sensorData.sensor_rotation ? SensorRotationSubContent() : <div />}

          <SensorComponent
            sensorName="Temperature"
            sensorDescription="Ambient air temperature in Celsius (˚C). Not many devices have this sensor available."
            stateField={sensorData.sensor_temperature}
            field="sensor_temperature"
            modeState="sensor"
          />

          {sensorData.sensor_temperature ? (
            SensorTemperatureSubContent()
          ) : (
            <div />
          )}

          <SensorComponent
            sensorName="Wi-Fi"
            sensorDescription="The device’s Wi-Fi sensor, current AP, and surrounding Wi-Fi visible devices with respective RSSI dB values."
            stateField={sensorData.sensor_wifi}
            field="sensor_wifi"
            modeState="sensor"
          />

          {sensorData.sensor_wifi ? SensorWifiSubContent() : <div />}
        </div>

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
                  navigateTo("/study/questions");
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
                  console.log(sensorData);
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
