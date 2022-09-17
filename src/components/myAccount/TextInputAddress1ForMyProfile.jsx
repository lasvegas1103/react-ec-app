import React, { memo } from "react";
import { useController } from "react-hook-form";
import { TextField, FormHelperText } from "@mui/material";

/**
 * マイプロフィール（フォーム：住所１）
 * @param {*} props
 * @returns
 */
const TextInputAddress1ForMyProfile = memo(({ name, control, formState }) => {
  const { field } = useController({
    name: name,
    control: control,
    rules: {
      required: "住所1を入力してください。",
      maxLength: 100,
    },
    defaultValue: "",
  });
  return (
    <div>
      <TextField
        {...field}
        label="市区町村 番地"
        margin="normal"
        placeholder="市区町村 番地"
        fullWidth
        sx={{ backgroundColor: "white" }}
        error={
          formState.errors.address1?.type === "required" ||
          formState.errors.address1?.type === "maxLength"
        }
      />
      {formState.errors.address1?.type === "required" && (
        <FormHelperText error={true}>
          {formState.errors.address1.message}
        </FormHelperText>
      )}
      {formState.errors.address1?.type === "maxLength" && (
        <FormHelperText error={true}>
          "住所1は100文字以内で入力してください"
        </FormHelperText>
      )}
    </div>
  );
});
export default TextInputAddress1ForMyProfile;
