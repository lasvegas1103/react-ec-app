import React, { useEffect } from "react";
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
import SettingsIcon from "@mui/icons-material/Settings";

const MyProfile = () => {
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
                      <TableCell>基本情報詳細</TableCell>
                      {/*  変更ボタン */}
                      <TableCell align="left">
                        <Button
                          variant="outlined"
                          size="small"
                          startIcon={<SettingsIcon />}
                          onClick={""}
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
                      <TableCell>基本情報詳細</TableCell>
                      {/*  変更ボタン */}
                      <TableCell align="left">
                        <Button
                          variant="outlined"
                          size="small"
                          startIcon={<SettingsIcon />}
                          onClick={""}
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
                      <TableCell>基本情報詳細</TableCell>
                      {/*  変更ボタン */}
                      <TableCell align="left">
                        <Button
                          variant="outlined"
                          size="small"
                          startIcon={<SettingsIcon />}
                          onClick={""}
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
                お届け先の追加
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
