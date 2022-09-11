import "./StudyInformation.css";
import React, { useState } from "react";
import Grid from "@mui/material/Unstable_Grid2";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import { Button, ThemeProvider } from "@mui/material";
import { studyFormStudyInformationState } from "../functions/atom";
import InputField from "../components/InputField/InputField";
import Field from "../components/Field/Field";
import customisedTheme from "../functions/theme";
import SensorComponent from "../components/SensorComponent/SensorComponent";

export default function StudyInformation() {
  const [studyInformation, setStudyInformation] = useRecoilState(
    studyFormStudyInformationState
  );
  const navigateTo = useNavigate();

  const updateFormByField = (fieldName, value) => {
    setStudyInformation({
      ...studyInformation,
      [fieldName]: value,
    });
  };

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
            <SensorComponent />
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
            <SensorComponent />
            <SensorComponent />
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
            <SensorComponent />
            <SensorComponent />
          </Box>
        </div>
      </Box>
    </div>
  );
}
