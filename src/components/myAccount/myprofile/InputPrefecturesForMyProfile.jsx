import React, { memo } from "react";
import { useController } from "react-hook-form";
import { TextField, FormHelperText } from "@mui/material";

/**
 * マイプロフィール（フォーム：都道府県）
 * @param {*} props
 * @returns
 */
const InputPrefecturesForMyProfile = memo(({ name, control, formState }) => {
  const { field } = useController({
    name: name,
    control: control,
    rules: {
      required: "都道府県を入力してください。",
    },
    defaultValue: "",
  });
  return (
    <div>
      <TextField
        {...field}
        label="都道府県"
        margin="normal"
        placeholder="都道府県"
        sx={{ backgroundColor: "white" }}
        // inputProps={{ readonly: true }}
        error={formState.errors.prefecture?.type === "required"}
        disabled
      />
      {formState.errors.prefecture?.type === "required" && (
        <FormHelperText error={true}>
          {formState.errors.prefecture.message}
        </FormHelperText>
      )}
    </div>
  );
});
export default InputPrefecturesForMyProfile;
