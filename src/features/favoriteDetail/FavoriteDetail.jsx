import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useQueryClient } from "react-query";
import { useInfiniteProductListByFavQuery } from "../../hooks/productHooks";
import { useDeleteFavorite } from "../../hooks/userMutationHooks";
import { Grid } from "@mui/material";
import ProductCard from "../../components/product/ProductCard";
import DeleteIcon from "../../components/product/DeleteIcon";
import Header from "../../components/utils/Header";
import BoxSx from "../../components/MaterialUI/BoxSx";
import Title from "../../components/MaterialUI/Title";

/**
 * お気に入り一覧画面
 * @returns
 */
const FavoriteDetail = () => {
  // キャッシュからUID取得
  const queryClient = useQueryClient();
  const { uid } = queryClient.getQueryData("loginData");

  //　お気に入り詳細画面に表示する商品情報を取得
  const { ref, inView } = useInView();
  const { data, isFetchingNextPage, hasNextPage, fetchNextPage } =
    useInfiniteProductListByFavQuery(uid);

  // お気に入りから削除
  const { deleteFavorite } = useDeleteFavorite();
  const deleteFav = (productId) => {
    const deleteFavoriteData = {
      uid: uid,
      productId: productId,
    };
    if (uid) deleteFavorite.mutate(deleteFavoriteData);
  };

  useEffect(() => {
    if (inView && hasNextPage) fetchNextPage();
  }, [inView]);

  return (
    <div>
      <Header />
      <BoxSx>
        <Title
          title="お気に入り"
          component="div"
          variant="h4"
          color="textSecondary"
        />
        <Grid
          container
          spacing={3}
          columns={{ xs: 12, sm: 30, md: 30 }}
          columnSpacing={2}
          sx={{ width: "90%", margin: "0 auto" }}
        >
          {data?.pages[0]?.productData?.length > 0 ? (
            data.pages.map((page) =>
              page.productData.map((d) => (
                <Grid item spacing={5} xs={6} sm={6} md={6} key={d.id}>
                  <div style={{ textAlign: "right", marginBottom: "-1rem" }}>
                    <DeleteIcon
                      fontSize="small"
                      color="action"
                      func={() => deleteFav(d.id)}
                    />
                  </div>
                  <ProductCard productData={d} />
                </Grid>
              ))
            )
          ) : (
            <Grid item>お気に入りにアイテムの登録がありません</Grid>
          )}
        </Grid>
        <div ref={ref}>{isFetchingNextPage && "Loading..."}</div>
      </BoxSx>
    </div>
  );
};

export default FavoriteDetail;
