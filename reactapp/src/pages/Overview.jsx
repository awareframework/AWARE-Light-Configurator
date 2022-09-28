import "./Overview.css";
import { Alert, AlertTitle, Button, ThemeProvider } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Unstable_Grid2";
import React from "react";
import { useRecoilValue, useRecoilState } from "recoil";
import Box from "@mui/material/Box";
import {
  accelerometerState,
  applicationSensorState,
  barometerState,
  bluetoothState,
  communicationSensorState,
  // eslint-disable-next-line import/named
  databaseInformationState,
  gravityState,
  gyroscopeState,
  lightState,
  linearAccelerometerState,
  locationsState,
  magnetometerState,
  networkState,
  proximityState,
  rotationState,
  screenSensorState,
  sensorDataState,
  studyFormStudyInformationState,
  temperatureState,
  timezoneState,
  wifiState,
} from "../functions/atom";
import customisedTheme from "../functions/theme";

export default function Main() {
  const navigateTo = useNavigate();

  const studyInformation = useRecoilValue(studyFormStudyInformationState);
  const databaseInfo = useRecoilValue(databaseInformationState);
  const sensorData = useRecoilValue(sensorDataState);
  const applicationSensor = useRecoilValue(applicationSensorState);
  const screenData = useRecoilValue(screenSensorState);
  const accelerometerData = useRecoilValue(accelerometerState);
  const barometerData = useRecoilValue(barometerState);
  const bluetoothData = useRecoilValue(bluetoothState);
  const gravityData = useRecoilValue(gravityState);
  const gyroscopeData = useRecoilValue(gyroscopeState);
  const lightData = useRecoilValue(lightState);
  const linearAccelerometerData = useRecoilValue(linearAccelerometerState);
  const locationsData = useRecoilValue(locationsState);
  const magnetometerData = useRecoilValue(magnetometerState);
  const networkData = useRecoilValue(networkState);
  const proximityData = useRecoilValue(proximityState);
  const temperatureData = useRecoilValue(temperatureState);
  const rotationData = useRecoilValue(rotationState);
  const wifiData = useRecoilValue(wifiState);
  const timezoneData = useRecoilValue(timezoneState);
  const communicationData = useRecoilValue(communicationSensorState);

  function generateJSON() {
    const result = {
      id_: "asdf",
      study_info: studyInformation,
      database: databaseInfo,
      createdAt: "time1",
      updatedAt: "time2",
      questions: "",
      schedules: "",
      sensors: [
        {
          setting: "webservice_wifi_only",
          value: sensorData.wifi_only ? sensorData.wifi_only : false,
        },
        {
          setting: "webservice_charging",
          value: sensorData.charging_only ? sensorData.charging_only : false,
        },
        {
          setting: "frequency_webservice",
          value: sensorData.offload_frequency,
        },
        { setting: "frequency_clean_old_data", value: true },
        {
          setting: "webservice_silent",
          value: sensorData.no_sync_notify ? sensorData.no_sync_notify : false,
        },
        {
          setting: "fallback_network",
          value: sensorData.fallback_network ? sensorData.fallback_network : 30,
        },
        {
          setting: "remind_to_charge",
          value: sensorData.charge_reminder
            ? sensorData.charge_reminder
            : false,
        },
        {
          setting: "foreground_priority",
          value: sensorData.foreground_priority
            ? sensorData.foreground_priority
            : false,
        },
        {
          setting: "debug_flag",
          value: sensorData.debug_flag ? sensorData.debug_flag : false,
        },
        {
          setting: "frequency_sync_config",
          value: sensorData.config_update_freq
            ? sensorData.config_update_freq
            : 60,
        },
        {
          setting: "enable_config_update",
          value: sensorData.setting_update ? sensorData.setting_update : false,
        },

        // application
        {
          setting: "status_applications",
          value: sensorData.sensor_application
            ? sensorData.sensor_application
            : false,
        },
        {
          setting: "status_notifications",
          value: applicationSensor.notifications
            ? applicationSensor.notifications
            : false,
        },
        {
          setting: "status_crashes",
          value: applicationSensor.crashes ? applicationSensor.crashes : false,
        },
        {
          setting: "frequency_applications",
          value: applicationSensor.frequency_applications
            ? applicationSensor.frequency_applications
            : 30,
        },
        {
          setting: "status_keyboard",
          value: applicationSensor.keyboard
            ? applicationSensor.keyboard
            : false,
        },
        {
          setting: "mask_keyboard",
          value: applicationSensor.mask_keyboard
            ? applicationSensor.mask_keyboard
            : false,
        },
        {
          setting: "mask_touch_text",
          value: applicationSensor.mask_touch_text
            ? applicationSensor.mask_touch_text
            : false,
        },

        // battery
        {
          setting: "status_battery",
          value: sensorData.sensor_battery ? sensorData.sensor_battery : false,
        },

        // communication
        {
          setting: "communication",
          value: sensorData.sensor_communication
            ? sensorData.sensor_communication
            : false,
        },

        {
          setting: "status_communication_events",
          value: communicationData.events ? communicationData.events : false,
        },
        {
          setting: "status_calls",
          value: communicationData.calls ? communicationData.calls : false,
        },
        {
          setting: "status_messages",
          value: communicationData.messages
            ? communicationData.messages
            : false,
        },

        // installation
        {
          setting: "status_installations",
          value: sensorData.sensor_installation
            ? sensorData.sensor_installation
            : false,
        },
        // screen
        {
          setting: "status_screen",
          value: sensorData.sensor_screen ? sensorData.sensor_screen : false,
        },
        {
          setting: "status_touch",
          value: screenData.touch ? screenData.touch : false,
        },

        // telephony
        {
          setting: "status_telephony",
          value: sensorData.sensor_telephony
            ? sensorData.sensor_telephony
            : false,
        },

        // timezone
        {
          setting: "status_timezone",
          value: sensorData.sensor_timezone
            ? sensorData.sensor_timezone
            : false,
        },
        {
          setting: "frequency_timezone",
          value: timezoneData.frequency_timezone
            ? timezoneData.frequency_timezone
            : 20000,
        },

        // accelerometer
        {
          setting: "status_accelerometer",
          value: sensorData.sensor_accelerometer
            ? sensorData.sensor_accelerometer
            : false,
        },
        {
          setting: "frequency_accelerometer",
          value: accelerometerData.frequency_sample_accelerometer
            ? accelerometerData.frequency_sample_accelerometer
            : 20000,
        },
        {
          setting: "threshold_accelerometer",
          value: accelerometerData.threshold ? accelerometerData.threshold : 0,
        },
        {
          setting: "frequency_accelerometer_enforce",
          value: accelerometerData.enforce ? accelerometerData.enforce : false,
        },

        // barometer
        {
          setting: "status_barometer",
          value: sensorData.sensor_barometer
            ? sensorData.sensor_barometer
            : false,
        },
        {
          setting: "frequency_barometer",
          value: barometerData.frequency_sample_barometer
            ? barometerData.frequency_sample_barometer
            : 20000,
        },
        {
          setting: "threshold_barometer",
          value: barometerData.threshold ? barometerData.threshold : 0,
        },
        {
          setting: "frequency_barometer_enforce",
          value: barometerData.enforce ? barometerData.enforce : false,
        },

        // bluetooth
        {
          setting: "status_bluetooth",
          value: sensorData.sensor_bluetooth
            ? sensorData.sensor_bluetooth
            : false,
        },
        {
          setting: "frequency_bluetooth",
          value: bluetoothData.frequency_bluetooth
            ? bluetoothData.frequency_bluetooth
            : 60,
        },

        // gravity
        {
          setting: "status_gravity",
          value: sensorData.sensor_gravity ? sensorData.sensor_gravity : false,
        },
        {
          setting: "frequency_gravity",
          value: gravityData.frequency_gravity
            ? gravityData.frequency_gravity
            : 20000,
        },
        {
          setting: "threshold_gravity",
          value: gravityData.threshold ? gravityData.threshold : 0,
        },
        {
          setting: "frequency_gravity_enforce",
          value: gravityData.enforce ? gravityData.enforce : false,
        },

        // gyroscope
        {
          setting: "status_gyroscope",
          value: sensorData.sensor_gyroscope
            ? sensorData.sensor_gyroscope
            : false,
        },
        {
          setting: "frequency_gyroscope",
          value: gyroscopeData.frequency_gyroscope
            ? gyroscopeData.frequency_gyroscope
            : 20000,
        },
        {
          setting: "threshold_gyroscope",
          value: gyroscopeData.threshold ? gyroscopeData.threshold : 0,
        },
        {
          setting: "frequency_gyroscope_enforce",
          value: gyroscopeData.enforce ? gyroscopeData.enforce : false,
        },

        // light
        {
          setting: "status_light",
          value: sensorData.sensor_light ? sensorData.sensor_light : false,
        },
        {
          setting: "frequency_light",
          value: lightData.frequency_light ? lightData.frequency_light : 20000,
        },
        {
          setting: "threshold_light",
          value: lightData.threshold ? lightData.threshold : 0,
        },
        {
          setting: "frequency_light_enforce",
          value: lightData.enforce ? lightData.enforce : false,
        },

        // linear accelerometer
        {
          setting: "status_linear_accelerometer",
          value: sensorData.sensor_linear_accelerometer
            ? sensorData.sensor_linear_accelerometer
            : false,
        },
        {
          setting: "frequency_linear_accelerometer",
          value: linearAccelerometerData.frequency_linear_accelerometer
            ? linearAccelerometerData.frequency_linear_accelerometer
            : 20000,
        },
        {
          setting: "threshold_linear_accelerometer",
          value: linearAccelerometerData.threshold
            ? linearAccelerometerData.threshold
            : 0,
        },
        {
          setting: "frequency_linear_accelerometer_enforce",
          value: linearAccelerometerData.enforce
            ? linearAccelerometerData.enforce
            : false,
        },

        // location
        {
          setting: "location",
          value: sensorData.sensor_locations
            ? sensorData.sensor_locations
            : false,
        },
        {
          setting: "status_location_gps",
          value: locationsData.gps ? locationsData.gps : false,
        },
        {
          setting: "status_location_network",
          value: locationsData.network ? locationsData.network : false,
        },
        {
          setting: "frequency_gps",
          value: locationsData.frequency_gps
            ? locationsData.frequency_gps
            : 180,
        },
        {
          setting: "frequency_network",
          value: locationsData.frequency_network
            ? locationsData.frequency_network
            : 300,
        },
        {
          setting: "min_location_gps_accuracy",
          value: locationsData.min_gps_freq ? locationsData.min_gps_freq : 150,
        },
        {
          setting: "min_location_network_accuracy",
          value: locationsData.min_network_freq
            ? locationsData.min_network_freq
            : 1500,
        },
        {
          setting: "location_expiration_time",
          value: locationsData.expiration ? locationsData.expiration : 300,
        },
        {
          setting: "status_location_passive",
          value: locationsData.passive ? locationsData.passive : false,
        },
        {
          setting: "location_save_all",
          value: locationsData.save_all ? locationsData.save_all : false,
        },

        // magnetometer
        {
          setting: "status_magnetometer",
          value: sensorData.sensor_magnetometer
            ? sensorData.sensor_magnetometer
            : false,
        },
        {
          setting: "frequency_magnetometer",
          value: magnetometerData.frequency_magnetometer
            ? magnetometerData.frequency_magnetometer
            : 20000,
        },
        {
          setting: "threshold_magnetometer",
          value: magnetometerData.threshold ? magnetometerData.threshold : 0,
        },
        {
          setting: "frequency_magnetometer_enforce",
          value: magnetometerData.enforce ? magnetometerData.enforce : false,
        },

        // network
        {
          setting: "network",
          value: sensorData.sensor_network ? sensorData.sensor_network : false,
        },
        {
          setting: "status_network_events",
          value: networkData.events ? networkData.events : false,
        },
        {
          setting: "status_network_traffic",
          value: networkData.traffic ? networkData.traffic : false,
        },

        // processor
        {
          setting: "status_processor",
          value: sensorData.sensor_processor
            ? sensorData.sensor_processor
            : false,
        },

        // proximity
        {
          setting: "status_proximity",
          value: sensorData.sensor_proximity
            ? sensorData.sensor_proximity
            : false,
        },
        {
          setting: "frequency_proximity",
          value: proximityData.frequency_proximity
            ? proximityData.frequency_proximity
            : 20000,
        },
        {
          setting: "threshold_proximity",
          value: proximityData.threshold ? proximityData.threshold : 0,
        },
        {
          setting: "frequency_proximity_enforce",
          value: proximityData.enforce ? proximityData.enforce : false,
        },

        // rotation
        {
          setting: "status_rotation",
          value: sensorData.sensor_rotation
            ? sensorData.sensor_rotation
            : false,
        },
        {
          setting: "frequency_rotation",
          value: rotationData.frequency_rotation
            ? rotationData.frequency_rotation
            : 20000,
        },
        {
          setting: "threshold_rotation",
          value: rotationData.threshold ? rotationData.threshold : 0,
        },
        {
          setting: "frequency_rotation_enforce",
          value: rotationData.enforce ? rotationData.enforce : false,
        },

        // temperature
        {
          setting: "status_temperature",
          value: sensorData.sensor_temperature
            ? sensorData.sensor_temperature
            : false,
        },
        {
          setting: "frequency_temperature",
          value: temperatureData.frequency_temperature
            ? temperatureData.frequency_temperature
            : 20000,
        },
        {
          setting: "threshold_temperature",
          value: temperatureData.threshold ? temperatureData.threshold : 0,
        },
        {
          setting: "frequency_temperature_enforce",
          value: temperatureData.enforce ? temperatureData.enforce : false,
        },

        // wifi
        {
          setting: "status_wifi",
          value: sensorData.sensor_wifi ? sensorData.sensor_wifi : false,
        },
        {
          setting: "frequency_wifi",
          value: wifiData.frequency_wifi ? wifiData.frequency_wifi : 60,
        },

        // default sensors
        { setting: "status_esm", value: true },
        { setting: "status_webservice", value: true },
      ],
    };

    const jsonText = JSON.stringify(result);
    console.log(jsonText);
    return (
      <Alert severity="success">
        <AlertTitle>Success</AlertTitle>
        This is a success alert — <strong>check it out!</strong>
      </Alert>
    );
  }

  return (
    <ThemeProvider theme={customisedTheme}>
      <div>
        <div className="main_vertical_layout">
          <div className="border">
            <Grid width={250} ml={5} mt={3}>
              <p className="title">Study Information</p>
            </Grid>

            <Grid
              container
              // columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              ml={5}
              mt={1}
            >
              <Grid width={250}>
                <p className="field_name">Study title</p>
              </Grid>

              <Grid width={250}>
                <p className="value">{studyInformation.studyTitle}</p>
              </Grid>
            </Grid>

            <Grid
              container
              // columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              ml={5}
            >
              <Grid width={250}>
                <p className="field_name">Study description</p>
              </Grid>

              <Grid width={250}>
                <p className="value">{studyInformation.description}</p>
              </Grid>
            </Grid>

            <Grid
              container
              justifyContent="flex-end"
              marginBottom={3}
              marginRight={2}
            >
              <Button
                color="main"
                variant="contained"
                onClick={() => {
                  navigateTo("/study/study_information");
                }}
              >
                EDIT STUDY INFORMATION
              </Button>
            </Grid>
          </div>
          <div className="border">
            <Grid width={250} ml={5} mt={3}>
              <p className="title">Questions</p>
            </Grid>

            <Grid
              container
              // columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              ml={5}
              mt={1}
            >
              <Grid width={250}>
                <p className="field_name">Question 1</p>
              </Grid>

              <Grid width={250}>
                <p className="value">question1</p>
              </Grid>
            </Grid>

            <Grid
              container
              // columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              ml={5}
            >
              <Grid width={250}>
                <p className="field_name">Instructions</p>
              </Grid>

              <Grid width={250}>
                <p className="value">instruction</p>
              </Grid>
            </Grid>

            <Grid
              container
              // columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              ml={5}
            >
              <Grid width={250}>
                <p className="field_name">Question type</p>
              </Grid>

              <Grid width={250}>
                <p className="value">question_type</p>
              </Grid>
            </Grid>

            <Grid
              container
              justifyContent="flex-end"
              marginBottom={3}
              marginRight={2}
            >
              <Button
                color="main"
                variant="contained"
                onClick={() => {
                  navigateTo("/study/questions");
                }}
              >
                EDIT QUESTIONS
              </Button>
            </Grid>
          </div>

          <div className="border">
            <Grid width={250} ml={5} mt={3}>
              <p className="title">Schedule configuration</p>
            </Grid>

            <Grid
              container
              // columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              ml={5}
              mt={1}
            >
              <Grid width={250}>
                <p className="field_name">Schedule 1</p>
              </Grid>

              <Grid width={250}>
                <p className="value">schedule1</p>
              </Grid>
            </Grid>

            <Grid
              container
              // columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              ml={5}
            >
              <Grid width={250}>
                <p className="field_name">Questions</p>
              </Grid>

              <Grid width={250}>
                <p className="value">questions</p>
              </Grid>
            </Grid>

            <Grid
              container
              justifyContent="flex-end"
              marginBottom={3}
              marginRight={2}
            >
              <Button
                color="main"
                variant="contained"
                onClick={() => {
                  navigateTo("/study/schedule_configuration");
                }}
              >
                EDIT SCHEDULE CONFIGURATION
              </Button>
            </Grid>
          </div>
          <div className="border">
            <Grid width={250} ml={5} mt={3}>
              <p className="title">Sensor data</p>
            </Grid>

            <Grid
              container
              // columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              ml={5}
              mt={1}
            >
              <Grid width={250}>
                <p className="field_name">Study title</p>
              </Grid>

              <Grid width={250}>
                <p className="value">"Study Information"</p>
              </Grid>
            </Grid>

            <Grid
              container
              // columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              ml={5}
            >
              <Grid width={250}>
                <p className="field_name">Study description</p>
              </Grid>

              <Grid width={250}>
                <p className="value">"Study Information"</p>
              </Grid>
            </Grid>

            <Grid
              container
              justifyContent="flex-end"
              marginBottom={3}
              marginRight={2}
            >
              <Button
                color="main"
                variant="contained"
                onClick={() => {
                  navigateTo("/study/sensor_data");
                }}
              >
                EDIT SENSOR DATA
              </Button>
            </Grid>
          </div>

          <Box sx={{ width: "100%" }} mt={5} marginBottom={5}>
            <Grid
              container
              rowSpacing={1}
              columnSpacing={{ xs: 1, sm: 2, md: 23 }}
            >
              <Grid xs />
              <Grid xs="auto">
                <Button
                  color="main"
                  variant="contained"
                  onClick={() => {
                    generateJSON();
                    // navigateTo("/study/study_information");
                  }}
                >
                  DOWNLOAD STUDY CONFIG
                </Button>
              </Grid>
            </Grid>
          </Box>
        </div>
      </div>
    </ThemeProvider>
  );
}
