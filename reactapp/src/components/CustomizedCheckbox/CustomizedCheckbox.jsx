import React, { useEffect, useState } from "react";
import { TextField } from "@mui/material";

import { useRecoilState } from "recoil";
import Grid from "@mui/material/Unstable_Grid2";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { padding } from "../../functions/utils";

export default function CustomizedCheckbox(inputs) {
  const {
    recoilState, // mandatory feature, recoil state to store current field's value
    field, // mandatory feature, field's key in storage
    label, // mandatory feature, checkbox's label

    index, // optional feature, only for list information to locate current index
    inGroup, // optional feature, whether current checkbox in checkbox group
    groupField, // optional feature, should use with inGroup together
  } = inputs;

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
          if (inGroup === undefined || inGroup === false) {
            return { ...each, [curFieldName]: curValue };
          }

          // if in group
          let newCheckboxGroup = {};
          if (each[groupField] !== undefined) {
            newCheckboxGroup = { ...each[groupField] };
          }
          newCheckboxGroup[label] = curValue;
          return { ...each, [groupField]: newCheckboxGroup };
        }
        return each;
      });
      setInformation(newInformation);
    }
  };

  function getValue() {
    // non-list structure
    if (index === undefined) {
      return information[groupField] || false;
    }
    // for list structure
    if (inGroup === undefined || inGroup === false) {
      return information[index][groupField] || false;
    }
    // for in group
    if (information[index][groupField] === undefined) {
      return false;
    }

    return information[index][groupField][field] || false;
  }

  return (
    <FormControlLabel
      control={
        <Checkbox
          checked={getValue()}
          onChange={(_, checked) => {
            updateFormByField(field, checked);
          }}
        />
      }
      label={label}
    />
  );
}
