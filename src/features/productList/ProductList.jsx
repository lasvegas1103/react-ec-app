import React from "react";
import InfiniteScroll from "react-infinite-scroller";
import useInfiniteQueryProductList from "../../hooks/useInfiniteQueryProductList";
import { styled } from "@mui/material/styles";
import {
  Card,
  Button,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Grid,
} from "@mui/material";

const C_produtList = styled("div")({
  display: "flex",
  maxWidth: "100%",
});

const C_margin = styled("div")({
  margin: "1rem",
});

const ProductList = () => {
  const { data, isLoading, isError, hasNextPage, fetchNextPage } =
    useInfiniteQueryProductList();
  console.log(data?.pages);
  console.log(hasNextPage);

  return (
    <Grid container spacing={2}>
      <Grid sm={2} />
      {isLoading ? (
        <p>読み込み中...</p>
      ) : isError ? (
        <p>読み込みに失敗しました</p>
      ) : (
        <InfiniteScroll hasMore={hasNextPage} loadMore={fetchNextPage}>
          {data?.pages?.map((page) => {
            page.productData.map((d) => {
              <Grid item sm={2.5} xs={4} key={d.id}>
                <Card sx={{ Width: 1000 }}>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      height="140px"
                      image="イメージパス"
                      title="Contemplative Reptile"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="h2">
                        タイトル
                      </Typography>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                      >
                        説明
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>;
            });
          })}
        </InfiniteScroll>
      )}
      <Grid sm={2} />
    </Grid>
  );
};

export default ProductList;
