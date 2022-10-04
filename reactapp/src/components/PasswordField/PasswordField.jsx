import React, { useEffect, useState } from "react";
import "./PasswordField.css";
import { TextField } from "@mui/material";

import { useRecoilState } from "recoil";
import Grid from "@mui/material/Unstable_Grid2";

export default function PasswordField(inputs) {
  const {
    fieldName, // mandatory feature, field's name
    recoilState, // mandatory feature, recoil state to store current field's value
    field, // mandatory feature, field's key in storage

    inputLabel, // optional feature, TextInput's inline description
    description, // optional feature
    required, // optional feature
  } = inputs;

  const [isError, setIsError] = useState(false);
  let information;
  let setInformation;
  if (recoilState === undefined) {
    [information, setInformation] = useState({});
  } else {
    [information, setInformation] = useRecoilState(recoilState);
  }

  const updateFormByField = (curFieldName, curValue) => {
    setInformation({
      ...information,
      [curFieldName]: curValue,
    });
  };

  // required validation logic
  useEffect(() => {
    if (required) {
      if (information[field] === "") {
        setIsError(true);
      } else {
        setIsError(false);
      }
    }
  }, [information[field]]);

  return (
    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
      <Grid width="20%">
        {/* <p className="field_name">{fieldName}</p> */}
        <p className="field_name">{fieldName}</p>
      </Grid>
      <Grid width="80%">
        <TextField
          error={isError}
          type="password"
          required={required === undefined ? false : required}
          id="outlined-basic"
          label={inputLabel}
          variant="outlined"
          style={{ width: "100%" }}
          value={information[field] || ""}
          onChange={(event) => {
            updateFormByField(field.toString(), event.target.value);
          }}
        />
        {description === undefined ? "" : <Grid width="20%" />}
        {description === undefined ? (
          ""
        ) : (
          <Grid width="80%">
            <p className="description" style={{ width: "100%" }}>
              {description}
            </p>
          </Grid>
        )}
      </Grid>
    </Grid>
  );
}
