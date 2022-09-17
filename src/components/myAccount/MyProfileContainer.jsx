import { memo } from "react";
import { useFormContext } from "react-hook-form";
import CheckBoxForMyProfile from "../../components/myAccount/CheckBoxForMyProfile";
import TextInputNameForMyProfile from "../../components/myAccount/TextInputNameForMyProfile";
import TextInputZipCodeForMyProfile from "../../components/myAccount/TextInputZipCodeForMyProfile";
import InputPrefecturesForMyProfile from "./InputPrefecturesForMyProfile";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import { Button } from "@mui/material";

/**
 * マイプロフィールメイン
 */
const MyProfileContainer = memo(({ address, searchAddress }) => {
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
            {/** 郵便番号 */}
            <TableRow>
              <TableCell component="th" scope="">
                郵便番号
              </TableCell>
              <TableCell>
                <TextInputZipCodeForMyProfile
                  name="zipCode"
                  searchAddress={searchAddress}
                  address={address}
                />
              </TableCell>
            </TableRow>
            {/** 都道府県 */}
            <TableRow>
              <TableCell component="th">都道府県</TableCell>
              <TableCell>
                <InputPrefecturesForMyProfile name="prefecture" {...methods} />
              </TableCell>
            </TableRow>
            {/** 住所１ */}
            <TableRow>
              <TableCell component="th">住所1</TableCell>
              <TableCell>住所1</TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th">住所2</TableCell>
              <TableCell>住所2</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <Button variant="contained" color="primary" type="submit">
        ログイン
      </Button>
    </div>
  );
});

export default MyProfileContainer;
