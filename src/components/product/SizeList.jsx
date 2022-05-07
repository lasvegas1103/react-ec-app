import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import AddCartButton from "./AddCartButton";
import AddFavoriteButton from "./AddFavoriteButton";

/* 商品詳細画面-サイズ一覧 */
const SizeList = (props) => {
  return (
    <TableContainer
      sx={{ width: "25rem", height: "100%", boxShadow: 0 }}
      component={Paper}
    >
      <Table sx={{ width: "100%" }} aria-label="simple table">
        <TableBody>
          {props.sizes.length > 0 &&
            props.sizes.map((size) => (
              <TableRow
                key={size.sizeType}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                {size.quantity > 0 ? (
                  <>
                    <TableCell component="th" scope="row">
                      {size.sizeType} / 在庫あり
                    </TableCell>
                    <TableCell>
                      <AddCartButton>カートに入れる</AddCartButton>
                    </TableCell>
                    <TableCell align="left">
                      <AddFavoriteButton />
                    </TableCell>
                  </>
                ) : (
                  <>
                    <TableCell component="th" scope="row">
                      {size.sizeType} / 在庫なし
                    </TableCell>
                    <TableCell align="right">完売しました</TableCell>
                  </>
                )}
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default SizeList;
