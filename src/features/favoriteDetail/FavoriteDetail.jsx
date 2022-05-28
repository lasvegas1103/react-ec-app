import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useInfiniteProductListByFavQuery } from "../../hooks/productHooks";
import ProductCard from "../../components/product/ProductCard";
import { Grid } from "@mui/material";
import Header from "../../components/utils/Header";
import BoxSx from "../../components/MaterialUI/BoxSx";

const FavoriteDetail = () => {
  const { ref, inView } = useInView();
  const { data, isFetchingNextPage, hasNextPage, fetchNextPage } =
    useInfiniteProductListByFavQuery();

  useEffect(() => {
    if (inView && hasNextPage) fetchNextPage();
  }, [inView]);

  return (
    <div>
      <Header />
      <BoxSx>
        <Grid container justifyContent="center" spacing={3}>
          {data?.pages &&
            data.pages.map((page) =>
              page.productData.map((d) => (
                <Grid item sm={2.5} xs={2.5} key={d.id}>
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
