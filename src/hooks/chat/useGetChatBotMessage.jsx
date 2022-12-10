import { useCallback } from "react";
import { db, FirebaseTimeStamp } from "../../firebase";
import { collection, addDoc } from "firebase/firestore";
import { getFunctions, httpsCallable } from "firebase/functions";

/**
 * botメッセージを取得＆保存
 *
 */
const useGetChatBotMessage = () => {
  const getAndSaveBotMessage = useCallback(async ({ chatMessage, groupID }) => {
    // firebase cloudfunctions
    let data;
    const functions = getFunctions();
    const getChatbotMessage = httpsCallable(functions, "getChatbotMessage");
    await getChatbotMessage(chatMessage).then((result) => {
      data = result.data.message;
    });

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
