import { memo, useEffect } from "react";
import { useQueryClient } from "react-query";
import { useFormContext } from "react-hook-form";
import CheckBoxForMyProfile from "./CheckBoxForMyProfile";
import TextInputNameForMyProfile from "./TextInputNameForMyProfile";
import TextInputZipCodeForMyProfile from "./TextInputZipCodeForMyProfile";
import InputPrefecturesForMyProfile from "./InputPrefecturesForMyProfile";
import TextInputAddress1ForMyProfile from "./TextInputAddress1ForMyProfile";
import TextInputAddress2ForMyProfile from "./TextInputAddress2ForMyProfile";
import TextInputTelNumberForMyProfile from "./TextInputTelNumberForMyProfile";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";

/**
 * マイプロフィールメイン(フォーム)
 */
const MyProfileForm = memo(({ address, searchAddress }) => {
  const queryClient = useQueryClient();
  const methods = useFormContext();

  useEffect(() => {
    // すでに登録されている値を非同期でセットする
    const userData = queryClient.getQueryData("userData");
    methods.setValue("name", userData.name);
    methods.setValue("gender", userData.gender);
    methods.setValue("zipCode", userData.zipCode);
    methods.setValue("prefecture", userData.prefecture);
    methods.setValue("address1", userData.address1);
    methods.setValue("address2", userData.address2);
    methods.setValue("telNumber", userData.telNumber);
  }, []);

  useEffect(() => {
    // 郵便番号から住所を検索したときは、非同期で値をセットする
    let prefectureName, address1;
    if (address !== "") {
      prefectureName = address?.address1;
      address1 = address.address2 + address.address3;

      methods.setValue("prefecture", prefectureName);
      methods.setValue("address1", address1);
    }
  }, [address, methods]);

  return (
    <>
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
    </>
  );
});

export default MyProfileForm;
