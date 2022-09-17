import React, { memo } from "react";
import { useController } from "react-hook-form";
import { FormHelperText, TextField } from "@mui/material";

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
    },
    defaultValue: "",
  });
  return (
    <div>
      <TextField
        {...field}
        label="例）山田太郎"
        margin="normal"
        placeholder="名前"
        sx={{ backgroundColor: "white" }}
        error={
          formState.errors.name?.type === "required" ||
          formState.errors.name?.type === "pattern"
        }
      />
      {(formState.errors.name?.type === "required" ||
        formState.errors.name?.type === "pattern") && (
        <FormHelperText error={true}>
          {formState.errors.name.message}
        </FormHelperText>
      )}
    </div>
  );
});
export default TextInputNameForMyProfile;
