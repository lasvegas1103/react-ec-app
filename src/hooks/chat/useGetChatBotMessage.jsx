import { useCallback } from "react";
import { db, FirebaseTimeStamp, auth } from "../../firebase";
import { collection, addDoc } from "firebase/firestore";
import axios from "axios";

/**
 * botメッセージを取得＆保存
 *
 */
const useGetChatBotMessage = () => {
  const getAndSaveBotMessage = useCallback(async ({ chatMessage, groupID }) => {
    const apiKey = "83d064c4352c86fa8ab0";
    const { data } = await axios.get(
      `https://chatbot-api.userlocal.jp/api/chat?message=${chatMessage}&key=${apiKey}`
    );

    // 取得に失敗したら返す
    if (data.status !== "success") return;
    const botMessageData = {
      message: data.result,
      registdate_at: FirebaseTimeStamp.now(),
      userID: "bot",
    };
    const messageRef = collection(db, "chat", groupID, "message");

    const docRef = await addDoc(messageRef, botMessageData);

    return docRef;
  });

  return { getAndSaveBotMessage };
};

export default useGetChatBotMessage;
