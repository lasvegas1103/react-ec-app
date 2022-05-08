import React from "react";
import { styled } from "@mui/material/styles";
import { Button, Link } from "@mui/material";
import Form from "../../components/utils/Form";
import TextInputLoginId from "../../components/utils/TextInputLoginId";
import TextInputPassWord from "../../components/utils/TextInputPassWord";
import useMutationUserData from "../../hooks/useMutationUserData";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CustomDiv = styled("div")({
  textAlign: "center",
  margin: "5% auto",
});

const Signin = () => {
  const { signin } = useMutationUserData();

  const onSubmit = (data) => {
    signin.mutate(data, {
      onSuccess: (res) => {
        console.log(res);
        if (res.isSuccess) toast.success(res.isSuccess);
      },
    });
  };

  return (
    <>
      <div>ログイン</div>
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
    </>
  );
};

export default Signin;
