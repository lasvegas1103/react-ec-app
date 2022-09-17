import { memo, useEffect } from "react";
import { useFormContext } from "react-hook-form";
import CheckBoxForMyProfile from "../../components/myAccount/CheckBoxForMyProfile";
import TextInputNameForMyProfile from "../../components/myAccount/TextInputNameForMyProfile";
import TextInputZipCodeForMyProfile from "../../components/myAccount/TextInputZipCodeForMyProfile";
import InputPrefecturesForMyProfile from "./InputPrefecturesForMyProfile";
import TextInputAddress1ForMyProfile from "./TextInputAddress1ForMyProfile";
import TextInputAddress2ForMyProfile from "./TextInputAddress2ForMyProfile";
import TextInputTelNumberForMyProfile from "./TextInputTelNumberForMyProfile";
import { styled } from "@mui/material/styles";
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

  useEffect(() => {
    // 郵便番号から住所を検索したときは、非同期で値をセットする
    let prefectureName, address1;
    if (address !== "") {
      prefectureName = address?.address1;
      address1 = address.address2 + address.address3;
    }
    methods.setValue("prefecture", prefectureName);
    methods.setValue("address1", address1);
  });

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
                  {...methods}
                />
              </TableCell>
            </TableRow>
            {/** 都道府県 */}
            <TableRow>
              <TableCell component="th">都道府県</TableCell>
              <TableCell>
                <InputPrefecturesForMyProfile
                  name="prefecture"
                  address={address}
                  {...methods}
                />
              </TableCell>
            </TableRow>
            {/** 住所1 */}
            <TableRow>
              <TableCell component="th">住所1</TableCell>
              <TableCell>
                <TextInputAddress1ForMyProfile
                  name="address1"
                  address={address}
                  {...methods}
                />
              </TableCell>
            </TableRow>
            {/** 住所2 */}
            <TableRow>
              <TableCell component="th">住所2</TableCell>
              <TableCell>
                <TextInputAddress2ForMyProfile name="address2" {...methods} />
              </TableCell>
            </TableRow>
            {/** 電話番号 */}
            <TableRow>
              <TableCell component="th">電話番号</TableCell>
              <TableCell>
                <TextInputTelNumberForMyProfile name="telNumber" {...methods} />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <StyledButton variant="contained" color="primary" type="submit">
        確認する
      </StyledButton>
    </div>
  );
});

export default MyProfileContainer;

/* CSS */
const StyledButton = styled(Button)(({ theme }) => ({
  margin: "25px 40% 0 40%",
  width: "170px",
  backgroundColor: "#23ABDD",
}));
