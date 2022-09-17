import React, { memo } from "react";
import { useController } from "react-hook-form";
import { TextField } from "@mui/material";

/**
 * マイプロフィール（フォーム：名前）
 * @param {*} props
 * @returns
 */
const TextInputNameForMyProfile = memo(({ name, control, formState }) => {
  const { field } = useController({
    name: name,
    control: control,
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
        formState.errors.name?.type === "required" ||
        formState.errors.name?.type === "pattern"
      }
      helperText={
        (formState.errors.name?.type === "required" &&
          formState.errors.name.message) ||
        (formState.errors.name?.type === "pattern" &&
          formState.errors.name.message)
      }
    />
  );
});
export default TextInputNameForMyProfile;
