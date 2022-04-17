import React from "react";
import { Grid } from "@mui/material";
import useQueryProduct from "../../hooks/useQueryProduct";
import { useUtilContext } from "../../context/UtilContext";

const ProductDetail = () => {
  const { ToastContainer } = useUtilContext();
  const { fetchProductDetail } = useQueryProduct({
    id: "aa",
  });

  return (
    <div>
      <ToastContainer />
      <Grid container spacing={5}>
        <Grid>画像こっちに表示</Grid>
        <Grid>商品詳細はこっち</Grid>
      </Grid>
    </div>
  );
};

export default ProductDetail;
