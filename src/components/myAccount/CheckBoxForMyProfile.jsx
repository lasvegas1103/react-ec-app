import React from "react";
import { useController, useFormContext } from "react-hook-form";
import { styled } from "@mui/material/styles";
import {
  Radio,
  FormHelperText,
  RadioGroup,
  FormControlLabel,
} from "@mui/material";

/**
 * マイプロフィール（フォーム：性別）
 * @returns
 */
const CheckBoxForMyProfile = (props) => {
  const methods = useFormContext();
  const { ...filed } = useController({
    name: props.name,
    control: methods.control,
    rules: {
      required: "性別を選択してください。",
    },
    defaultValue: "",
  });
  return (
    <div>
      <RadioGroup aria-labelledby="demo-error-radios">
        <FormControlLabel
          control={<Radio {...filed} />}
          label="男性"
          value={1}
        />
        <FormControlLabel
          control={<Radio {...filed} />}
          label="女性"
          value={2}
        />
        <FormControlLabel
          control={<Radio {...filed} />}
          label="その他"
          value={3}
        />

        {methods.formState.errors.gender?.type === "required" && (
          <StyledFormHelperText>
            {methods.formState.errors.gender.message}
          </StyledFormHelperText>
        )}
      </RadioGroup>
    </div>
  );
};

export default CheckBoxForMyProfile;

/* CSS */
const StyledFormHelperText = styled(FormHelperText)(({ theme }) => ({
  color: "red",
}));
