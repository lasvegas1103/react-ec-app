import React, { memo, useState } from "react";
import { useController, useFormContext } from "react-hook-form";
import { TextField, Link } from "@mui/material";

/**
 * マイプロフィール（フォーム：郵便番号）
 * @param {*} props
 * @returns
 */
const TextInputZipCodeForMyProfile = memo(({ name, onClick }) => {
  const [zipCode, setZipCode] = useState("");
  const methods = useFormContext();
  const { field } = useController({
    name: name,
    control: methods.control,
    rules: {
      required: "郵便番号を入力してください。",
      pattern: {
        value: /^([0-9]{1,20})$/,
        message: "郵便番号を入力してください。",
      },
    },
    defaultValue: "",
  });

  return (
    <div style={{ display: "flex" }}>
      <TextField
        {...field}
        label="郵便番号"
        margin="normal"
        placeholder="郵便番号"
        error={
          methods.formState.errors.zipCode?.type === "required" ||
          methods.formState.errors.zipCode?.type === "pattern"
        }
        helperText={
          (methods.formState.errors.zipCode?.type === "required" &&
            methods.formState.errors.zipCode.message) ||
          (methods.formState.errors.zipCode?.type === "pattern" &&
            methods.formState.errors.zipCode.message)
        }
      />
      <Link
        component="button"
        variant="body2"
        underline="none"
        onClick={(e) => {
          console.log(e.stopPropagation);
          console.info(methods.getValues("zipCode"));
        }}
        sx={{ marginLeft: "1rem" }}
      >
        郵便番号から住所を検索する
      </Link>
    </div>
  );
});

export default TextInputZipCodeForMyProfile;
