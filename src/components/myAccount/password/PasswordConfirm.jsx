import { memo } from "react";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";

/**
 * マイプロフィールメールアドレス(確認画面)
 */
const PasswordConfirm = memo(() => {
  return (
    <div>
      {/** メールアドレス */}
      <TableRow>
        <TableCell component="th" scope="row">
          メールアドレス
        </TableCell>
        <TableCell>*******</TableCell>
      </TableRow>
    </div>
  );
});

export default PasswordConfirm;
