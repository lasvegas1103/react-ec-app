import React from "react";
import { useController, useFormContext } from "react-hook-form";
import { TextField } from "@mui/material";

const TextInputPassWordConfirm = (props) => {
  const methods = useFormContext();
  const { field } = useController({
    name: props.name,
    control: methods.control,
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
        methods.formState.errors.passwordConfirm?.type === "required" ||
        methods.formState.errors.passwordConfirm?.type === "validate"
      }
      helperText={
        (methods.formState.errors.passwordConfirm?.type === "required" &&
          methods.formState.errors.passwordConfirm.message) ||
        (methods.formState.errors.passwordConfirm?.type === "validate" &&
          methods.formState.errors.passwordConfirm.message)
      }
    />
  );
};

export default TextInputPassWordConfirm;
