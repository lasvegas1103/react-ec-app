import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import useInfiniteQueryProductList from "../../hooks/useInfiniteQueryProductList";
import useChatQuery from "../../hooks/chat/useChatQuery";
import ProductCard from "../../components/product/ProductCard";
import { Grid } from "@mui/material";
import Header from "../../components/utils/Header";
import BoxSx from "../../components/MaterialUI/BoxSx";
import ModalCm from "../../components/MaterialUI/ModalCm";
import FloatingActionButton from "../../components/MaterialUI/FloatingActionButton";

/**
 * 商品一覧画面
 * @returns
 */
const ProductList = () => {
  const search = useLocation().search;
  const queryString = new URLSearchParams(search);
  const isSignup = queryString.get("isSignup");

  const { ref, inView } = useInView();
  const { data, isFetchingNextPage, hasNextPage, fetchNextPage } =
    useInfiniteQueryProductList();

  // chatのgroupID取得
  const { getGroupID } = useChatQuery();

  useEffect(() => {
    if (inView && hasNextPage) fetchNextPage();
  }, [inView]);

  return (
    <div>
      {isSignup && <ModalCm />}
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
      {/** チャットbot */}
      {getGroupID.status === "success" && (
        <FloatingActionButton
          name={"チャットbotに質問する"}
          color={"primary"}
          variant={"extended"}
          to={`/chat/${getGroupID.data}`}
        />
      )}
    </div>
  );
};

export default ProductList;
