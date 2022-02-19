import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import { Button, Snackbar, Alert, Link } from "@mui/material";
import { useHistory } from "react-router-dom";
import Form from "../../components/utils/Form";
import TextInputLoginId from "../../components/utils/TextInputLoginId";
import TextInputPassWord from "../../components/utils/TextInputPassWord";
import useMutationUserData from "../../hooks/useMutationUserData";

const CustomDiv = styled("div")({
  textAlign: "center",
  margin: "5% auto",
});

const Signin = () => {
  const history = useHistory();
  const { signin } = useMutationUserData();
  const [snackStatus, setSnackStatus] = useState({
    open: false,
    type: "",
    message: "",
  });

  const handleClose = (event, reason) => {
    if (reason === "clickway") {
      return;
    }
    setSnackStatus({ ...snackStatus, open: false });
  };

  const onSubmit = (data) => {
    signin.mutate(data, {
      onSuccess: (res) => {
        console.log(res);
        if (res.snackStatus) setSnackStatus(res.snackStatus);
      },
    });
  };

  return (
    <>
      <div>ログイン</div>
      <Form onSubmit={onSubmit}>
        <TextInputLoginId name="loginId" />
        <TextInputPassWord name="password" />
        <Snackbar
          open={snackStatus.open}
          autoHideDuration={6000}
          onClose={handleClose}
        >
          <Alert
            onClose={handleClose}
            severity={snackStatus.type}
            sx={{ width: "100%" }}
          >
            {snackStatus.message}
          </Alert>
        </Snackbar>
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
