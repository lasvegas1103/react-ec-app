import React, { memo } from "react";
import { useController } from "react-hook-form";
import { TextField, FormHelperText } from "@mui/material";

/**
 * マイプロフィール（フォーム：住所2）
 * @param {*} props
 * @returns
 */
const TextInputAddress2ForMyProfile = memo(({ name, control, formState }) => {
  const { field } = useController({
    name: name,
    control: control,
    rules: {
      maxLength: 100,
    },
    defaultValue: "",
  });
  return (
    <div>
      <TextField
        {...field}
        label="建物名 部屋番号"
        margin="normal"
        placeholder="建物名 部屋番号"
        fullWidth
        sx={{ backgroundColor: "white" }}
        error={formState.errors.address2?.type === "maxLength"}
        helperText={
          formState.errors.address2?.type === "maxLength" &&
          "住所2は100文字以内で入力してください"
        }
      />
      {formState.errors.address1?.type === "maxLength" && (
        <FormHelperText error={true}>
          "住所1は100文字以内で入力してください"
        </FormHelperText>
      )}
    </div>
  );
});
export default TextInputAddress2ForMyProfile;
