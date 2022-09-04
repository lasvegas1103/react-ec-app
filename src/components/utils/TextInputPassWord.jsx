import React from "react";
import { useController, useFormContext } from "react-hook-form";
import { TextField } from "@mui/material";

const TextInputPassWord = (props) => {
  const methods = useFormContext();
  const { field } = useController({
    name: props.name,
    control: methods.control,
    rules: {
      required: "パスワードは必須です。",
      pattern: {
        value: /^([a-zA-Z0-9]{8,})$/,
        message: "半角英数字の8文字以上で登録してください。",
      },
    },
    defaultValue: "",
  });

  return (
    <TextField
      {...field}
      label="パスワード（半角英数字８文字以上）"
      fullWidth
      margin="normal"
      type="password"
      placeholder="パスワード（半角英数字８文字以上）"
      error={
        methods.formState.errors.password?.type === "required" ||
        methods.formState.errors.password?.type === "pattern"
      }
      helperText={
        (methods.formState.errors.password?.type === "required" &&
          methods.formState.errors.password.message) ||
        (methods.formState.errors.password?.type === "pattern" &&
          methods.formState.errors.password.message)
      }
    />
  );
};

export default TextInputPassWord;
