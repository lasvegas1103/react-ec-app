import React from "react";
import { Typography } from "@mui/material";
import SizeList from "../../components/product/SizeList";

/**
 * 商品詳細画面（メイン）
 * @returns
 */
const ProductDetailMain = ({ productData }) => {
  return (
    <>
      {/*  タイトル */}
      <Typography variant="h4" gutterBottom component="div">
        {productData.title}
      </Typography>
      {/*  価格 */}
      <Typography variant="h4" gutterBottom component="div">
        ¥{productData.price}
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
      {productData.sizes.length < 0 && (
        <Typography variant="h5" gutterBottom component="div">
          在庫なし
        </Typography>
      )}
      {/*  サイズ一覧 */}
      <SizeList productData={productData} />
      {/*  説明文 */}
      <Typography variant="h6" gutterBottom component="div">
        アイテム説明
      </Typography>
      <Typography variant="body1" gutterBottom sx={{ whiteSpace: "pre-line" }}>
        {productData.description}
      </Typography>
    </>
  );
};

export default ProductDetailMain;
