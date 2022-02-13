import React from "react";
import { useController } from "react-hook-form";
import { TextField } from "@mui/material";

const TextInputPassWord = (props) => {
  const { field } = useController({
    name: props.name,
    control: props.control,
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
        props.errors.password?.type === "required" ||
        props.errors.password?.type === "pattern"
      }
      helperText={
        (props.errors.password?.type === "required" &&
          props.errors.password.message) ||
        (props.errors.password?.type === "pattern" &&
          props.errors.password.message)
      }
    />
  );
};

export default TextInputPassWord;
