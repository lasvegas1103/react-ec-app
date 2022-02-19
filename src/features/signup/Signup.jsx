import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Button, Snackbar, Alert } from "@mui/material";
import Form from "../../components/utils/Form";
import TextInputLoginId from "../../components/utils/TextInputLoginId";
import TextInputPassWord from "../../components/utils/TextInputPassWord";
import TextInputPassWordConfirm from "../../components/utils/TextInputPassWordConfirm";
import TextInputName from "../../components/utils/TextInputName";
import useMutationUserData from "../../hooks/useMutationUserData";

const Signup = () => {
  const history = useHistory();
  const { signup } = useMutationUserData();
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
    signup.mutate(data, {
      onSuccess: (res) => {
        if (res.snackStatus) setSnackStatus(res.snackStatus);
      },
    });
  };

  return (
    <>
      <div>会員登録</div>
      <Form onSubmit={onSubmit}>
        <TextInputName name="username" />
        <TextInputLoginId name="loginId" />
        <TextInputPassWord name="password" />
        <TextInputPassWordConfirm name="passwordConfirm" />
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
        <Button variant="contained" color="primary" type="submit">
          登録
        </Button>
      </Form>
    </>
  );
};

export default Signup;
