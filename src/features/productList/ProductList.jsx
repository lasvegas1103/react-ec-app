import React from "react";
import { useLocation } from "react-router-dom";
import { useHits } from "react-instantsearch-hooks-web";
import useChatQuery from "../../hooks/chat/useChatQuery";
import ProductCard from "../../components/product/ProductCard";
import { Grid } from "@mui/material";
import Header from "../../components/utils/Header";
import BoxSx from "../../components/MaterialUI/BoxSx";
import ModalCm from "../../components/MaterialUI/ModalCm";
import FloatingActionButton from "../../components/MaterialUI/FloatingActionButton";
import Title from "../../components/MaterialUI/Title";
import CustomPagination from "../../components/algolia/CustomPagination";

/**
 * 商品一覧画面
 * @returns
 */
const ProductList = () => {
  const search = useLocation().search;
  const queryString = new URLSearchParams(search);
  const isSignup = queryString.get("isSignup");

  // chatのgroupID取得
  const { getGroupID } = useChatQuery();

  // algoliaからヒットした商品を検索
  const { results } = useHits();
  if (results.nbHits === 0) {
    return <div>商品がありません</div>;
  }

  return (
    <div>
      {isSignup && <ModalCm />}
      <Header />
      <BoxSx>
        <Title
          title="商品一覧"
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
          {results.hits.map((hit) => (
            <Grid item xs={6} sm={6} md={6} key={hit.id}>
              <ProductCard productData={hit} />
            </Grid>
          ))}
        </Grid>
        {/** ページネーション */}
        <CustomPagination />
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
