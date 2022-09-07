import React, { memo } from "react";
import { Controller } from "react-hook-form";
import { styled } from "@mui/material/styles";
import {
  Radio,
  FormHelperText,
  RadioGroup,
  FormControlLabel,
  FormControl,
} from "@mui/material";

/**
 * マイプロフィール（フォーム：性別）
 * @returns
 */
const CheckBoxForMyProfile = memo(
  ({ name, control, formState }) => {
    return (
      <div>
        <FormControl component="fieldset">
          <Controller
            name={name}
            control={control}
            rules={{
              required: "性別を選択してください。",
            }}
            defaultValue=""
            render={({ field }) => (
              <RadioGroup row aria-labelledby="demo-error-radios" {...field}>
                <FormControlLabel control={<Radio />} label="男性" value="1" />
                <FormControlLabel control={<Radio />} label="女性" value="2" />
                <FormControlLabel
                  control={<Radio />}
                  label="その他"
                  value="3"
                />
              </RadioGroup>
            )}
          ></Controller>
        </FormControl>
        {formState.errors.gender?.type === "required" && (
          <StyledFormHelperText>
            {formState.errors?.gender.message}
          </StyledFormHelperText>
        )}
      </div>
    );
  },
  (prevProps, nextProps) => {
    return prevProps.formState.isDirty === nextProps.formState.isDirty;
  }
);

export default CheckBoxForMyProfile;

/* CSS */
const StyledFormHelperText = styled(FormHelperText)(({ theme }) => ({
  color: "red",
}));
