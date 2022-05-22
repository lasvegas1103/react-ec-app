import React from "react";
import { useParams } from "react-router-dom";
import { Grid } from "@mui/material";
import Header from "../../components/utils/Header";
import BoxSx from "../../components/MaterialUI/BoxSx";
import { useQueryClient } from "react-query";
import useQueryProduct from "../../hooks/useQueryProduct";
import useQueryUser from "../../hooks/useQueryUser";
import { useUtilContext } from "../../context/UtilContext";
import SwiperCm from "../../components/product/SwiperCm";
import ProductDetailMain from "../../components/product/ProductDetailMain";

/* 商品詳細画面 */
const ProductDetail = () => {
  const productId = useParams("productId");
  // キャッシュからUID取得
  const queryClient = useQueryClient();
  const { uid } = queryClient.getQueryData("loginData");
  // toastセット
  const { ToastContainer } = useUtilContext();
  // 商品情報取得
  const { fetchProductDetail } = useQueryProduct(productId);
  // ユーザーに紐づく商品情報を取得
  const { getUserFavorite } = useQueryUser({ uid: uid, productId: productId });

  return (
    <div>
      <Header />
      <BoxSx>
        <ToastContainer />
        {fetchProductDetail.status === "success" &&
          getUserFavorite.status === "success" && (
            <Grid
              container
              rowSpacing={1}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            >
              <Grid item xs={6}>
                <div>
                  {/*  画像 */}
                  <SwiperCm images={fetchProductDetail.data.images} />
                </div>
              </Grid>
              <Grid item xs={6}>
                {/*  詳細メイン */}
                <ProductDetailMain data={fetchProductDetail.data} />
              </Grid>
            </Grid>
          )}
      </BoxSx>
    </div>
  );
};

export default ProductDetail;
