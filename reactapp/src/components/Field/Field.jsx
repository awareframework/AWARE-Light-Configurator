import React from "react";
import "./Field.css";
import { TextField } from "@mui/material";

import { useRecoilState } from "recoil";
import Grid from "@mui/material/Unstable_Grid2";
import { studyFormStudyInformationState } from "../../functions/atom";
import InputField from "../InputField/InputField";

// eslint-disable-next-line camelcase
export default function Field(inputs) {
  const { fieldName, studyInfoField, inputLabel, field } = inputs;

  return (
    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
      <Grid width="30%">
        {/* <p className="field_name">{fieldName}</p> */}
        <p className="field_name">{fieldName}</p>
      </Grid>
      <Grid width="50%">
        <InputField
          studyInfoField={studyInfoField}
          inputLabel={inputLabel}
          field={field}
        />
      </Grid>
    </Grid>
  );
}
