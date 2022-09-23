import React, { memo } from "react";
import { useController } from "react-hook-form";
import { TextField, FormHelperText } from "@mui/material";

/**
 * マイプロフィール（フォーム：電話番号）
 * @param {*} props
 * @returns
 */
const TextInputTelNumberForMyProfile = memo(({ name, control, formState }) => {
  const { field } = useController({
    name: name,
    control: control,
    rules: {
      required: "電話番号を入力してください。",
      // pattern: {
      //   value: /^[0-9]$/,
      //   message: "数字を入力してください",
      // },
    },
    defaultValue: "",
  });

  return (
    <div>
      <TextField
        {...field}
        label="電話番号"
        margin="normal"
        placeholder="電話番号"
        inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
        sx={{ backgroundColor: "white" }}
        error={
          formState.errors.telNumber?.type === "required" ||
          formState.errors.telNumber?.type === "pattern"
        }
      />
      {(formState.errors.telNumber?.type === "required" ||
        formState.errors.telNumber?.type === "pattern") && (
        <FormHelperText error={true}>
          {formState.errors.telNumber.message}
        </FormHelperText>
      )}
    </div>
  );
});
export default TextInputTelNumberForMyProfile;
