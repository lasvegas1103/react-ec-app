import React from "react";
import Button from "@mui/material/Button";
import { createStyles, makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  button: {
    backgroundColor: "#4dd0e1",
    color: "#000",
    fontSize: 16,
    height: 48,
    marginBottom: 16,
    width: 256,
  },
});
const SendButton = React.memo((props) => {
  const classes = useStyles();
  return (
    <Button className={classes} variant="contained" onClick={props.onClick}>
      {props.label}
    </Button>
  );
});

export default SendButton;
