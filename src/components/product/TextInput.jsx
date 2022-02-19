import React from "react";
import { useController, useForm } from "react-hook-form";
import { TextField } from "@mui/material";

const TextInput = (props) => {
  const { field } = useController({
    name: props.name,
    control: props.control,
    rules: props.rules,
    defaultValue: "",
  });
  return (
    <TextField
      {...field}
      label={props.label}
      type={props.type}
      rows={props.rows}
      fullWidth
      margin="normal"
      error={
        props.errors.title?.type === "required" ||
        props.errors.title?.type === "maxLength"
      }
      helperText={
        (props.errors.title?.type === "required" &&
          props.errors.title.message) ||
        (props.errors.title?.type === "maxLength" && props.errors.title.message)
      }
    />
  );
};

export default TextInput;
