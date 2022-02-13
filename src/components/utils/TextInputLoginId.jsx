import React from "react";
import { useController } from "react-hook-form";
import { TextField } from "@mui/material";

const TextInputLoginId = (props) => {
  const { field } = useController({
    name: props.name,
    control: props.control,
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
        props.errors.loginId?.type === "required" ||
        props.errors.loginId?.type === "pattern"
      }
      helperText={
        (props.errors.loginId?.type === "required" &&
          props.errors.loginId.message) ||
        (props.errors.loginId?.type === "pattern" &&
          props.errors.loginId.message)
      }
    />
  );
};

export default TextInputLoginId;
