import React from "react";
import { useHistory } from "react-router-dom";
import useUserData from "../../hooks/user/useUserData";
import { styled } from "@mui/material/styles";
import { Grid, Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import Header from "../../components/utils/Header";
import BoxSx from "../../components/MaterialUI/BoxSx";
import Title from "../../components/MaterialUI/Title";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import { Button } from "@mui/material";

/**
 * マイプロフィールトップ
 * @returns 
 */
const MyProfile = () => {
  const history = useHistory();
  // ユーザー情報取得
  const { getUserData } = useUserData();
  if (getUserData.isLoading) {
    return <div>読み込み中...</div>;
  }
  const userData = getUserData.data;

  return (
    <div>
      <BoxSx>
        <Header />
        <Title
          title={`${userData.username}様の登録情報`}
          component="div"
          variant="h4"
          color="textSecondary"
        />
        <Grid container spacing={3} sx={{ width: "90%", margin: "0 auto" }}>
          <Grid item xs={12} sm={12} md={12}>
            {/** 会員登録情報 */}
            <StyledPaper elevation={3}>
              {/** タイトル */}
              <Typography
                component={"div"}
                variant={"h6"}
                sx={{
                  borderBottom: "solid 1px lightgray",
                }}
              >
                会員登録情報
              </Typography>
              <TableContainer>
                <Table>
                  <TableBody>
                    {/** 基本情報 */}
                    <TableRow>
                      <TableCell component="th" scope="row">
                        基本情報
                      </TableCell>
                      <TableCell>
                        {/** 名前 */}
                        <StyledPForPRofile>{userData.name}</StyledPForPRofile>
                        {/** 性別 */}
                        <StyledPForPRofile>{userData.gender}</StyledPForPRofile>
                        {/** 郵便番号 */}
                        <StyledPForPRofile>
                          〒{userData.zipCode}
                        </StyledPForPRofile>
                        {/** 住所１ */}
                        <StyledPForPRofile>
                          {userData.address1}
                        </StyledPForPRofile>
                        {/** 住所2 */}
                        <StyledPForPRofile>
                          {userData.address2}
                        </StyledPForPRofile>
                      </TableCell>
                      {/*  変更ボタン */}
                      <TableCell align="left">
                        <Button
                          variant="outlined"
                          size="small"
                          onClick={() =>
                            history.push("/myAccount/MyProfileEdit/")
                          }
                        >
                          変更
                        </Button>
                      </TableCell>
                    </TableRow>
                    {/** メールアドレス */}
                    <TableRow>
                      <TableCell component="th" scope="row">
                        メールアドレス
                      </TableCell>
                      <TableCell>{userData.loginId}</TableCell>
                      {/*  変更ボタン */}
                      <TableCell align="left">
                        <Button
                          variant="outlined"
                          size="small"
                          onClick={() =>
                            history.push("/myAccount/MailAddressEdit/")
                          }
                        >
                          変更
                        </Button>
                      </TableCell>
                    </TableRow>
                    {/** パスワード */}
                    <TableRow>
                      <TableCell component="th" scope="row">
                        パスワード
                      </TableCell>
                      <TableCell>*******</TableCell>
                      {/*  変更ボタン */}
                      <TableCell align="left">
                        <Button
                          variant="outlined"
                          size="small"
                          onClick={() =>
                            history.push("/myAccount/PasswordEdit/")
                          }
                        >
                          変更
                        </Button>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </StyledPaper>
          </Grid>
          {/** お届け先の追加 */}
          <Grid item xs={12} sm={12} md={12}>
            <StyledPaper elevation={3}>
              {/** タイトル */}
              <Typography
                component={"div"}
                variant={"h6"}
                sx={{
                  borderBottom: "solid 1px lightgray",
                }}
              >
                お届け先の追加・変更
              </Typography>
              <Typography component={"div"} variant={"body2"}>
                追加したお届け先はありません。追加したお届け先はありません。
              </Typography>
            </StyledPaper>
          </Grid>
          {/** クレジットカードの変更 */}
          <Grid item xs={12} sm={12} md={12}>
            <StyledPaper elevation={3}>
              {/** タイトル */}
              <Typography
                component={"div"}
                variant={"h6"}
                sx={{
                  borderBottom: "solid 1px lightgray",
                }}
              >
                クレジットカードの変更
              </Typography>
              <Typography component={"div"} variant={"body2"}>
                クレジットカード登録はありません。
              </Typography>
            </StyledPaper>
          </Grid>
        </Grid>
      </BoxSx>
    </div>
  );
};

export default MyProfile;

/* CSS */
const StyledPaper = styled(Paper)(({ theme }) => ({
  marginTop: theme.spacing(1),
  padding: theme.spacing(4),
  width: "80%",
  height: "auto",
  color: theme.palette.text.secondary,
  backgroundColor: "#f0f0f0",
}));

const StyledPForPRofile = styled("p")(({ theme }) => ({
  fontSize: "12px",
  marginTop: "1px",
  marginBottom: "1px",
}));
