import React from "react";
import { useController } from "react-hook-form";
import { TextField, MenuItem } from "@mui/material";

const TextSelect = (props) => {
  const name = props.name;
  const { field } = useController({
    name: props.name,
    control: props.control,
    rules: props.rules,
    defaultValue: "",
  });
  return (
    <TextField
      {...field}
      id="standard-select-currency"
      select
      variant="standard"
      label={props.label}
      fullWidth={props.fullWidth}
      margin="normal"
      error={props["errors"]?.[name]?.["type"] === "required"}
      helperText={
        props["errors"]?.[name]?.["type"] === "required" &&
        props["errors"]?.[name]?.["message"]
      }
    >
      {props.currencies.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.key}
        </MenuItem>
      ))}
    </TextField>
  );
};

export default TextSelect;
