import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useQueryClient } from "react-query";
import { useInfiniteProductListByFavQuery } from "../../hooks/productHooks";
import ProductCard from "../../components/product/ProductCard";
import { Grid } from "@mui/material";
import DoDisturbOnIcon from "@mui/icons-material/DoDisturbOn";
import Header from "../../components/utils/Header";
import BoxSx from "../../components/MaterialUI/BoxSx";

const FavoriteDetail = () => {
  // キャッシュからUID取得
  const queryClient = useQueryClient();
  const { uid } = queryClient.getQueryData("loginData");

  //　お気に入り詳細画面に表示する商品情報を取得
  const { ref, inView } = useInView();
  const { data, isFetchingNextPage, hasNextPage, fetchNextPage } =
    useInfiniteProductListByFavQuery(uid);

  useEffect(() => {
    if (inView && hasNextPage) fetchNextPage();
  }, [inView]);

  return (
    <div>
      <Header />
      <BoxSx>
        <Grid container justifyContent="center" spacing={5}>
          {data?.pages &&
            data.pages.map((page) =>
              page.productData.map((d) => (
                <Grid item sm={2.5} xs={2.5} key={d.id}>
                  <div style={{ textAlign: "right" }}>
                    <DoDisturbOnIcon fontSize="small" color="action" />
                  </div>
                  <ProductCard productData={d} />
                </Grid>
              ))
            )}
        </Grid>
        <div ref={ref}>{isFetchingNextPage && "Loading..."}</div>
      </BoxSx>
    </div>
  );
};

export default FavoriteDetail;
