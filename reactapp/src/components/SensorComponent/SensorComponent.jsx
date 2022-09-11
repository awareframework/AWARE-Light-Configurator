import React from "react";
import "./SensorComponent.css";
import { TextField } from "@mui/material";

import { useRecoilState } from "recoil";
import Grid from "@mui/material/Unstable_Grid2";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { studyFormStudyInformationState } from "../../functions/atom";
import InputField from "../InputField/InputField";

// eslint-disable-next-line camelcase
export default function SensorComponent(inputs) {
  const { fieldName, studyInfoField, inputLabel, field } = inputs;

  return (
    <div className="sensor_vertical_layout">
      <Grid>
        <FormControlLabel
          control={
            <Checkbox
              // checked={
              //   studyInformation.NoPasswordInJSONFile
              //     ? studyInformation.NoPasswordInJSONFile
              //     : false
              // }
              onChange={(_, checked) => {
                // updateFormByField("NoPasswordInJSONFile", checked);
              }}
            />
          }
          label="This should be a sensor"
        />
      </Grid>
      <Grid>
        <p className="explanation">this should be explanation</p>
      </Grid>
    </div>
  );
}
