import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { styled } from "@mui/material/styles";
import Form from "../../components/utils/Form";
import TextInput from "../../components/product/TextInput";
import TextSelect from "../../components/product/TextSelect";
import SizeArea from "../../components/product/SizeArea";
import ImageArea from "../../components/product/ImageArea";
import { Button, InputAdornment } from "@mui/material";

const C_sizeArea = styled("div")({
  padding: "1rem 0 1rem 0",
});

const C_imageArea = styled("div")({
  padding: "1rem 0 1rem 0",
  textAlign: "right",
});

const categories = [
  {
    key: "トップス",
    value: "トップス",
  },
  {
    key: "パンツ",
    value: "ジャケット",
  },
];

const sex = [
  {
    key: "メンズ",
    value: "メンズ",
  },
  {
    key: "レディース",
    value: "レディース",
  },
  {
    key: "ユニセックス",
    value: "ユニセックス",
  },
];
const ProductRegist = () => {
  const [images, setImages] = useState([]);
  const sizeTypes = ["S", "M", "L", "XL"];
  const { handleSubmit, register, control, getValues, setValue } = useForm();
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
          label={"商品名"}
          type={"text"}
          maxRows={3}
          multiline={true}
          fullWidth={true}
          rules={{
            required: "商品名を入力してください。",
            maxLength: {
              value: 200,
              message: "200文字以内で入力してください",
            },
          }}
        />
        <TextInput
          name={"description"}
          control={control}
          label={"商品説明"}
          type={"text"}
          maxRows={3}
          multiline={true}
          fullWidth={true}
          rules={{
            required: "商品説明を入力してください。",
            maxLength: {
              value: 200,
              message: "200文字以内で入力してください",
            },
          }}
        />
        <TextSelect
          currencies={categories}
          name={"category"}
          control={control}
          label={"カテゴリー"}
          fullWidth={true}
          rules={{
            required: "カテゴリを入力してください。",
          }}
        />
        <TextSelect
          currencies={sex}
          name={"sex"}
          control={control}
          label={"性別"}
          fullWidth={true}
          rules={{
            required: "性別を入力してください。",
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
        <C_imageArea>
          <ImageArea
            images={images}
            setImages={setImages}
            control={control}
            register={register}
            getValues={getValues}
            setValue={setValue}
          />
        </C_imageArea>
        <Button variant="contained" color="primary" type="submit">
          商品を登録
        </Button>
      </Form>
    </div>
  );
};

export default ProductRegist;
