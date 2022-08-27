import React, { useEffect } from "react";
import { useQueryClient } from "react-query";
import { Grid, Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import Header from "../../components/utils/Header";
import BoxSx from "../../components/MaterialUI/BoxSx";
import BasicSelect from "../../components/utils/BasicSelect";
import Title from "../../components/MaterialUI/Title";
import { useUserCartListQuery } from "../../hooks/cart/useUserCartListQuery";
import { useDeleteCart } from "../../hooks/cart/useDeleteCart";
import useCalcTotalAmount from "../../hooks/cart/useCalcTotalAmount";

const Cimage = styled("img")({
  height: "auto",
  width: "auto",
  maxWidth: "100%",
  maxHeight: "100%",
  position: "absolute",
  top: "0",
  bottom: "0",
  left: "0",
  right: "0",
  margin: "auto",
});

const CCardMedia = styled("div")({
  height: "150px",
  width: "125px",
  position: "relative",
  margin: "0",
});

/**
 * カート詳細画面
 * @returns
 */
const Cart = () => {
  // キャッシュからUID取得
  const queryClient = useQueryClient();
  const { uid } = queryClient.getQueryData("loginData");
  // 合計金額用のカスタムフック
  const { totalAmount, calcTotalAmount } = useCalcTotalAmount();
  // ユーザーに紐づくカート情報を取得
  const { getUserCartList } = useUserCartListQuery({
    uid: uid,
  });
  // カートの商品を削除
  const { deleteCart } = useDeleteCart();

  // 数量を選択
  const handleChangeCnt = (event) => {
    // setQuantity(event.target.value);
  };

  // カートから商品を削除
  const handleDeleteCart = ({ productId, sizeType }) => {
    deleteCart.mutate({
      uid: uid,
      productId: productId,
      sizeType: sizeType,
    });
  };

  useEffect(() => {
    //合計金額を計算
    calcTotalAmount();
  }, [calcTotalAmount, totalAmount]);

  return (
    <div>
      <Header />
      <BoxSx>
        {/*  タイトル */}
        <Title
          title="ショッピングカート"
          component="div"
          variant="h4"
          color="textSecondary"
        />
        <Grid
          container
          columnSpacing={2}
          sx={{ width: "90%", margin: "0 auto" }}
        >
          <Grid item xs={7}>
            {/*  カート詳細 */}
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableBody>
                  {getUserCartList.data?.length > 0 ? (
                    getUserCartList.data.map((row) => (
                      <TableRow
                        key={row.productId + row.sizeType}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        {/*  画像 */}
                        <TableCell
                          component="th"
                          scope="row"
                          style={{ width: "125px" }}
                        >
                          <CCardMedia>
                            <Cimage src={row.images[0]?.path} alt={row.title} />
                          </CCardMedia>
                        </TableCell>
                        {/*  タイトルなど */}
                        <TableCell align="left" style={{ width: "7rem" }}>
                          <div>{row.title}</div>
                          <div>サイズ：{row.sizeType}</div>
                        </TableCell>
                        {/*  価格 */}
                        <TableCell align="left" style={{ width: "4rem" }}>
                          ¥{row.price}
                        </TableCell>
                        {/*  個数 */}
                        <TableCell align="left" style={{ width: "3rem" }}>
                          <BasicSelect
                            func={handleChangeCnt}
                            cnt={row.quantity}
                            name={"数量"}
                            uniqueName={row.productId + row.sizeType}
                          />
                        </TableCell>
                        {/*  削除ボタン */}
                        <TableCell align="left" style={{ width: "3rem" }}>
                          <Button
                            variant="outlined"
                            size="small"
                            startIcon={<DeleteIcon />}
                            onClick={() =>
                              handleDeleteCart({
                                productId: row.productId,
                                sizeType: row.sizeType,
                              })
                            }
                          >
                            削除
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                        boxShadow: 0,
                      }}
                    >
                      <TableCell>カートに商品がありません</TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            <div>
              <div>商品合計</div>
              <div>{totalAmount}</div>
            </div>
          </Grid>
          <Grid item xs={5}>
            test2
          </Grid>
        </Grid>
      </BoxSx>
    </div>
  );
};

export default Cart;
