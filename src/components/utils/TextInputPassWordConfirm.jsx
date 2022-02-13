import React from "react";
import { useController } from "react-hook-form";
import { TextField } from "@mui/material";

const TextInputPassWordConfirm = (props) => {
  const { field } = useController({
    name: props.name,
    control: props.control,
    rules: {
      required: "パスワード（確認用）は必須です。",
      validate: (value) =>
        value === props.getValues("password") || (
          <span>パスワードが一致しません</span>
        ),
    },
    defaultValue: "",
  });

  return (
    <TextField
      {...field}
      label="パスワード（確認用）"
      fullWidth
      margin="normal"
      type="password"
      placeholder="パスワード（確認用）"
      error={
        props.errors.passwordConfirm?.type === "required" ||
        props.errors.passwordConfirm?.type === "validate"
      }
      helperText={
        (props.errors.passwordConfirm?.type === "required" &&
          props.errors.passwordConfirm.message) ||
        (props.errors.passwordConfirm?.type === "validate" &&
          props.errors.passwordConfirm.message)
      }
    />
  );
};

export default TextInputPassWordConfirm;
