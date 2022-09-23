import React, { useState } from "react";
import useUserData from "../../hooks/user/useUserData";
import { useUpdateMyProfile } from "../../hooks/myAccount/useUpdateMyProfile";
import { styled } from "@mui/material/styles";
import { Typography, Grid } from "@mui/material";
import Form from "../../components/utils/Form";
import Edit from "../../components/myAccount/common/Edit";
import Confirm from "../../components/myAccount/common/Confirm";
import Done from "../../components/myAccount/common/Done";
import PasswordForm from "../../components/myAccount/password/PasswordForm";
import PasswordConfirm from "../../components/myAccount/password/PasswordConfirm";
import Paper from "@mui/material/Paper";
import Header from "../../components/utils/Header";
import BoxSx from "../../components/MaterialUI/BoxSx";
import Title from "../../components/MaterialUI/Title";

/**
 * マイプロフィール（パスワード）
 * @returns
 */
const PasswordEdit = () => {
  // 確認画面に切り替える制御
  const [isConfirm, setIsConfirm] = useState(false);
  // 完了画面に切り替える制御
  const [isDone, setIsDone] = useState(false);
  // マイプロフィール更新
  const { updateMyProfile } = useUpdateMyProfile();

  // ユーザー情報取得
  const { getUserData } = useUserData();
  if (getUserData.isLoading) {
    return <div>読み込み中...</div>;
  }
  const userData = getUserData.data;

  const handleSubmit = (formData) => {
    if (isConfirm) {
      updateMyProfile.mutate(
        {
          uid: userData.uid,
          formData: formData,
        },
        {
          onSuccess: () => {
            // 完了画面表示
            setIsDone(!isDone);
          },
        }
      );
    } else {
      // 確認画面を表示
      setIsConfirm(!isConfirm);
    }
  };

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
                {isConfirm ? "パスワードの変更" : "パスワードの変更"}
              </Typography>
              {isDone ? (
                // 完了画面
                <Done />
              ) : (
                <Form onSubmit={handleSubmit}>
                  {isConfirm ? (
                    // 確認画面
                    <Confirm isConfirm={isConfirm} setIsConfirm={setIsConfirm}>
                      <PasswordConfirm />
                    </Confirm>
                  ) : (
                    // フォーム画面
                    <Edit>
                      <PasswordForm />
                    </Edit>
                  )}
                </Form>
              )}
            </StyledPaper>
          </Grid>
        </Grid>
      </BoxSx>
    </div>
  );
};

export default PasswordEdit;

/* CSS */
const StyledPaper = styled(Paper)(({ theme }) => ({
  marginTop: theme.spacing(1),
  padding: theme.spacing(4),
  width: "80%",
  height: "auto",
  backgroundColor: "#f0f0f0",
}));
