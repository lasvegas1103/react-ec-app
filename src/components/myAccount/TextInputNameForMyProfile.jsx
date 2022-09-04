import React from "react";
import { useController } from "react-hook-form";
import { TextField } from "@mui/material";

/**
 * マイプロフィール（フォーム：名前）
 * @param {*} props
 * @returns
 */
const TextInputNameForMyProfile = (props) => {
  const { field } = useController({
    name: props.name,
    control: props.control,
    rules: {
      required: "名前を入力してください。",
      pattern: {
        value: /^([^\x20-\x7ea-zA-Z0-9]{1,20})$/,
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
      placeholder="名前を入力してください。"
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

export default TextInputNameForMyProfile;
