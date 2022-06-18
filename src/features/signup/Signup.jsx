import React from "react";
import { useHistory } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { Button, Typography, Link } from "@mui/material";
import Form from "../../components/utils/Form";
import TextInputLoginId from "../../components/utils/TextInputLoginId";
import TextInputPassWord from "../../components/utils/TextInputPassWord";
import TextInputPassWordConfirm from "../../components/utils/TextInputPassWordConfirm";
import TextInputName from "../../components/utils/TextInputName";
import HeaderLogOut from "../../components/utils/HeaderLogOut";
import BoxMid from "../../components/MaterialUI/BoxMid";
import { useSignUp } from "../../hooks/userMutationHooks";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CustomDiv = styled("div")({
  textAlign: "center",
  margin: "5% auto",
});

const Signup = () => {
  const history = useHistory();
  const { signup } = useSignUp();

  const onSubmit = (data) => {
    signup.mutate(data, {
      onSuccess: (res) => {
        // 会員登録が成功したら、商品一覧画面に遷移
        history.push("/product/list/?isSignup=true");
      },
      onError: () => {
        // 会員登録に失敗
        toast.error("会員登録に失敗しました。再度ご登録お願いします。");
      },
    });
  };

  return (
    <>
      <HeaderLogOut />
      <BoxMid>
        <Typography variant="h5" color="textSecondary" component="div">
          会員登録
        </Typography>
        <ToastContainer />
        <Form onSubmit={onSubmit}>
          <TextInputName name="username" />
          <TextInputLoginId name="loginId" />
          <TextInputPassWord name="password" />
          <TextInputPassWordConfirm name="passwordConfirm" />
          <CustomDiv>
            <Button variant="contained" color="primary" type="submit">
              登録
            </Button>
          </CustomDiv>
          <CustomDiv>
            <Link href="/signin" underline="none">
              ログインはこちら
            </Link>
          </CustomDiv>
        </Form>
      </BoxMid>
    </>
  );
};

export default Signup;
