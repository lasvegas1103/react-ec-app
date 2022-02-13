import React from "react";
import { createStyles, makeStyles, Theme } from "@mui/styles";
import { Avatar } from "@mui/material";
import { deepOrange } from "@mui/material/colors";

const useStyles = makeStyles((theme) =>
  createStyles({
    messageRow: {
      display: "flex",
      margin: "0 0 0 2rem",
    },
    messageRowRight: {
      display: "flex",
      justifyContent: "flex-end",
      margin: "0 2rem 0 0",
    },
    messageBlue: {
      position: "relative",
      marginLeft: "0px",
      marginBottom: "2rem",
      width: "20rem",
      padding: "10px",
      backgroundColor: "#A8DDFD",
      textAlign: "left",
      font: "400 .9em 'Open Sans', sans-serif",
      border: "1px solid #97C6E3",
      borderRadius: "10px",
      wordWrap: "break-word",
    },
    messageOrange: {
      position: "relative",
      marginRight: "0.3rem",
      marginBottom: "2rem",
      width: "20rem",
      padding: "10px",
      backgroundColor: "#f8e896",
      textAlign: "left",
      font: "400 .9em 'Open Sans', sans-serif",
      border: "1px solid #dfd087",
      borderRadius: "10px",
      wordWrap: "break-word",
    },

    messageContent: {
      padding: 0,
      margin: 0,
      width: "100%",
    },
    messageTimeStampt: {
      position: "flex",
      fontSize: ".85em",
      fontWeight: "300",
      marginTop: "2rem",
      bottom: "-3px",
      right: "5px",
    },

    orange: {
      color: deepOrange[500],
      backgroundColor: deepOrange[500],
      width: 4,
      height: 4,
    },
    avatarNothing: {
      color: "transparent",
      backgroundColor: "transparent",
      width: 4,
      height: 4,
    },
    displayName: {
      marginLeft: "20px",
    },
  })
);

// メッセージリスト
export const Message = (props) => {
  const message = props.message ? props.message : "no message";
  const timestamp = props.timestamp ? props.timestamp : "";
  const photoURL = props.photoURL ? props.photoURL : "dummy.js";
  let displayName = props.displayName ? props.displayName : "";
  displayName = props.type === "user" ? "" : displayName;
  const classes = useStyles();
  const messagePotision =
    props.type === "user" ? classes.messageRowRight : classes.messageRow;
  const messageColor =
    props.type === "user" ? classes.messageBlue : classes.messageOrange;
  return (
    <>
      <div className={messagePotision}>
        {props.type === "user" && (
          <div className={classes.messageTimeStampt}>{timestamp}</div>
        )}
        {props.avatarDisp && (
          <Avatar
            alt={displayName}
            className={classes.orange}
            src={photoURL}
          ></Avatar>
        )}
        <div>
          <div className={classes.displayName}>{displayName}</div>
          <div className={messageColor}>
            <div>
              <p className={classes.messageContent}>{message}</p>
            </div>
          </div>
        </div>
        {props.type !== "user" && (
          <div className={classes.messageTimeStampt}>{timestamp}</div>
        )}
      </div>
    </>
  );
};
