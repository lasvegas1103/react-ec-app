import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import useInfiniteQueryProductList from "../../hooks/useInfiniteQueryProductList";
import ProductCard from "../../components/product/ProductCard";
import { Grid } from "@mui/material";
import Header from "../../components/utils/Header";
import BoxSx from "../../components/MaterialUI/BoxSx";

const ProductList = () => {
  const { ref, inView } = useInView();
  const { data, isFetchingNextPage, hasNextPage, fetchNextPage } =
    useInfiniteQueryProductList();

  useEffect(() => {
    if (inView && hasNextPage) fetchNextPage();
  }, [inView]);

  return (
    <div>
      <Header />
      <BoxSx>
        <Grid container spacing={3}>
          {data?.pages &&
            data.pages.map((page) =>
              page.productData.map((d) => (
                <Grid item sm={4} xs={4} key={d.id}>
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

export default ProductList;
