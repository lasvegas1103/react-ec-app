import { memo } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import { Button } from "@mui/material";

/**
 * 確認画面
 */
const Confirm = memo(({ isConfirm, setIsConfirm, children }) => {
  return (
    <div>
      <TableContainer>
        <Table>
          <TableBody>{children}</TableBody>
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

export default Confirm;

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
