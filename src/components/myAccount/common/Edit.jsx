import { memo } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import { Button } from "@mui/material";

/**
 * フォーム
 */
const Edit = memo(({ children }) => {
  return (
    <div>
      <TableContainer>
        <Table>
          <TableBody>{children}</TableBody>
        </Table>
      </TableContainer>
      <StyledButton variant="contained" color="primary" type="submit">
        確認する
      </StyledButton>
    </div>
  );
});

export default Edit;

/* CSS */
const StyledButton = styled(Button)(({ theme }) => ({
  margin: "25px 40% 0 40%",
  width: "170px",
  backgroundColor: "#23ABDD",
}));
