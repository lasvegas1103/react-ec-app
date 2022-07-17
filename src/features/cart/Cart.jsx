import React from "react";
import { Grid } from "@mui/material";
import { Typography } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import Header from "../../components/utils/Header";
import BoxSx from "../../components/MaterialUI/BoxSx";
import { useQueryClient } from "react-query";
import { useUserCartListQuery } from "../../hooks/userHooks";

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

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

const Cart = () => {
  // キャッシュからUID取得
  const queryClient = useQueryClient();
  const { uid } = queryClient.getQueryData("loginData");
  // ユーザーに紐づくカート情報を取得
  const { getUserCartList } = useUserCartListQuery({
    uid: uid,
  });
  console.log(getUserCartList.data);
  return (
    <div>
      <Header />
      <BoxSx>
        <Grid container>
          <Grid item xs={7}>
            {/*  タイトル */}
            <Typography variant="h5" gutterBottom component="div">
              ショッピングカート
            </Typography>
            {/*  カート詳細 */}
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableBody>
                  {getUserCartList.data?.length > 0 ? (
                    getUserCartList.data.map((row) => (
                      <TableRow
                        key={row.id}
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
                          <div>残り：{row.quantity}点</div>
                        </TableCell>
                        {/*  価格 */}
                        <TableCell align="left" style={{ width: "4rem" }}>
                          ¥{row.price}
                        </TableCell>
                        {/*  個数 */}
                        <TableCell align="left" style={{ width: "3rem" }}>
                          ※作成まだ
                        </TableCell>
                        {/*  削除リンク */}
                        <TableCell align="left" style={{ width: "3rem" }}>
                          削除
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
