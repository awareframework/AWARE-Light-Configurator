import React from "react";
import "./InputField.css";
import { TextField } from "@mui/material";
import { useRecoilState } from "recoil";
import { studyFormStudyInformationState } from "../../functions/atom";

function InputField(inputs) {
  const [studyInformation, setStudyInformation] = useRecoilState(
    studyFormStudyInformationState
  );

  const updateFormByField = (fieldName, value) => {
    setStudyInformation({
      ...studyInformation,
      [fieldName]: value,
    });
  };

  const { studyInfoField, inputLabel, field } = inputs;

  return (
    <TextField
      id="outlined-basic"
      label={inputLabel}
      variant="outlined"
      style={{ width: "140%" }}
      // value={{ fieldname } ? { fieldname } : ""}
      value={studyInfoField || ""}
      onChange={(event) => {
        updateFormByField(field.toString(), event.target.value);
        console.log(studyInformation);
      }}
    />
  );
}
export default InputField;
