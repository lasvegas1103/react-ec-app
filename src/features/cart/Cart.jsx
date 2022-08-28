import React, { useEffect } from "react";
import { useQueryClient } from "react-query";
import { Grid } from "@mui/material";
import { styled } from "@mui/material/styles";
import Header from "../../components/utils/Header";
import BoxSx from "../../components/MaterialUI/BoxSx";
import CartDetailLeft from "../../components/cart/CartDetailLeft";
import Title from "../../components/MaterialUI/Title";
import { useUserCartListQuery } from "../../hooks/cart/useUserCartListQuery";
import { useDeleteCart } from "../../hooks/cart/useDeleteCart";
import useCalcTotalAmount from "../../hooks/cart/useCalcTotalAmount";
import { useUpdateCart } from "../../hooks/cart/useUpdateCart";

/**
 * カート詳細画面
 * @returns
 */
const Cart = () => {
  // キャッシュからUID取得
  const queryClient = useQueryClient();
  const { uid } = queryClient.getQueryData("loginData");
  // 合計金額を計算
  const { totalAmount, calcTotalAmount } = useCalcTotalAmount();
  // ユーザーに紐づくカート情報を取得
  const { getUserCartList } = useUserCartListQuery({
    uid: uid,
  });
  // カートの商品を削除
  const { deleteCart } = useDeleteCart();

  // カートの商品を更新
  const { updateCart } = useUpdateCart();

  // 数量を選択して商品情報を更新
  const handleChangeCntAndUpdateCart = async ({ productId, sizeType, e }) => {
    const quantity = e.target.value;
    updateCart.mutate({
      uid: uid,
      productId: productId,
      sizeType: sizeType,
      quantity: quantity,
    });
  };

  // カートから商品を削除
  const handleDeleteCart = ({ productId, sizeType }) => {
    deleteCart.mutate({
      uid: uid,
      productId: productId,
      sizeType: sizeType,
    });
  };

  useEffect(() => {
    //合計金額を計算
    calcTotalAmount();
  }, [calcTotalAmount, totalAmount]);

  return (
    <div>
      <Header />
      <BoxSx>
        {/*  タイトル */}
        <Title
          title="ショッピングカート"
          component="div"
          variant="h4"
          color="textSecondary"
        />
        <Grid
          container
          columnSpacing={2}
          sx={{ width: "90%", margin: "0 auto" }}
        >
          <Grid item xs={7}>
            {/*  カート詳細Left */}
            <CartDetailLeft
              getUserCartList={getUserCartList}
              totalAmount={totalAmount}
              handleChangeCntAndUpdateCart={handleChangeCntAndUpdateCart}
              handleDeleteCart={handleDeleteCart}
            />
          </Grid>
          <Grid item xs={5}>
            test2
          </Grid>
        </Grid>
      </BoxSx>
    </div>
  );
};

export default Cart;
