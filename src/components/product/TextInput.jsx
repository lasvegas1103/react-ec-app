import React from "react";
import { useController } from "react-hook-form";
import { TextField } from "@mui/material";

const TextInput = (props) => {
  const name = props.name;
  const { field } = useController({
    name: props.name,
    control: props.control,
    rules: props.rules,
    defaultValue: "",
  });
  return (
    <TextField
      sx={{ whiteSpace: "pre-line" }}
      {...field}
      id="standard-basic"
      variant="standard"
      label={props.label}
      type={props.type}
      maxRows={props.maxRows}
      multiline={props.multiline}
      InputProps={{
        endAdornment: props.endAdornment,
      }}
      fullWidth={props.fullWidth}
      margin="normal"
      error={
        props["errors"]?.[name]?.["type"] === "required" ||
        props["errors"]?.[name]?.["type"] === "maxLength"
      }
      helperText={
        (props["errors"]?.[name]?.["type"] === "required" &&
          props["errors"]?.[name]?.["message"]) ||
        (props["errors"]?.[name]?.["type"] === "maxLength" &&
          props["errors"]?.[name]?.["message"])
      }
    />
  );
};

export default TextInput;
