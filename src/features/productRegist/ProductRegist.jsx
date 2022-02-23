import React from "react";
import { useForm } from "react-hook-form";
import { styled } from "@mui/material/styles";
import Form from "../../components/utils/Form";
import TextInput from "../../components/product/TextInput";
import SizeArea from "../../components/product/SizeArea";
import { Grid, Button, InputAdornment } from "@mui/material";

const C_sizeArea = styled("div")({
  padding: "1rem 0 1rem 0",
});

const ProductRegist = () => {
  const sizeTypes = ["S", "M", "L", "XL"];
  const { handleSubmit, control, getValues, setValue } = useForm();
  const onSubmit = () => {
    return;
  };
  return (
    <div>
      <div>商品登録</div>
      <Form onSubmit={onSubmit}>
        <TextInput
          name={"title"}
          control={control}
          label={"タイトルを入力してください"}
          type={"text"}
          maxRows={3}
          multiline={true}
          fullWidth={true}
          rules={{
            required: "タイトルを入力してください。",
            maxLength: {
              value: 10,
              message: "200文字以内で入力してください",
            },
          }}
        />
        <TextInput
          name={"price"}
          control={control}
          label={"価格を入力してください"}
          type={"number"}
          maxRows={1}
          multiline={false}
          fullWidth={true}
          endAdornment={<InputAdornment position="end">円</InputAdornment>}
          rules={{
            required: "価格を入力してください。",
          }}
        />
        <C_sizeArea>
          <SizeArea
            control={control}
            getValues={getValues}
            setValue={setValue}
          />
        </C_sizeArea>

        <Button variant="contained" color="primary" type="submit">
          商品を登録
        </Button>
      </Form>
    </div>
  );
};

export default ProductRegist;
