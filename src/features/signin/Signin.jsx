import React from "react";
import { useHistory } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { Button, Link, Typography } from "@mui/material";
import HeaderLogOut from "../../components/utils/HeaderLogOut";
import BoxMid from "../../components/MaterialUI/BoxMid";
import Form from "../../components/utils/Form";
import TextInputLoginId from "../../components/utils/TextInputLoginId";
import TextInputPassWord from "../../components/utils/TextInputPassWord";
import { useSignIn } from "../../hooks/userMutationHooks";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

/**
 * ログイン画面
 * @returns ログインコンポーネント
 */
export default function Signin() {
  const history = useHistory();
  const { signin } = useSignIn();

  const onSubmit = (data) => {
    signin.mutate(data, {
      onSuccess: () => {
        // ログインに成功したら商品一覧画面に遷移
        history.push("/product/list");
      },
    });
  };

  return (
    <div>
      <HeaderLogOut />
      <BoxMid>
        <Typography variant="h5" color="textSecondary" component="div">
          ログイン
        </Typography>
        <ToastContainer />
        <Form onSubmit={onSubmit}>
          <TextInputLoginId name="loginId" />
          <TextInputPassWord name="password" />
          <CustomDiv>
            <Button variant="contained" color="primary" type="submit">
              ログイン
            </Button>
          </CustomDiv>
          <CustomDiv>
            <Link href="/signup" underline="none">
              登録がまだの方はこちら
            </Link>
          </CustomDiv>
          <CustomDiv>
            <Link href="/resetPassword" underline="none">
              パスワードを忘れた方はこちら
            </Link>
          </CustomDiv>
        </Form>
      </BoxMid>
    </div>
  );
}

/** CSS */
const CustomDiv = styled("div")({
  textAlign: "center",
  margin: "5% auto",
});
