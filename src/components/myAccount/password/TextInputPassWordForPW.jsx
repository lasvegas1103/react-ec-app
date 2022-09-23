import React, { memo } from "react";
import { useController } from "react-hook-form";
import { TextField, FormHelperText } from "@mui/material";

/**
 * マイプロフィール（パスワード）
 * @param {*} props
 * @returns
 */
const TextInputPassWordForPW = memo(({ name, control, formState }) => {
  const { field } = useController({
    name: name,
    control: control,
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
    <>
      <TextField
        {...field}
        label="パスワード"
        margin="normal"
        placeholder="パスワード"
        type="password"
        fullWidth
        sx={{ backgroundColor: "white" }}
        error={
          formState.errors.password?.type === "required" ||
          formState.errors.password?.type === "pattern"
        }
      />
      {formState.errors.password?.type === "required" && (
        <FormHelperText error={true}>
          {formState.errors.password.message}
        </FormHelperText>
      )}
      {formState.errors.password?.type === "pattern" && (
        <FormHelperText error={true}>
          {formState.errors.password.message}
        </FormHelperText>
      )}
    </>
  );
});
export default TextInputPassWordForPW;
