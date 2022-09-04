import React from "react";
import useUserData from "../../hooks/user/useUserData";
import { useHistory } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { Button, Typography, Link, Grid } from "@mui/material";
import Form from "../../components/utils/Form";
import TextInputNameForMyProfile from "../../components/myAccount/TextInputNameForMyProfile";
import Paper from "@mui/material/Paper";
import Header from "../../components/utils/Header";
import BoxSx from "../../components/MaterialUI/BoxSx";
import Title from "../../components/MaterialUI/Title";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";

/**
 * マイプロフィール（フォーム）
 * @returns
 */
const MyProfileForm = () => {
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
                    <Form>
                      {/** 名前 */}
                      <TableRow>
                        <TableCell component="th" scope="row">
                          お名前
                        </TableCell>
                        <TableCell>
                          <TextInputNameForMyProfile name="name" />
                        </TableCell>
                      </TableRow>
                      {/** メールアドレス */}
                      <TableRow>
                        <TableCell component="th" scope="row">
                          メールアドレス
                        </TableCell>
                        <TableCell>基本情報詳細</TableCell>
                      </TableRow>
                      {/** パスワード */}
                      <TableRow>
                        <TableCell component="th" scope="row">
                          パスワード
                        </TableCell>
                        <TableCell>基本情報詳細</TableCell>
                      </TableRow>
                      <Button variant="contained" color="primary" type="submit">
                        ログイン
                      </Button>
                    </Form>
                  </TableBody>
                </Table>
              </TableContainer>
            </StyledPaper>
          </Grid>
        </Grid>
      </BoxSx>
    </div>
  );
};

export default MyProfileForm;

/* CSS */
const StyledPaper = styled(Paper)(({ theme }) => ({
  marginTop: theme.spacing(1),
  padding: theme.spacing(4),
  width: "80%",
  height: "auto",
  color: theme.palette.text.secondary,
  backgroundColor: "#f0f0f0",
}));
