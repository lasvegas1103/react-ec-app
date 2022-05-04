import React from "react";
import { useParams } from "react-router-dom";
import { Grid } from "@mui/material";
import BoxSx from "../../components/MaterialUI/BoxSx";
import useQueryProduct from "../../hooks/useQueryProduct";
import { useUtilContext } from "../../context/UtilContext";
import SwiperCm from "../../components/product/SwiperCm";
import ProductDetailMain from "../../components/product/ProductDetailMain";

/* 商品詳細画面 */
const ProductDetail = () => {
  const productId = useParams("productId");
  // toastセット
  const { ToastContainer } = useUtilContext();
  // 商品情報取得
  const { fetchProductDetail } = useQueryProduct(productId);
  const { data, status } = fetchProductDetail;

  return (
    <BoxSx>
      <ToastContainer />
      {status === "success" && (
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={6}>
            <div>
              {/*  画像 */}
              <SwiperCm images={data.images} />
            </div>
          </Grid>
          <Grid item xs={6}>
            <ProductDetailMain data={data} />
          </Grid>
        </Grid>
      )}
    </BoxSx>
  );
};

export default ProductDetail;
