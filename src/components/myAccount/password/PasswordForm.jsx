import { memo, useEffect } from "react";
import { useFormContext } from "react-hook-form";
import TextInputPassWordForPW from "./TextInputPassWordForPW";
import TextInputPassWordConfirmForPW from "./TextInputPassWordConfirmForPW";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";

/**
 * マイプロフィール(パスワード)
 */
const PasswordForm = memo(() => {
  const methods = useFormContext();

  useEffect(() => {
    // 空文字をセット
    methods.setValue("password", "");
    methods.setValue("passwordConfirm", "");
  }, []);

  return (
    <>
      {/** パスワード */}
      <TableRow>
        <TableCell component="th" scope="row">
          パスワード
        </TableCell>
        <TableCell>
          <TextInputPassWordForPW name="password" {...methods} />
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell component="th" scope="row">
          パスワード（確認用）
        </TableCell>
        <TableCell>
          <TextInputPassWordConfirmForPW name="passwordConfirm" {...methods} />
        </TableCell>
      </TableRow>
    </>
  );
});

export default PasswordForm;
