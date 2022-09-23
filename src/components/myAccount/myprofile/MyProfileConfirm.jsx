import { memo } from "react";
import { useFormContext } from "react-hook-form";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";

/**
 * マイプロフィールメイン(確認画面)
 */
const MyProfileConfirm = memo(() => {
  const methods = useFormContext();

  return (
    <>
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
    </>
  );
});

export default MyProfileConfirm;
