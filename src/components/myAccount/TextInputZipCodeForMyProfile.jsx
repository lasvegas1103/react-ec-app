import React, { memo } from "react";
import { useController } from "react-hook-form";
import { TextField, Link, FormHelperText } from "@mui/material";

/**
 * マイプロフィール（フォーム：郵便番号）
 * @param {*} props
 * @returns
 */
const TextInputZipCodeForMyProfile = memo(
  ({ name, searchAddress, formState, getValues, control, trigger }) => {
    const { field } = useController({
      name: name,
      control: control,
      rules: {
        required: "郵便番号を入力してください。",
        pattern: {
          value: /^([0-9]{1,20})$/,
          message: "郵便番号を入力してください。",
        },
      },
      defaultValue: "",
    });

    const handleClick = async (event) => {
      event.preventDefault();
      await trigger("zipCode");
      // 郵便番号から住所取得
      await searchAddress(getValues(name));
    };

    return (
      <div>
        <div style={{ display: "flex" }}>
          <TextField
            {...field}
            label="郵便番号"
            margin="normal"
            placeholder="郵便番号"
            sx={{ backgroundColor: "white" }}
            error={
              formState.errors.zipCode?.type === "required" ||
              formState.errors.zipCode?.type === "pattern"
            }
          />
          <Link
            component="button"
            variant="body2"
            underline="none"
            onClick={handleClick}
            sx={{ marginLeft: "1rem" }}
          >
            郵便番号から住所を検索する
          </Link>
        </div>
        {(formState.errors.zipCode?.type === "required" ||
          formState.errors.zipCode?.type === "pattern") && (
          <FormHelperText error={true}>
            {formState.errors.zipCode.message}
          </FormHelperText>
        )}
      </div>
    );
  }
);

export default TextInputZipCodeForMyProfile;
