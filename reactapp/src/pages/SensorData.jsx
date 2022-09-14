import "./SensorData.css";
import React, { useState } from "react";
import Grid from "@mui/material/Unstable_Grid2";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import { Button, TextField, ThemeProvider } from "@mui/material";
import {
  applicationSensorState,
  screenSensorState,
  sensorDataState,
} from "../functions/atom";
import InputField from "../components/InputField/InputField";
import Field from "../components/Field/Field";
import customisedTheme from "../functions/theme";
import SensorComponent from "../components/SensorComponent/SensorComponent";
import FrequencyField from "../components/FrequencyField/FrequencyField";

export default function SensorData() {
  const navigateTo = useNavigate();
  const [sensorData, setsensorData] = useRecoilState(sensorDataState);

  // software sensor states
  const [applicationSensor, setapplicationSensor] = useRecoilState(
    applicationSensorState
  );
  const [screenData, setscreenData] = useRecoilState(screenSensorState);

  // eslint-disable-next-line react/no-unstable-nested-components
  function SensorApplicationSubContent() {
    // const {  } = inputs;
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
            sensorName="Mask touch text"
            sensorDescription="Swaps all alphanumeric characters by A, a, and 1"
            stateField={applicationSensor.mask_touch_text}
            field="mask_touch_text"
            modeState="application"
          />
        </Grid>
      </Grid>
    );
  }

  // eslint-disable-next-line react/no-unstable-nested-components
  function SensorScreenSubContent(stateField) {
    return (
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid width="10%" />
        <Grid width="70%">
          <SensorComponent
            sensorName="Touch"
            sensorDescription="Logs clicks, long-clicks and scroll up/down events."
            stateField={screenData.touch}
            field="sensor_touch"
            modeState="screen"
          />
        </Grid>
      </Grid>
    );
  }

  return (
    <div>
      <Box
        sx={{ width: "80%" }}
        boxShadow="1px 2px 9px #000000"
        marginLeft="15%"
      >
        <div className="main_vertical_layout">
          <Box
            sx={{ width: "150%" }}
            marginTop="5%"
            marginBottom="5%"
            marginLeft="-30%"
            marginRight="-30%"
          >
            <p className="title">Sensors data</p>
            <p className="explanation">
              Collect sensor data from the participants' phone during your
              study. Some sensors require specific permissions to be enabled on
              the phone. These are automatically requested when the study is
              joined. Keep in mind that the collection of multiple sensors at
              high frequency can decrease battery life of the phone.
            </p>
          </Box>
        </div>
      </Box>

      <Box
        sx={{ width: "80%" }}
        boxShadow="1px 2px 9px #000000"
        marginLeft="15%"
        marginTop="3%"
      >
        <div className="main_vertical_layout">
          <Box
            sx={{ width: "150%" }}
            marginTop="5%"
            marginBottom="5%"
            marginLeft="-30%"
            marginRight="-30%"
          >
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
              modeState="sensor"
            />

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
              modeState="sensor"
            />

            <SensorComponent
              sensorName="Enable settings update"
              sensorDescription="Allow participants to modify the study config from the mobile."
              stateField={sensorData.setting_update}
              field="setting_update"
              modeState="sensor"
            />
          </Box>
        </div>
      </Box>

      <Box
        sx={{ width: "80%" }}
        boxShadow="1px 2px 9px #000000"
        marginLeft="15%"
        marginTop="3%"
      >
        <div className="main_vertical_layout">
          <Box
            sx={{ width: "150%" }}
            marginTop="5%"
            marginBottom="5%"
            marginLeft="-30%"
            marginRight="-30%"
          >
            <p className="title">Software sensors</p>
            {/* ToDo: Application show options when clicked */}
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
            {/* ToDo: Communication show options when clicked */}
            <SensorComponent
              sensorName="Communication"
              sensorDescription="Communication events such as calls and messages, performed by or received by the user."
              stateField={sensorData.sensor_communication}
              field="sensor_communication"
              modeState="sensor"
            />
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
              sensorName="Telephony"
              sensorDescription="Information on the mobile phone capabilities of the device, connected cell towers, and neighboring towers."
              stateField={sensorData.sensor_telephony}
              field="sensor_telephony"
              modeState="sensor"
            />
            {/* ToDo: Timezone show options when clicked */}
            <SensorComponent
              sensorName="Timezone"
              sensorDescription="Logs user's current timezone."
              stateField={sensorData.sensor_timezone}
              field="sensor_timezone"
              modeState="sensor"
            />
          </Box>
        </div>
      </Box>

      <Box
        sx={{ width: "80%" }}
        boxShadow="1px 2px 9px #000000"
        marginLeft="15%"
        marginTop="3%"
      >
        <div className="main_vertical_layout">
          <Box
            sx={{ width: "150%" }}
            marginTop="5%"
            marginBottom="5%"
            marginLeft="-30%"
            marginRight="-30%"
          >
            <p className="title">Hardware sensors</p>
            <SensorComponent
              sensorName="Accelerometer"
              sensorDescription="Acceleration applied to the device, including the force of gravity."
              stateField={sensorData.sensor_accelerometer}
              field="sensor_accelerometer"
              modeState="sensor"
            />

            <SensorComponent
              sensorName="Barometer"
              sensorDescription="Ambient air pressure."
              stateField={sensorData.sensor_barometer}
              field="sensor_barometer"
              modeState="sensor"
            />

            <SensorComponent
              sensorName="Bluetooth"
              sensorDescription="Smartphone's Bluetooth sensor and surrounding Bluetooth-enabled and visible devices. Includes respective RSSI dB values."
              stateField={sensorData.sensor_bluetooth}
              field="sensor_bluetooth"
              modeState="sensor"
            />

            <SensorComponent
              sensorName="Gravity"
              sensorDescription="Force of gravity applied to the the device, provides a three dimensional vector indicating the direction and magnitude of gravity."
              stateField={sensorData.sensor_gravity}
              field="sensor_gravity"
              modeState="sensor"
            />

            <SensorComponent
              sensorName="Gyroscope"
              sensorDescription="Rate or rotation in rad/s around a device’s x-, y-, and z-axis."
              stateField={sensorData.sensor_gyroscope}
              field="sensor_gyroscope"
              modeState="sensor"
            />

            <SensorComponent
              sensorName="Light"
              sensorDescription="Level of ambient light."
              stateField={sensorData.sensor_light}
              field="sensor_light"
              modeState="sensor"
            />

            <SensorComponent
              sensorName="Linear accelerometer"
              sensorDescription="Acceleration applied to the device, excluding the force of gravity."
              stateField={sensorData.sensor_linear_accelerometer}
              field="sensor_linear_accelerometer"
              modeState="sensor"
            />

            <SensorComponent
              sensorName="Locations"
              sensorDescription="Best location estimate of the users’ current location, based on an algorithm that results in minimum battery impact."
              stateField={sensorData.sensor_locations}
              field="sensor_locations"
              modeState="sensor"
            />

            <SensorComponent
              sensorName="Magnetometer"
              sensorDescription="Geomagnetic field strength around the device."
              stateField={sensorData.sensor_magnetometer}
              field="sensor_magnetometer"
              modeState="sensor"
            />

            <SensorComponent
              sensorName="Network"
              sensorDescription="Information on the network sensors availability of the device. These include use of airplane mode, Wi-Fi, Bluetooth, GPS, mobile, and WIMAX status as well as internet availability."
              stateField={sensorData.network}
              field="network"
              modeState="sensor"
            />

            <SensorComponent
              sensorName="Processor"
              sensorDescription="Processor load."
              stateField={sensorData.sensor_processor}
              field="sensor_processor"
              modeState="sensor"
            />

            <SensorComponent
              sensorName="Proximity"
              sensorDescription="Distance to an object in front of the device."
              stateField={sensorData.sensor_proximity}
              field="sensor_proximity"
              modeState="sensor"
            />

            <SensorComponent
              sensorName="Rotation"
              sensorDescription="Orientation of the device as a combination of an angle and an axis."
              stateField={sensorData.sensor_rotation}
              field="sensor_rotation"
              modeState="sensor"
            />

            <SensorComponent
              sensorName="Temperature"
              sensorDescription="Ambient air temperature in Celsius (˚C). Not many devices have this sensor available."
              stateField={sensorData.sensor_temperature}
              field="sensor_temperature"
              modeState="sensor"
            />

            <SensorComponent
              sensorName="Wi-Fi"
              sensorDescription="The device’s Wi-Fi sensor, current AP, and surrounding Wi-Fi visible devices with respective RSSI dB values."
              stateField={sensorData.sensor_wifi}
              field="sensor_wifi"
              modeState="sensor"
            />
          </Box>
        </div>
      </Box>

      <Box sx={{ width: "80%" }} marginLeft="15%">
        <div className="main_vertical_layout">
          <Box sx={{ width: "100%" }} mt={5} marginBottom={5}>
            <Grid
              container
              rowSpacing={1}
              columnSpacing={{ xs: 1, sm: 2, md: 23 }}
              justifyContent="flex-end"
            >
              <Button
                variant="contained"
                onClick={() => {
                  navigateTo("/study/overview");
                  console.log(applicationSensor);
                  console.log(screenData);
                }}
              >
                NEXT STEP: QUESTIONS
              </Button>
            </Grid>
          </Box>
        </div>
      </Box>
    </div>
  );
}
