import React, { useState } from "react";
import Button from "@mui/material/Button";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useQueryClient } from "react-query";
import { useAddCart } from "../../hooks/userMutationHooks";
import { CacheName } from "../../config/constants";

const theme = createTheme({
  palette: {
    neutral: {
      main: "#64748B",
      contrastText: "#fff",
    },
  },
});

/* カートに入れるボタン */
const AddCartButton = ({ productData, rowSizeType, rowQuantity }) => {
  const queryClient = useQueryClient();
  const { addCart } = useAddCart();
  // すでにカートに入れているか確認
  const currentCartData = queryClient.getQueryData([
    CacheName.USERCART,
    productData.id,
  ]);
  let carted =
    currentCartData.length > 0
      ? currentCartData.find((data) => data.sizeType === rowSizeType)
      : false;
  const [isCart, setIsCart] = useState(carted);

  // ボタン押下時の処理
  const handleAddCart = () => {
    // すでにカートに入れている場合、処理しない
    if (isCart) return false;
    // uid取得
    const { uid } = queryClient.getQueryData("loginData");
    const addCartData = {
      uid: uid,
      productId: productData.id,
      images: productData.images,
      title: productData.title,
      price: productData.price,
      sizeType: rowSizeType,
      quantity: 1,
    };
    if (uid)
      addCart.mutate(addCartData, {
        onSuccess: () => {
          // ボタンの色をグレーに切り替え
          setIsCart(true);
        },
      });
  };

  return (
    <ThemeProvider theme={theme}>
      <Button
        variant="contained"
        color={isCart ? "neutral" : "info"}
        startIcon={<ShoppingCartIcon />}
        onClick={() => handleAddCart(productData.productId)}
      >
        カートに入れる
      </Button>
    </ThemeProvider>
  );
};

export default AddCartButton;
