import React from "react";
import { Typography } from "@mui/material";
import SizeList from "../../components/product/SizeList";

const ProductDetailMain = ({ data }) => {
  return (
    <>
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
      {data.sizes.length < 0 && (
        <Typography variant="h5" gutterBottom component="div">
          在庫なし
        </Typography>
      )}
      {/*  サイズ一覧 */}
      <SizeList sizes={data.sizes} />
      {/*  説明文 */}
      <Typography variant="h6" gutterBottom>
        アイテム説明
      </Typography>
      <Typography variant="body1" gutterBottom>
        {data.description}
      </Typography>
    </>
  );
};

export default ProductDetailMain;
