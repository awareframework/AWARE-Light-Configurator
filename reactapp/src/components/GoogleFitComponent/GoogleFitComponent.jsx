import React from "react";
import "./GoogleFitComponent.css";
import { useRecoilState } from "recoil";
import Grid from "@mui/material/Unstable_Grid2";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { GoogleFitDataState } from "../../functions/atom";

export default function GoogleFitComponent(inputs) {
  const [googleFitData, setGoogleFitData] = useRecoilState(GoogleFitDataState);
  const updateGoogleFitData = (fieldName, value) => {
    setGoogleFitData({
      ...googleFitData,
      [fieldName]: value,
    });
  };

  const { name, description, stateField, field, modeState } = inputs;

  return (
    <div className="google_fit_vertical_layout">
      <Grid>
        <FormControlLabel
          control={
            <Checkbox
              checked={stateField || false}
              onChange={(_, checked) => {
                updateGoogleFitData(field.toString(), checked);
                console.log(stateField, modeState);
              }}
            />
          }
          label={name}
        />
      </Grid>
      <Grid>
        <p className="explanation">{description}</p>
      </Grid>
    </div>
  );
}
