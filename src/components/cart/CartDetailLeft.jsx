import React from "react";
import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import BasicSelect from "../../components/utils/BasicSelect";

/**
 * カート詳細（左側）
 * @param {*} param0
 * @returns
 */
const CartDetailLeft = (props) => {
  const {
    getUserCartList,
    totalAmount,
    handleChangeCntAndUpdateCart,
    handleDeleteCart,
  } = props;

  return (
    <div>
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
                  {/*  数量 */}
                  <TableCell align="left" style={{ width: "3rem" }}>
                    <BasicSelect
                      func={(e) =>
                        handleChangeCntAndUpdateCart({
                          productId: row.productId,
                          sizeType: row.sizeType,
                          e: e,
                        })
                      }
                      cnt={row.remainingQuantity}
                      name={"数量"}
                      uniqueName={row.productId + row.sizeType}
                      defaultValue={row.quantity}
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
      <Total>
        <TotalAmount>商品合計：¥{totalAmount}</TotalAmount>
      </Total>
    </div>
  );
};

export default CartDetailLeft;

/** CSS */
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

const Total = styled("div")({
  // display: "flex",
  textAlign: "right",
});

const TotalAmount = styled("p")({
  paddingLeft: "25rem",
});
