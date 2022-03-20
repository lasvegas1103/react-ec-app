import React from "react";
import InfiniteScroll from "react-infinite-scroller";
import useInfiniteQueryProductList from "../../hooks/useInfiniteQueryProductList";
import ProductCard from "../../components/product/ProductCard";
import { styled } from "@mui/material/styles";
import { Grid } from "@mui/material";

const C_produtList = styled("div")({
  display: "flex",
  maxWidth: "100%",
});

const C_margin = styled("div")({
  margin: "1rem",
});

const ProductList = () => {
  const { data, hasNextPage, fetchNextPage } = useInfiniteQueryProductList();
  console.log(data);
  console.log(hasNextPage);

  return (
    <InfiniteScroll
      hasMore={hasNextPage}
      loader={<h4>Loading...</h4>}
      loadMore={fetchNextPage}
      useWindow={false}
    >
      <Grid container spacing={2}>
        {data?.pages &&
          data.pages.map((page) =>
            page.productData.map((d) => (
              <Grid item sm={4} xs={4} key={d.id}>
                <ProductCard productData={d} />
              </Grid>
            ))
          )}
      </Grid>
    </InfiniteScroll>
  );
};

export default ProductList;
