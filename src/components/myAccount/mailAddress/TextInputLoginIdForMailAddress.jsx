import React, { memo } from "react";
import { useController } from "react-hook-form";
import { TextField, FormHelperText } from "@mui/material";

/**
 * マイプロフィール（メールアドレス）
 * @param {*} props
 * @returns
 */
const TextInputLoginIdForMailAddress = memo(({ name, control, formState }) => {
  const { field } = useController({
    name: name,
    control: control,
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
    <div>
      <TextField
        {...field}
        label="メールアドレス（ログインID）"
        margin="normal"
        placeholder="ールアドレス（ログインID）"
        fullWidth
        sx={{ backgroundColor: "white" }}
        error={
          formState.errors.loginId?.type === "required" ||
          formState.errors.loginId?.type === "pattern"
        }
      />
      {formState.errors.loginId?.type === "required" && (
        <FormHelperText error={true}>
          {formState.errors.loginId.message}
        </FormHelperText>
      )}
      {formState.errors.loginId?.type === "pattern" && (
        <FormHelperText error={true}>
          {formState.errors.loginId.message}
        </FormHelperText>
      )}
    </div>
  );
});
export default TextInputLoginIdForMailAddress;
