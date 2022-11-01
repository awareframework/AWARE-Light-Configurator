import React, { useEffect, useState } from "react";
import "./Field.css";
import { TextField } from "@mui/material";

import { useRecoilState } from "recoil";
import Grid from "@mui/material/Unstable_Grid2";

export default function Field(inputs) {
  const {
    fieldName, // mandatory feature, field's name
    recoilState, // mandatory feature, recoil state to store current field's value
    field, // mandatory feature, field's key in storage

    index, // optional feature, only for list information to locate current index
    subIndex, // optional feature, only for nested list information in questions page's options
    inputLabel, // optional feature, TextInput's inline description
    description, // optional feature
    required, // optional feature
    type, // optional feature, adjust different input type, e.g. password, number... all types can be found here: https://www.w3schools.com/html/html_form_input_types.asp
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
    // update non-list data structure
    if (index === undefined) {
      setInformation({
        ...information,
        [curFieldName]: curValue,
      });
    } else {
      // update list data structure
      const newInformation = [...information].map((each, idx) => {
        if (idx === index) {
          if (subIndex === undefined) {
            return { ...each, [curFieldName]: curValue };
          }

          // if updating nested list information
          const newSubList = [...each[curFieldName]].map(
            (subEach, subEachIdx) => {
              if (subEachIdx === subIndex) return curValue;
              return subEach;
            }
          );
          return { ...each, [curFieldName]: newSubList };
        }
        return each;
      });
      setInformation(newInformation);
    }
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

  function getValue() {
    // non-list structure
    if (index === undefined) {
      return information[field] || "";
    }
    // for list structure
    if (subIndex === undefined) {
      return information[index][field] || "";
    }
    // for nested-list structure
    if (information[index][field] === undefined) {
      return "";
    }
    return information[index][field][subIndex] || "";
  }

  return (
    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
      <Grid width="20%">
        <p className="field_name">{fieldName + (required ? " *" : "")}</p>
      </Grid>
      <Grid width="80%">
        <TextField
          error={isError}
          required={required === undefined ? false : required}
          id="outlined-basic"
          label={inputLabel}
          variant="outlined"
          style={{ width: "100%" }}
          value={getValue()}
          type={type || "text"}
          onChange={(event) => {
            updateFormByField(field.toString(), event.target.value);
          }}
          onBlur={() => {
            if (getValue() === undefined || getValue() === "") {
              setIsError(true);
            }
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
