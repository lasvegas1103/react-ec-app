import React from "react";
import { useController, useFormContext } from "react-hook-form";
import { TextField } from "@mui/material";

/**
 * マイプロフィール（フォーム：名前）
 * @param {*} props
 * @returns
 */
const TextInputNameForMyProfile = (props) => {
  const methods = useFormContext();
  const { field } = useController({
    name: props.name,
    control: methods.control,
    rules: {
      required: "名前を入力してください。",
      pattern: {
        validate: (value) => value.length > 0,
        message: "20文字以内で入力してください。",
      },
    },
    defaultValue: "",
  });

  return (
    <TextField
      {...field}
      label="名前入力してください。"
      fullWidth
      margin="normal"
      placeholder="名前"
      error={
        methods.formState.errors.name?.type === "required" ||
        methods.formState.errors.name?.type === "pattern"
      }
      helperText={
        (methods.formState.errors.name?.type === "required" &&
          methods.formState.errors.name.message) ||
        (methods.formState.errors.name?.type === "pattern" &&
          methods.formState.errors.name.message)
      }
    />
  );
};

export default TextInputNameForMyProfile;
