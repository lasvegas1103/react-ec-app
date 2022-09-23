import { memo } from "react";
import { useFormContext } from "react-hook-form";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";

/**
 * マイプロフィールメールアドレス(確認画面)
 */
const MailAddressConfirm = memo(({ isConfirm, setIsConfirm }) => {
  const methods = useFormContext();

  return (
    <div>
      {/** メールアドレス */}
      <TableRow>
        <TableCell component="th" scope="row">
          メールアドレス
        </TableCell>
        <TableCell>{methods.getValues("loginId")}</TableCell>
      </TableRow>
    </div>
  );
});

export default MailAddressConfirm;
