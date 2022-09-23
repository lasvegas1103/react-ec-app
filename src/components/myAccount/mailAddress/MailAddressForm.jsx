import { memo, useEffect } from "react";
import { useQueryClient } from "react-query";
import { useFormContext } from "react-hook-form";
import TextInputLoginIdForMailAddress from "./TextInputLoginIdForMailAddress";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";

/**
 * マイプロフィール(メールアドレスフォーム)
 */
const MailAddressForm = memo(() => {
  const queryClient = useQueryClient();
  const methods = useFormContext();

  useEffect(() => {
    // すでに登録されている値を非同期でセットする
    const userData = queryClient.getQueryData("userData");
    methods.setValue("lognId", userData.loginId);
  }, []);

  return (
    <>
      {/** メールアドレス */}
      <TableRow>
        <TableCell component="th" scope="row">
          メールアドレス
        </TableCell>
        <TableCell>
          <TextInputLoginIdForMailAddress name="loginId" {...methods} />
        </TableCell>
      </TableRow>
    </>
  );
});

export default MailAddressForm;
