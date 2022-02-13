import React from "react";
import { useController } from "react-hook-form";
import { TextField } from "@mui/material";

const TextInputName = (props) => {
  const { field } = useController({
    name: props.name,
    control: props.control,
    rules: {
      required: "ニックネームを入力してください。",
      pattern: {
        value: /^([a-zA-Z0-9]{1,20})$/,
        message: "半角英数字20文字以内で入力してください。",
      },
    },
    defaultValue: "",
  });

  return (
    <TextField
      {...field}
      label="ニックネームを入力してください。"
      fullWidth
      margin="normal"
      placeholder="ニックネームを入力してください。"
      error={
        props.errors.username?.type === "required" ||
        props.errors.username?.type === "pattern"
      }
      helperText={
        (props.errors.username?.type === "required" &&
          props.errors.username.message) ||
        (props.errors.username?.type === "pattern" &&
          props.errors.username.message)
      }
    />
  );
};

export default TextInputName;
