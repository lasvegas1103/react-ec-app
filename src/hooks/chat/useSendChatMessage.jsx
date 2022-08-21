import { useCallback } from "react";
import { db, FirebaseTimeStamp, auth } from "../../firebase";
import { collection, addDoc } from "firebase/firestore";

/**
 * ユーザーのメッセージを保存
 *
 */
const useSendChatMessage = () => {
  const sendChatMessage = useCallback(async ({ chatMessage, groupID }) => {
    // chatMessageが空の場合、処理しない
    if (!chatMessage && !auth.currentUser.uid) return;

    const messageData = {
      message: chatMessage,
      registdate_at: FirebaseTimeStamp.now(),
      userID: auth.currentUser.uid,
    };
    const messageRef = collection(db, "chat", groupID, "message");

    const docRef = await addDoc(messageRef, messageData);

    return docRef;
  });

  return { sendChatMessage };
};

export default useSendChatMessage;
