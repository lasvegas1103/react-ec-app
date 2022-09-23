import React, { memo } from "react";
import { useController } from "react-hook-form";
import { TextField, FormHelperText } from "@mui/material";

/**
 * マイプロフィール（パスワード確認用）
 * @param {*} props
 * @returns
 */
const TextInputPassWordConfirmForPW = memo(
  ({ name, control, formState, getValues }) => {
    const { field } = useController({
      name: name,
      control: control,
      rules: {
        required: "パスワード（確認用）は必須です。",
        validate: (value) =>
          value === getValues("password") || (
            <span>パスワードが一致しません</span>
          ),
      },
      defaultValue: "",
    });
    return (
      <>
        <TextField
          {...field}
          label="パスワード（確認用）"
          margin="normal"
          placeholder="パスワード（確認用）"
          fullWidth
          type="password"
          sx={{ backgroundColor: "white" }}
          error={
            formState.errors.passwordConfirm?.type === "required" ||
            formState.errors.passwordConfirm?.type === "pattern"
          }
        />
        {formState.errors.passwordConfirm?.type === "required" && (
          <FormHelperText error={true}>
            {formState.errors.passwordConfirm.message}
          </FormHelperText>
        )}
        {formState.errors.passwordConfirm?.type === "validate" && (
          <FormHelperText error={true}>
            {formState.errors.passwordConfirm.message}
          </FormHelperText>
        )}
      </>
    );
  }
);
export default TextInputPassWordConfirmForPW;
