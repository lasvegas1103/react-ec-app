import { memo } from "react";
import { useFormContext } from "react-hook-form";
import CheckBoxForMyProfile from "../../components/myAccount/CheckBoxForMyProfile";
import TextInputNameForMyProfile from "../../components/myAccount/TextInputNameForMyProfile";
import TextInputZipCodeForMyProfile from "../../components/myAccount/TextInputZipCodeForMyProfile";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import { Button } from "@mui/material";

/**
 * マイプロフィールメイン
 */
const MyProfileContainer = memo(() => {
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
              <TableCell>
                <TextInputNameForMyProfile name="name" {...methods} />
              </TableCell>
            </TableRow>
            {/** 性別 */}
            <TableRow>
              <TableCell component="th" scope="row">
                性別
              </TableCell>
              <TableCell>
                <CheckBoxForMyProfile name="gender" {...methods} />
              </TableCell>
            </TableRow>
            {/** 住所 */}
            <TableRow>
              <TableCell component="th" scope="row">
                住所
              </TableCell>
              <TableCell>
                <TextInputZipCodeForMyProfile name="zipCode" onClick={""} />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <Button
        variant="contained"
        color="primary"
        type="submit"
        disabled={!methods.formState.isDirty}
      >
        ログイン
      </Button>
    </div>
  );
});

export default MyProfileContainer;
