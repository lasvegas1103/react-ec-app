import { useCallback } from "react";
import { db, FirebaseTimeStamp, auth } from "../../firebase";
import { collection, addDoc } from "firebase/firestore";

/*
 * メッセージを保村
 *
 */
const useSendChatMessage = () => {
  const sendChatMessage = useCallback(async (chatMessage) => {
    // chatMessageが空の場合、処理しない
    if (!chatMessage && !auth.currentUser.uid) return;

    const messageData = {
      message: chatMessage,
      registdate_at: FirebaseTimeStamp.now(),
      userID: auth.currentUser.uid,
    };
    const messageRef = collection(
      db,
      "chat",
      "t4MxssSHoO4bv4fmNYAv",
      "message"
    );

    const docRef = await addDoc(messageRef, messageData);

    return docRef;
  });

  return { sendChatMessage };
};

export default useSendChatMessage;
