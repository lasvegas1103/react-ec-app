import React from "react";
import { useController, useFormContext } from "react-hook-form";
import { TextField } from "@mui/material";

const TextInputLoginId = (props) => {
  const methods = useFormContext();
  const { field } = useController({
    name: props.name,
    control: methods.control,
    rules: {
      required: "ログインID（メールアドレス）は必須です。",
      pattern: {
        value:
          /^[a-zA-Z0-9_+-]+(.[a-zA-Z0-9_+-]+)*@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/i,
        message: "メールアドレスの形式が不正です。",
      },
    },
    defaultValue: "",
  });

  return (
    <TextField
      {...field}
      label="ログインID（メールアドレス）"
      fullWidth
      margin="normal"
      placeholder="ログインID（メールアドレスを入力してください。）"
      error={
        methods.formState.errors.loginId?.type === "required" ||
        methods.formState.errors.loginId?.type === "pattern"
      }
      helperText={
        (methods.formState.errors.loginId?.type === "required" &&
          methods.formState.errors.loginId.message) ||
        (methods.formState.errors.loginId?.type === "pattern" &&
          methods.formState.errors.loginId.message)
      }
    />
  );
};

export default TextInputLoginId;
