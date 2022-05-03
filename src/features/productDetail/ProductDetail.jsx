import React from "react";
import { useParams } from "react-router-dom";
import { Grid, Typography } from "@mui/material";
import BoxSx from "../../components/MaterialUI/BoxSx";
import useQueryProduct from "../../hooks/useQueryProduct";
import { useUtilContext } from "../../context/UtilContext";
import SwiperCm from "../../components/product/SwiperCm";
import SizeList from "../../components/product/SizeList";

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
            {/*  タイトル */}
            <Typography variant="h4" gutterBottom component="div">
              {data.title}
            </Typography>
            {/*  価格 */}
            <Typography variant="h4" gutterBottom component="div">
              ¥{data.price}
              <Typography
                variant="caption"
                gutterBottom
                component="span"
                sx={{
                  paddingLeft: "5px",
                }}
              >
                税込
              </Typography>
            </Typography>
            {/*  売り切れか */}
            {data.sizes.length > 0 && (
              <Typography variant="h5" gutterBottom component="div">
                在庫なし
              </Typography>
            )}
            {/*  サイズ一覧 */}
            <SizeList sizes={data.sizes} />
            <div>本文</div>
          </Grid>
        </Grid>
      )}
    </BoxSx>
  );
};

export default ProductDetail;
