import "./Upload.css";
import { Button, Divider, ThemeProvider } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import React, { useState } from "react";
// import { DropzoneArea } from "mui-file-dropzone";
import PageHeader from "../components/PageHeader/PageHeader";
import {
  accelerometerState,
  applicationSensorState,
  barometerState,
  bluetoothState,
  communicationSensorState,
  createTimeState,
  databaseConnectionState,
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
  studyFormQuestionsState,
  studyFormScheduleConfigurationState,
  studyFormStudyInformationState,
  studyIdState,
  temperatureState,
  timezoneState,
  wifiState,
  screenshotSensorState,
} from "../functions/atom";
import customisedTheme from "../functions/theme";
import Axios from "../functions/axiosSettings";
import {
  RANDOM_TRIGGERS,
  REPEAT_INTERVALS,
  SET_SCHEDULES,
} from "../components/ScheduleComponent/ScheduleComponent";
import { padding } from "../functions/utils";

export default function Upload() {
  // initialize csrf token
  Axios({
    method: "get",
    url: "get_token/",
  });

  const navigateTo = useNavigate();

  const setStudyId = useSetRecoilState(studyIdState);
  const setCreateTime = useSetRecoilState(createTimeState);
  const setStudyInformation = useSetRecoilState(studyFormStudyInformationState);
  const setDatabaseInfo = useSetRecoilState(databaseInformationState);
  const setQuestions = useSetRecoilState(studyFormQuestionsState);
  const setSchedules = useSetRecoilState(studyFormScheduleConfigurationState);
  const setSensorData = useSetRecoilState(sensorDataState);
  const setApplicationSensor = useSetRecoilState(applicationSensorState);
  const setScreenData = useSetRecoilState(screenSensorState);
  const setAccelerometerData = useSetRecoilState(accelerometerState);
  const setBarometerData = useSetRecoilState(barometerState);
  const setBluetoothData = useSetRecoilState(bluetoothState);
  const setGravityData = useSetRecoilState(gravityState);
  const setGyroscopeData = useSetRecoilState(gyroscopeState);
  const setLightData = useSetRecoilState(lightState);
  const setLinearAccelerometerData = useSetRecoilState(
    linearAccelerometerState
  );
  const setLocationsData = useSetRecoilState(locationsState);
  const setMagnetometerData = useSetRecoilState(magnetometerState);
  const setNetworkData = useSetRecoilState(networkState);
  const setProximityData = useSetRecoilState(proximityState);
  const setTemperatureData = useSetRecoilState(temperatureState);
  const setRotationData = useSetRecoilState(rotationState);
  const setWifiData = useSetRecoilState(wifiState);
  const setTimezoneData = useSetRecoilState(timezoneState);
  const setCommunicationData = useSetRecoilState(communicationSensorState);
  const setScreenshotData = useSetRecoilState(screenshotSensorState);
  const getData = (file) => {
    fetch(file, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then(function (response) {
        console.log(response);
        return response.json();
      })
      .then(function (myJson) {
        console.log(myJson);
      });
  };

  const [jsonObject, setJsonObject] = useState("");
  const readJsonObject = (strValue) => {
    const jsonValue = JSON.parse(strValue);

    // read _id
    // eslint-disable-next-line no-underscore-dangle
    setStudyId(jsonValue._id);

    // study information part
    setStudyInformation(jsonValue.study_info);
    setDatabaseInfo(jsonValue.database);
    setCreateTime(jsonValue.createdAt);

    // questions part
    setQuestions(
      jsonValue.questions.map((question) => {
        // eslint-disable-next-line no-param-reassign
        const newQuestion = { ...question };
        delete newQuestion.id;
        console.log(newQuestion);
        return question;
      })
    );

    // schedules part
    setSchedules(
      jsonValue.schedules.map((schedule) => {
        const newSchedule = {};
        newSchedule.title = schedule.title;
        newSchedule.type = schedule.type;
        newSchedule.questions = {};
        for (let i = 0; i < jsonValue.questions.length; i += 1) {
          const question = jsonValue.questions[i];
          const qId = question.id;
          for (let j = 0; j < schedule.questions.length; j += 1) {
            const selectedId = schedule.questions[j];
            if (qId === selectedId) {
              newSchedule.questions[question.esm_title] = true;
            }
          }
        }

        if (schedule.type === SET_SCHEDULES) {
          newSchedule.hours = {};
          for (let i = 0; i < schedule.hours.length; i += 1) {
            const hour = schedule.hours[i];
            newSchedule.hours[`${padding(hour, 2)}:00`] = true;
          }

          newSchedule.days = {};
          for (let i = 0; i < schedule.days.length; i += 1) {
            const day = schedule.days[i];
            console.log(day);
            newSchedule.days[
              day.slice(0, 1).toUpperCase() + day.slice(1).toLowerCase()
            ] = true;
          }
        }

        if (schedule.type === RANDOM_TRIGGERS) {
          newSchedule.firsthour = schedule.firsthour;
          newSchedule.lasthour = schedule.lasthour;
          newSchedule.randomCount = schedule.randomCount;
          newSchedule.randomInterval = schedule.randomInterval;
        }

        if (schedule.type === REPEAT_INTERVALS) {
          newSchedule.repeatInterval = schedule.repeatInterval;
        }

        return newSchedule;
      })
    );

    // sensor information part
    const sensorData = {};
    const applicationSensor = {};
    const screenData = {};
    const accelerometerData = {};
    const barometerData = {};
    const bluetoothData = {};
    const gravityData = {};
    const gyroscopeData = {};
    const lightData = {};
    const linearAccelerometerData = {};
    const locationsData = {};
    const magnetometerData = {};
    const networkData = {};
    const proximityData = {};
    const temperatureData = {};
    const rotationData = {};
    const wifiData = {};
    const timezoneData = {};
    const communicationData = {};
    const screenshotData = {};

    for (let i = 0; i < jsonValue.sensors.length; i += 1) {
      const { setting, value } = jsonValue.sensors[i];
      switch (setting) {
        case "webservice_wifi_only":
          sensorData.wifi_only = value;
          break;
        case "webservice_charging":
          sensorData.charging_only = value;
          break;
        case "frequency_webservice":
          sensorData.offload_frequency = value;
          break;
        case "frequency_clean_old_data":
          sensorData.clean_data_freq = value;
          break;
        case "webservice_silent":
          sensorData.no_sync_notify = value;
          break;
        case "fallback_network":
          sensorData.fallback_network = value;
          break;
        case "remind_to_charge":
          sensorData.charge_reminder = value;
          break;
        case "foreground_priority":
          sensorData.foreground_priority = value;
          break;
        case "debug_flag":
          sensorData.debug_flag = value;
          break;
        case "frequency_sync_config":
          sensorData.config_update_freq = value;
          break;
        case "enable_config_update":
          sensorData.setting_update = value;
          break;
        case "status_applications":
          sensorData.sensor_application = value;
          break;
        case "status_notifications":
          applicationSensor.notifications = value;
          break;
        case "status_crashes":
          applicationSensor.crashes = value;
          break;
        case "frequency_applications":
          applicationSensor.frequency_applications = value;
          break;
        case "status_keyboard":
          applicationSensor.keyboard = value;
          break;
        case "mask_keyboard":
          applicationSensor.mask_keyboard = value;
          break;
        case "mask_notification":
          applicationSensor.mask_notification = value;
          break;
        case "mask_touch_text":
          applicationSensor.mask_touch_text = value;
          break;
        case "status_screentext":
          applicationSensor.status_screentext = value;
          break;
        case "package_specification":
          applicationSensor.package_specification = value;
          break;
        case "package_names":
          applicationSensor.package_names = value;
          break;
        case "status_battery":
          sensorData.sensor_battery = value;
          break;
        case "communication":
          sensorData.sensor_communication = value;
          break;
        case "status_communication_events":
          communicationData.events = value;
          break;
        case "status_calls":
          communicationData.calls = value;
          break;
        case "status_messages":
          communicationData.messages = value;
          break;
        case "status_installations":
          sensorData.sensor_installation = value;
          break;
        case "status_screen":
          sensorData.sensor_screen = value;
          break;
        case "status_touch":
          screenData.touch = value;
          break;
        case "status_telephony":
          sensorData.sensor_telephony = value;
          break;
        case "status_timezone":
          sensorData.sensor_timezone = value;
          break;
        case "frequency_timezone":
          timezoneData.frequency_timezone = value;
          break;
        case "status_accelerometer":
          sensorData.sensor_accelerometer = value;
          break;
        case "frequency_accelerometer":
          accelerometerData.frequency_sample_accelerometer = value;
          break;
        case "threshold_accelerometer":
          accelerometerData.threshold = value;
          break;
        case "frequency_accelerometer_enforce":
          accelerometerData.enforce = value;
          break;
        case "status_barometer":
          sensorData.sensor_barometer = value;
          break;
        case "frequency_barometer":
          barometerData.frequency_sample_barometer = value;
          break;
        case "threshold_barometer":
          barometerData.threshold = value;
          break;
        case "frequency_barometer_enforce":
          barometerData.enforce = value;
          break;
        case "status_bluetooth":
          sensorData.sensor_bluetooth = value;
          break;
        case "frequency_bluetooth":
          bluetoothData.frequency_bluetooth = value;
          break;
        case "status_gravity":
          sensorData.sensor_gravity = value;
          break;
        case "frequency_gravity":
          gravityData.frequency_gravity = value;
          break;
        case "threshold_gravity":
          gravityData.threshold = value;
          break;
        case "frequency_gravity_enforce":
          gravityData.enforce = value;
          break;
        case "status_gyroscope":
          sensorData.sensor_gyroscope = value;
          break;
        case "frequency_gyroscope":
          gyroscopeData.frequency_gyroscope = value;
          break;
        case "threshold_gyroscope":
          gyroscopeData.threshold = value;
          break;
        case "frequency_gyroscope_enforce":
          gyroscopeData.enforce = value;
          break;
        case "status_light":
          sensorData.sensor_light = value;
          break;
        case "frequency_light":
          lightData.frequency_light = value;
          break;
        case "threshold_light":
          lightData.threshold = value;
          break;
        case "frequency_light_enforce":
          lightData.enforce = value;
          break;
        case "status_linear_accelerometer":
          sensorData.sensor_linear_accelerometer = value;
          break;
        case "frequency_linear_accelerometer":
          linearAccelerometerData.frequency_linear_accelerometer = value;
          break;
        case "threshold_linear_accelerometer":
          linearAccelerometerData.threshold = value;
          break;
        case "frequency_linear_accelerometer_enforce":
          linearAccelerometerData.enforce = value;
          break;
        case "location":
          sensorData.sensor_locations = value;
          break;
        case "status_location_gps":
          locationsData.gps = value;
          break;
        case "status_location_network":
          locationsData.network = value;
          break;
        case "frequency_gps":
          locationsData.frequency_gps = value;
          break;
        case "frequency_network":
          locationsData.frequency_network = value;
          break;
        case "min_location_gps_accuracy":
          locationsData.min_gps_freq = value;
          break;
        case "min_location_network_accuracy":
          locationsData.min_network_freq = value;
          break;
        case "location_expiration_time":
          locationsData.expiration = value;
          break;
        case "status_location_passive":
          locationsData.passive = value;
          break;
        case "location_save_all":
          locationsData.save_all = value;
          break;
        case "status_magnetometer":
          sensorData.sensor_magnetometer = value;
          break;
        case "frequency_magnetometer":
          magnetometerData.frequency_magnetometer = value;
          break;
        case "threshold_magnetometer":
          magnetometerData.threshold_magnetometer = value;
          break;
        case "frequency_magnetometer_enforce":
          magnetometerData.frequency_magnetometer_enforce = value;
          break;
        case "network":
          sensorData.sensor_network = value;
          break;
        case "status_network_events":
          networkData.events = value;
          break;
        case "status_network_traffic":
          networkData.traffic = value;
          break;
        case "status_processor":
          sensorData.sensor_processor = value;
          break;
        case "status_proximity":
          sensorData.sensor_proximity = value;
          break;
        case "frequency_proximity":
          proximityData.frequency_proximity = value;
          break;
        case "threshold_proximity":
          proximityData.threshold = value;
          break;
        case "frequency_proximity_enforce":
          proximityData.enforce = value;
          break;
        case "status_rotation":
          sensorData.sensor_rotation = value;
          break;
        case "frequency_rotation":
          rotationData.frequency_rotation = value;
          break;
        case "threshold_rotation":
          rotationData.threshold = value;
          break;
        case "frequency_rotation_enforce":
          rotationData.enforce = value;
          break;
        case "status_temperature":
          sensorData.sensor_temperature = value;
          break;
        case "frequency_temperature":
          temperatureData.frequency_temperature = value;
          break;
        case "threshold_temperature":
          temperatureData.threshold = value;
          break;
        case "frequency_temperature_enforce":
          temperatureData.enforce = value;
          break;
        case "status_wifi":
          sensorData.sensor_wifi = value;
          break;
        case "frequency_wifi":
          wifiData.frequency_wifi = value;
          break;
        case "status_esm":
          // default value
          break;
        case "status_webservice":
          // default value
          break;
        case "status_screenshot":
          sensorData.sensor_screenshot = value;
          break;
        case "capture_time_interval":
          screenshotData.capture_time_interval = value;
          break;
        case "compress_rate":
          screenshotData.compress_rate = value;
          break;
        case "status_screenshot_local_storage":
          screenshotData.status_screenshot_local_storage = value;
          break;
        case "screenshot_package_names":
          screenshotData.screenshot_package_names = value;
          break;
        case "screenshot_package_specification":
          screenshotData.screenshot_package_specification = value;
          break;

        default:
      }
    }
    setSensorData(sensorData);
    setApplicationSensor(applicationSensor);
    setScreenData(screenData);
    setAccelerometerData(accelerometerData);
    setBarometerData(barometerData);
    setBluetoothData(bluetoothData);
    setGravityData(gravityData);
    setGyroscopeData(gyroscopeData);
    setLightData(lightData);
    setLinearAccelerometerData(linearAccelerometerData);
    setLocationsData(locationsData);
    setMagnetometerData(magnetometerData);
    setNetworkData(networkData);
    setProximityData(proximityData);
    setTemperatureData(temperatureData);
    setRotationData(rotationData);
    setWifiData(wifiData);
    setTimezoneData(timezoneData);
    setCommunicationData(communicationData);
    setScreenshotData(screenshotData);
    navigateTo("/study/study_information");
  };
  function readInputFile(file) {
    const fileReader = new FileReader();
    fileReader.readAsText(file.target.files[0], "UTF-8");
    fileReader.onload = (e) => {
      readJsonObject(e.target.result);
    };
  }

  return (
    <div>
      <PageHeader />
      <div className="main_vertical_layout">
        <p className="main_title">Upload study configuration file to EDIT</p>
        <p className="main_description">
          Please upload your study configuration file if you already have one
          and would like to make some changes.
        </p>
        <Button variant="contained" component="label">
          Upload File
          <input
            type="file"
            hidden
            onChange={(event) => {
              readInputFile(event);
            }}
            accept=".json"
          />
        </Button>

        <Button
          onClick={() => {
            navigateTo("/main");
          }}
        >
          Back to main page
        </Button>
      </div>
    </div>
  );
}
