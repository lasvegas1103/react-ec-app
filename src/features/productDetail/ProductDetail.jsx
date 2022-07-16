import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Grid } from "@mui/material";
import Header from "../../components/utils/Header";
import BoxSx from "../../components/MaterialUI/BoxSx";
import { useQueryClient } from "react-query";
import { useProductQuery } from "../../hooks/productHooks";
import { useUserFavQuery } from "../../hooks/userHooks";
import { useUpdataUnRead } from "../../hooks/userMutationHooks";
import { useUtilContext } from "../../context/UtilContext";
import SwiperCm from "../../components/product/SwiperCm";
import ProductDetailMain from "../../components/product/ProductDetailMain";

/* 商品詳細画面 */
const ProductDetail = () => {
  const urlParams = useParams();
  // キャッシュからUID取得
  const queryClient = useQueryClient();
  const { uid } = queryClient.getQueryData("loginData");
  // toastセット
  const { ToastContainer } = useUtilContext();
  // 商品情報取得
  const { fetchProductDetail } = useProductQuery(urlParams.productId);
  // ユーザーに紐づく商品情報を取得
  const { getUserFavorite } = useUserFavQuery({
    uid: uid,
    productId: urlParams.productId,
  });
  // 既読に更新
  const { updataUnRead } = useUpdataUnRead();

  useEffect(() => {
    // 既読に更新
    if (getUserFavorite.status === "success") {
      getUserFavorite.data.forEach((data) => {
        if (data.unRead === true) {
          updataUnRead.mutate(data);
        }
      });
    }
  }, [getUserFavorite.status]);

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
                <ProductDetailMain
                  productData={fetchProductDetail.data}
                  favoriteData={getUserFavorite.data}
                />
              </Grid>
            </Grid>
          )}
      </BoxSx>
    </div>
  );
};

export default ProductDetail;
