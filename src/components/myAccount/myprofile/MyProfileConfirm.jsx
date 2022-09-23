import { memo } from "react";
import { useFormContext } from "react-hook-form";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import { Button } from "@mui/material";

/**
 * マイプロフィールメイン(確認画面)
 */
const MyProfileConfirm = memo(({ isConfirm, setIsConfirm }) => {
  const methods = useFormContext();

  return (
    <div>
      <TableContainer>
        <Table>
          <TableBody>
            {/** 名前 */}
            <TableRow>
              <TableCell component="th" scope="row">
                お名前
              </TableCell>
              <TableCell>{methods.getValues("name")}</TableCell>
            </TableRow>
            {/** 性別 */}
            <TableRow>
              <TableCell component="th" scope="row">
                性別
              </TableCell>
              <TableCell>{methods.getValues("gender")}</TableCell>
            </TableRow>
            {/** 郵便番号 */}
            <TableRow>
              <TableCell component="th" scope="">
                郵便番号
              </TableCell>
              <TableCell>{methods.getValues("zipCode")}</TableCell>
            </TableRow>
            {/** 都道府県 */}
            <TableRow>
              <TableCell component="th">都道府県</TableCell>
              <TableCell>{methods.getValues("prefecture")}</TableCell>
            </TableRow>
            {/** 住所1 */}
            <TableRow>
              <TableCell component="th">住所1</TableCell>
              <TableCell>{methods.getValues("address1")}</TableCell>
            </TableRow>
            {/** 住所2 */}
            <TableRow>
              <TableCell component="th">住所2</TableCell>
              <TableCell>{methods.getValues("address2")}</TableCell>
            </TableRow>
            {/** 電話番号 */}
            <TableRow>
              <TableCell component="th">電話番号</TableCell>
              <TableCell>{methods.getValues("telNumber")}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <StyledButtonWrapper>
        <StyledButton
          variant="outlined"
          color="primary"
          onClick={(e) => {
            e.preventDefault();
            setIsConfirm(!isConfirm);
          }}
        >
          戻る
        </StyledButton>
        <StyledButton variant="contained" color="primary" type="submit">
          変更する
        </StyledButton>
      </StyledButtonWrapper>
    </div>
  );
});

export default MyProfileConfirm;

/* CSS */
const StyledButton = styled(Button)(() => ({
  marginTop: "25px",
  marginRight: "5px",
  width: "170px",
}));

const StyledButtonWrapper = styled("div")(() => ({
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
}));
