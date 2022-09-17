import React, { memo } from "react";
import { useController } from "react-hook-form";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  FormHelperText,
} from "@mui/material";
import { PrefectureList } from "../../config/constants";

/**
 * マイプロフィール（フォーム：都道府県）
 * @param {*} props
 * @returns
 */
const InputPrefecturesForMyProfile = memo(
  ({ name, control, formState, getValues }) => {
    const { field } = useController({
      name: name,
      control: control,
      rules: {
        required: "都道府県を入力してください。",
      },
      defaultValue: "",
    });

    return (
      <FormControl
        sx={{ m: 1, minWidth: 120 }}
        error={formState.errors?.prefecture?.type === "required" ? true : false}
      >
        <InputLabel
          id={
            formState.errors?.prefecture?.type === "required"
              ? "demo-simple-select-error-label"
              : "demo-simple-select-label"
          }
        >
          都道府県
        </InputLabel>
        <Select
          labelId={
            formState.errors.prefecture?.type === "required"
              ? "demo-simple-select-error-label"
              : "demo-simple-select-label"
          }
          id={
            formState.errors.prefecture?.type === "required"
              ? "demo-simple-select-error"
              : "demo-simple-select"
          }
          value={getValues(name)}
          label="都道府県"
          {...field}
        >
          {PrefectureList.map((prefecture) => (
            <MenuItem key={prefecture.key} value={prefecture.key}>
              {prefecture.value}
            </MenuItem>
          ))}
        </Select>
        {formState.errors.prefecture?.type === "required" && (
          <FormHelperText>
            {formState.errors.prefecture?.message}
          </FormHelperText>
        )}
      </FormControl>
    );
  }
);
export default InputPrefecturesForMyProfile;
