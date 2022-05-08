import React from "react";
import { Button } from "@mui/material";
import Form from "../../components/utils/Form";
import TextInputLoginId from "../../components/utils/TextInputLoginId";
import TextInputPassWord from "../../components/utils/TextInputPassWord";
import TextInputPassWordConfirm from "../../components/utils/TextInputPassWordConfirm";
import TextInputName from "../../components/utils/TextInputName";
import useMutationUserData from "../../hooks/useMutationUserData";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signup = () => {
  const { signup } = useMutationUserData();

  const onSubmit = (data) => {
    signup.mutate(data, {
      onSuccess: (res) => {
        if (res.isSuccess) toast.success(res.isSuccess);
      },
    });
  };

  return (
    <>
      <div>会員登録</div>
      <ToastContainer />
      <Form onSubmit={onSubmit}>
        <TextInputName name="username" />
        <TextInputLoginId name="loginId" />
        <TextInputPassWord name="password" />
        <TextInputPassWordConfirm name="passwordConfirm" />
        <Button variant="contained" color="primary" type="submit">
          登録
        </Button>
      </Form>
    </>
  );
};

export default Signup;
