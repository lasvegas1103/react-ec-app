import React from "react";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import SendIcon from "@mui/icons-material/Send";
import { IconButton } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";

const CTextField = styled(TextField)(({ theme }) => ({
  position: "fixed",
  display: "flex",
  width: "100%",
  bottom: "0",
  zIndex: "1",
}));

/**
 * チャットメッセージ送信ボタン
 *
 */
const SendMessage = React.memo((props) => {
  const handleChange = (event) => {
    props.setChatMessage(event.target.value);
  };

  const handleClick = () => {
    // ユーザーのメッセージを保存
    props.sendChatMessage({
      chatMessage: props.chatMessage,
      groupID: props.groupID,
    });

    // botのメッセージ取得＆保存
    props.getAndSaveBotMessage({
      chatMessage: props.chatMessage,
      groupID: props.groupID,
    });

    // message初期化
    props.setChatMessage("");
  };

  return (
    <CTextField
      sx={{ backgroundColor: "#FFF" }}
      id="filled-multiline-flexible"
      label="メッセージを入力"
      multiline
      maxRows={4}
      value={props.chatMessage}
      onChange={handleChange}
      variant="filled"
      fullWidth
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton color="primary" size="large" onClick={handleClick}>
              <SendIcon />
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
});

export default SendMessage;
