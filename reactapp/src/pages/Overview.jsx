import "./Overview.css";
import {
  Alert,
  AlertTitle,
  Button,
  Divider,
  ThemeProvider,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Unstable_Grid2";
import React, { useEffect, useState } from "react";
import { useRecoilValue, useRecoilState } from "recoil";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
// eslint-disable-next-line import/no-extraneous-dependencies
import customisedTheme from "../functions/theme";
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
import {
  RANDOM_TRIGGERS,
  REPEAT_INTERVALS,
  SET_SCHEDULES,
} from "../components/ScheduleComponent/ScheduleComponent";
import Axios from "../functions/axiosSettings";

const TYPE_MAP = {
  1: "Free Text",
  2: "Single Choice(Radio)",
  3: "Multiple Choice(Checkbox)",
  4: "Likert Scale",
  5: "Quick Answer",
  6: "Scale",
  7: "Numeric",
};

export default function Main() {
  const navigateTo = useNavigate();

  const isDbConnected = useRecoilValue(databaseConnectionState);
  const studyInformation = useRecoilValue(studyFormStudyInformationState);
  const databaseInfo = useRecoilValue(databaseInformationState);
  const questions = useRecoilValue(studyFormQuestionsState);
  const schedules = useRecoilValue(studyFormScheduleConfigurationState);
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
  const studyId = useRecoilValue(studyIdState);
  const createTime = useRecoilValue(createTimeState);
  const [result, setResult] = useState({});
  const date = new Date().toJSON();
  const screenshotData = useRecoilValue(screenshotSensorState);

  const checkStudyInformationValidation = () => {
    return (
      studyInformation.study_title &&
      studyInformation.study_description &&
      studyInformation.researcher_first &&
      studyInformation.researcher_last &&
      studyInformation.researcher_contact &&
      databaseInfo.database_host &&
      databaseInfo.database_port &&
      databaseInfo.database_name &&
      databaseInfo.database_username &&
      databaseInfo.database_password &&
      isDbConnected
    );
  };

  const checkQuestionValidation = () => {
    for (let i = 0; i < questions.length; i += 1) {
      const each = questions[i];
      if (!each.esm_type || !each.esm_title) {
        return false;
      }
    }
    return true;
  };

  const checkScheduleValidation = () => {
    for (let i = 0; i < schedules.length; i += 1) {
      const each = schedules[i];
      if (!each.questions || !each.title) {
        return false;
      }

      let flag = false;
      // eslint-disable-next-line no-restricted-syntax
      for (const key in each.questions) {
        if (each.questions[key] === true) {
          flag = true;
          break;
        }
      }
      if (!flag) {
        return false;
      }
    }
    return true;
  };

  function displayInfo(instruction, content) {
    return (
      <Grid container rowSpacing={1} ml="10%" mt="3%" mb="3%">
        <Grid width="50%">
          <div>{instruction}</div>
        </Grid>
        <Grid width="50%">
          <div>{content}</div>
        </Grid>
      </Grid>
    );
  }

  // eslint-disable-next-line consistent-return
  function displaySensors(sensor, sensorName) {
    if (sensor in sensorData) {
      console.log(sensor);
      return (
        <Grid width="100%" ml="10%" mt="3%">
          <div>{sensorName}</div>
        </Grid>
      );
    }
    return <div />;
  }

  const questionList = questions.map((question, idx) => {
    return (
      <div>
        {displayInfo(`Question ${(idx + 1).toString()}`, question.esm_title)}
        {displayInfo("Instructions", question.instructions)}
        {displayInfo("Question type", TYPE_MAP[question.esm_type])}

        <Divider
          style={{ background: "main" }}
          // component="li"
          variant="middle"
          sx={{ marginBottom: "3%" }}
        />
      </div>
    );
  });

  const scheduleList = schedules.map((schedule, idx) => {
    return (
      <div>
        {/* {displayInfo(`Schedule ${(idx + 1).toString()}`, schedule.title)} */}
        {/* {displayInfo(`Questions`, Object.keys(schedule.questions).join(", "))} */}

        {schedule ? (
          displayInfo(`Schedule ${(idx + 1).toString()}`, schedule.title)
        ) : (
          <div />
        )}
        {/* {console.log(schedule.questions)} */}
        {schedule.questions ? (
          displayInfo(`Questions`, Object.keys(schedule.questions).join(", "))
        ) : (
          <div />
        )}
        <Divider
          style={{ background: "main" }}
          // component="li"
          variant="middle"
          sx={{ marginBottom: "3%" }}
        />
      </div>
    );
  });

  useEffect(() => {
    const newResult = {
      _id: studyId,
      study_info: studyInformation,
      database: {
        ...databaseInfo,
        database_password:
          "config_without_password" in databaseInfo &&
          databaseInfo.config_without_password
            ? "-"
            : databaseInfo.database_password,
        config_without_password: !!(
          "config_without_password" in databaseInfo &&
          databaseInfo.config_without_password
        ),
        require_ssl: !!(
          "require_ssl" in databaseInfo && databaseInfo.require_ssl
        ),
        rootUsername: "-",
        rootPassword: "-",
      },
      createdAt: createTime,
      updatedAt: date,
      questions: [...questions].map((question, idx) => {
        return { ...question, id: idx + 1 };
      }),
      schedules: [...schedules].map((schedule) => {
        const newSchedule = {};
        newSchedule.title = schedule.title;
        newSchedule.type = schedule.type;
        newSchedule.esm_kepp = schedule.esm_keep ? schedule.esm_keep : false;
        newSchedule.questions = [];
        for (const key in schedule.questions) {
          const isSelected = schedule.questions[key];
          for (let i = 0; i < questions.length; i += 1) {
            if (key === questions[i].esm_title && isSelected) {
              newSchedule.questions.push(i + 1);
            }
          }
        }

        if (schedule.type === SET_SCHEDULES) {
          newSchedule.hours = [];
          for (const key in schedule.hours) {
            const val = schedule.hours[key];
            // console.log(key);
            if (val === true) {
              newSchedule.hours.push(parseInt(key.slice(0, 2), 10));
            }
          }
          newSchedule.days = [];
          for (const key in schedule.days) {
            const val = schedule.days[key];
            if (val === true) {
              newSchedule.days.push(key.toLowerCase());
            }
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
      }),
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
          value: sensorData.offload_frequency
            ? sensorData.offload_frequency
            : 60,
        },
        {
          setting: "frequency_clean_old_data",
          value: sensorData.clean_data_freq ? sensorData.clean_data_freq : 0,
        },
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
          setting: "mask_notification",
          value: applicationSensor.mask_notification
            ? applicationSensor.mask_notification
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
        {
          setting: "status_screentext",
          value: applicationSensor.status_screentext
            ? applicationSensor.status_screentext
            : false,
        },
        {
          setting: "package_specification",
          value: applicationSensor.package_specification
            ? applicationSensor.package_specification
            : "2",
        },
        {
          setting: "package_names",
          value: applicationSensor.package_names
            ? applicationSensor.package_names
            : "",
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
          value: screenData.sensor_touch ? screenData.sensor_touch : false,
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
        // screenshot
        {
          setting: "status_screenshot",
          value: sensorData.sensor_screenshot
            ? sensorData.sensor_screenshot
            : false,
        },
        {
          setting: "capture_time_interval",
          value: screenshotData.capture_time_interval
            ? screenshotData.capture_time_interval
            : 5,
        },
        {
          setting: "compress_rate",
          value: screenshotData.compress_rate
            ? screenshotData.compress_rate
            : 20,
        },
        {
          setting: "status_screenshot_local_storage",
          value: screenshotData.status_screenshot_local_storage
            ? screenshotData.status_screenshot_local_storage
            : false,
        },
        {
          setting: "screenshot_package_names",
          value: applicationSensor.screenshot_package_names
            ? applicationSensor.screenshot_package_names
            : "",
        },
        {
          setting: "screenshot_package_specification",
          value: applicationSensor.screenshot_package_specification
            ? applicationSensor.screenshot_package_specification
            : "2",
        },

        // default sensors
        { setting: "status_esm", value: true },
        { setting: "status_webservice", value: true },
      ],
    };
    setResult(newResult);
  }, []);

  const [open, setOpen] = React.useState(false);

  const validationOn = () => {
    setOpen(true);
  };

  const validationClose = () => {
    setOpen(false);
    // eslint-disable-next-line no-use-before-define
    setBlankFields((oldArray) => []);
  };

  const [blankFields, setBlankFields] = React.useState([]);

  const updateBlankFields = (name) => {
    setBlankFields((oldArray) => [...oldArray, name]);
  };

  const [validation, setValidation] = React.useState(true);

  // const validate = (fieldName, value) => {
  //   setValidation({
  //     ...validation,
  //     [fieldName]: value,
  //   });
  // };
  const validate = (value) => {
    setValidation(value);
  };

  // eslint-disable-next-line react/no-unstable-nested-components
  function AlertDialog() {
    // console.log(blankFields);
    return (
      <div>
        <Dialog
          open={open}
          onClose={validationClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            Required fields are left blank.
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              The following pages need to be rechecked:{"\n"}
              {/* {blankFields} */}
              {blankFields.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={validationClose} autoFocus>
              Okay
            </Button>
            {/* <Button autoFocus>Okay</Button> */}
          </DialogActions>
        </Dialog>
      </div>
    );
  }

  function saveJsonFile() {
    Axios({
      method: "post",
      url: "save_json_file/",
      data: {
        text: JSON.stringify({
          ...result,
          database: null,
          study_info: {
            study_title: result.study_info.study_title,
            study_description: result.study_info.study_description,
          },
        }),
      },
    });
  }

  function generateJSON() {
    const jsonText = JSON.stringify(result, null, 2);
    // console.log(jsonText);

    const blob = new Blob([jsonText]);
    const href = URL.createObjectURL(blob);

    // create "a" HTLM element with href to file
    const link = document.createElement("a");
    link.href = href;
    link.download = `studyConfig.json`;
    document.body.appendChild(link);
    link.click();

    // clean up "a" element & remove ObjectURL
    document.body.removeChild(link);
    URL.revokeObjectURL(href);
  }

  function downloadNotify() {
    const x = document.getElementById("snackbar");

    // Add the "show" class to DIV
    x.className = "show";
    // After 3 seconds, remove the show class from DIV
    setTimeout(function () {
      x.className = x.className.replace("show", "");
    }, 3000);
  }

  return (
    <ThemeProvider theme={customisedTheme}>
      <div>
        <div className="main_vertical_layout">
          <div className="border">
            <Grid width={250} ml={5} mt={3}>
              <p className="title">Study Information</p>
            </Grid>

            {displayInfo(`Study title`, studyInformation.study_title)}
            {displayInfo(
              `Study description`,
              studyInformation.study_description
            )}

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

            {questionList}

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
            {/* {scheduleList} */}
            {schedules ? scheduleList : <div />}

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

            {displaySensors("sensor_application", "Application")}
            {displaySensors("sensor_battery", "Battery")}
            {displaySensors("sensor_communication", "Communication")}
            {displaySensors("sensor_processor", "Processor")}
            {displaySensors("sensor_installation", "Installation")}
            {displaySensors("sensor_screen", "Screen")}
            {displaySensors("sensor_screenshot", "Screenshot")}
            {displaySensors("sensor_telephony", "Telephony")}
            {displaySensors("sensor_timezone", "Timezone")}

            {displaySensors("sensor_accelerometer", "Accelerometer")}
            {displaySensors("sensor_barometer", "Barometer")}
            {displaySensors("sensor_bluetooth", "Bluetooth")}
            {displaySensors("sensor_gravity", "Gravity")}
            {displaySensors("sensor_gyroscope", "Gyroscope")}
            {displaySensors("sensor_light", "Light")}
            {displaySensors(
              "sensor_linear_accelerometer",
              "Linear accelerometer"
            )}
            {displaySensors("sensor_locations", "Locations")}
            {displaySensors("sensor_network", "Network")}
            {displaySensors("sensor_processor", "Processor")}
            {displaySensors("sensor_proximity", "Proximity")}
            {displaySensors("sensor_rotation", "Rotation")}
            {displaySensors("sensor_temperature", "Temperature")}
            {displaySensors("sensor_sensor_wifi", "Wifi")}

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
              <Grid>
                <p style={{ color: "#FF0000", fontWeight: "bold" }}>Note:</p>
                <p style={{ color: "#FF0000" }}>
                  So that we can compile statistics on what sensors and other
                  configuration settings people are using, we will be storing
                  the details of your configuration file anonymously minus your
                  database credentials once you click the button below to
                  generate the configuration file.
                </p>
              </Grid>
              <Grid xs="auto">
                <Button
                  color="main"
                  variant="contained"
                  onClick={() => {
                    console.log(databaseInfo);
                    validationOn();

                    const validility =
                      checkStudyInformationValidation() &&
                      checkQuestionValidation() &&
                      checkScheduleValidation();

                    validate(validility);

                    if (!checkStudyInformationValidation()) {
                      updateBlankFields("Study information page");
                    }
                    if (!checkQuestionValidation()) {
                      updateBlankFields("Question page");
                    }
                    if (!checkScheduleValidation()) {
                      updateBlankFields("Schedule page");
                    }

                    if (validility) {
                      generateJSON();
                      downloadNotify();
                      saveJsonFile();
                    }
                  }}
                >
                  DOWNLOAD STUDY CONFIG
                </Button>
                {console.log(isDbConnected)}
                {console.log(checkStudyInformationValidation())}
                {!validation ? AlertDialog() : <div />}
                <div id="snackbar">Downloading JSON file...</div>
              </Grid>
            </Grid>
          </Box>
        </div>
      </div>
    </ThemeProvider>
  );
}
