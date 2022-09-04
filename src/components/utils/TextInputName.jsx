import React from "react";
import { useController, useFormContext } from "react-hook-form";
import { TextField } from "@mui/material";

const TextInputName = (props) => {
  const methods = useFormContext();
  const { field } = useController({
    name: props.name,
    control: methods.control,
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
        methods.formState.errors.username?.type === "required" ||
        methods.formState.errors.username?.type === "pattern"
      }
      helperText={
        (methods.formState.errors.username?.type === "required" &&
          methods.formState.errors.username.message) ||
        (methods.formState.errors.username?.type === "pattern" &&
          methods.formState.errors.username.message)
      }
    />
  );
};

export default TextInputName;
