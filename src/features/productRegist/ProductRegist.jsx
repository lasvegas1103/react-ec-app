import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Form from "../../components/utils/Form";
import TextInput from "../../components/product/TextInput";
import TextSelect from "../../components/product/TextSelect";
import SizeArea from "../../components/product/SizeArea";
import ImageArea from "../../components/product/ImageArea";
import { Button, InputAdornment } from "@mui/material";
import { useSaveProduct } from "../../hooks/productMutationHooks";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const categories = [
  {
    key: "トップス",
    value: "トップス",
  },
  {
    key: "パンツ",
    value: "パンツ",
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
/**
 * 商品の登録
 * @returns
 */
const ProductRegist = () => {
  const { saveProduct } = useSaveProduct();
  const [images, setImages] = useState([]);
  const [sizes, setSizes] = useState([]);

  const onSubmit = (data) => {
    // サイズが選択されているかどうか
    if (sizes.length === 0) {
      toast.error("サイズが選択されていません");
      return;
    }

    data.sizes = sizes;
    data.images = images;
    saveProduct.mutate(data, {
      onError: () => {
        toast.error("商品の登録に失敗しました");
      },
    });
  };

  return (
    <Ccontainer>
      <ToastContainer />
      <Ctitle>商品登録</Ctitle>
      <Form onSubmit={onSubmit}>
        <TextInput
          name={"title"}
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
          label={"カテゴリー"}
          fullWidth={true}
          rules={{
            required: "カテゴリーを入力してください。",
          }}
        />
        <TextSelect
          currencies={sex}
          name={"sex"}
          label={"性別"}
          fullWidth={true}
          rules={{
            required: "性別を入力してください。",
          }}
        />
        <TextInput
          name={"price"}
          label={"価格"}
          type={"number"}
          maxRows={1}
          multiline={false}
          fullWidth={true}
          endAdornment={<InputAdornment position="end">円</InputAdornment>}
          rules={{
            required: "価格を入力してください。",
          }}
        />
        <SizeArea name={"sizes"} sizes={sizes} setSizes={setSizes} />
        <ImageArea
          name={"image"}
          images={images}
          setImages={setImages}
          rules={{
            required: "画像をアップロードしてください。",
          }}
        />

        <Button variant="contained" color="primary" type="submit">
          商品を登録
        </Button>
      </Form>
    </Ccontainer>
  );
};

export default ProductRegist;

const Ccontainer = styled("div")({
  margin: "0 auto",
  maxWidth: "400px",
  padding: "1rem",
  height: "auto",
  width: "calc(100% - 2rem)",
});

const Ctitle = styled("div")({
  textAlign: "center",
  fontSize: "1rem",
});
