import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Form from "../../components/utils/Form";
import TextInput from "../../components/product/TextInput";
import TextSelect from "../../components/product/TextSelect";
import SizeArea from "../../components/product/SizeArea";
import ImageArea from "../../components/product/ImageArea";
import { Button, InputAdornment, Snackbar, Alert } from "@mui/material";
import useMutationProduct from "../../hooks/useMutationProduct";

const C_sizeArea = styled("div")({
  padding: "1rem 0 1rem 0",
});

const C_imageArea = styled("div")({
  padding: "1rem 0 1rem 0",
  textAlign: "right",
});

const C_container = styled("div")({
  margin: "0 auto",
  maxWidth: "400px",
  padding: "1rem",
  height: "auto",
  width: "calc(100% - 2rem)",
});

const C_title = styled("div")({
  textAlign: "center",
  fontSize: "1rem",
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
  const { saveProduct } = useMutationProduct();
  const [images, setImages] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [snackStatus, setSnackStatus] = useState({
    open: false,
    type: "",
    message: "",
  });

  const handleClose = (event, reason) => {
    if (reason === "clickway") {
      return;
    }
    setSnackStatus({ ...snackStatus, open: false });
  };

  const onSubmit = (data) => {
    // サイズが選択されているかどうか
    if (sizes.length === 0) {
      setSnackStatus({
        open: true,
        type: "error",
        message: "サイズが選択されていません。",
      });
      return;
    }

    data.sizes = sizes;
    data.images = images;
    saveProduct.mutate(data, {
      onSuccess: (res) => {},
    });
  };
  return (
    <C_container>
      <C_title>商品登録</C_title>
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
        <ImageArea name={"image"} images={images} setImages={setImages} />

        <Snackbar
          open={snackStatus.open}
          autoHideDuration={6000}
          onClose={handleClose}
        >
          <Alert
            onClose={handleClose}
            severity={snackStatus.type}
            sx={{ width: "100%" }}
          >
            {snackStatus.message}
          </Alert>
        </Snackbar>

        <Button variant="contained" color="primary" type="submit">
          商品を登録
        </Button>
      </Form>
    </C_container>
  );
};

export default ProductRegist;
