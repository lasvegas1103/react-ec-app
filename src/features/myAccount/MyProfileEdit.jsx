import React, { useState } from "react";
import useUserData from "../../hooks/user/useUserData";
import useSearchAddress from "../../hooks/myAccount/useSearchAddress";
import { useUpdateMyProfile } from "../../hooks/myAccount/useUpdateMyProfile";
import { styled } from "@mui/material/styles";
import { Typography, Grid } from "@mui/material";
import Form from "../../components/utils/Form";
import MyProfileForm from "../../components/myAccount/MyProfileForm";
import MyProfileConfirm from "../../components/myAccount/MyProfileConfirm";
import MyProfileDone from "../../components/myAccount/MyProfileDone";
import Paper from "@mui/material/Paper";
import Header from "../../components/utils/Header";
import BoxSx from "../../components/MaterialUI/BoxSx";
import Title from "../../components/MaterialUI/Title";

/**
 * マイプロフィール（フォーム）
 * @returns
 */
const MyProfileEdit = () => {
  // 確認画面に切り替える制御
  const [isConfirm, setIsConfirm] = useState(false);
  // 完了画面に切り替える制御
  const [isDone, setIsDone] = useState(false);
  // 郵便で住所検索hook
  const { address, searchAddress } = useSearchAddress();
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
                {isConfirm ? "基本情報の変更" : "会員登録情報"}
              </Typography>
              {isDone ? (
                // 完了画面
                <MyProfileDone />
              ) : (
                <Form onSubmit={handleSubmit}>
                  {isConfirm ? (
                    // 確認画面
                    <MyProfileConfirm
                      isConfirm={isConfirm}
                      setIsConfirm={setIsConfirm}
                    />
                  ) : (
                    // フォーム画面
                    <MyProfileForm
                      address={address}
                      searchAddress={searchAddress}
                    />
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

export default MyProfileEdit;

/* CSS */
const StyledPaper = styled(Paper)(({ theme }) => ({
  marginTop: theme.spacing(1),
  padding: theme.spacing(4),
  width: "80%",
  height: "auto",
  backgroundColor: "#f0f0f0",
}));
