import { useCallback, useState } from "react";
import { db, FirebaseTimeStamp } from "../../firebase";
import {
  collection,
  query,
  onSnapshot,
  orderBy,
  startAfter,
} from "firebase/firestore";

/*
 * 最新のメッセージをリッスン
 *
 */
const useListenLatestChatMessage = (groupID) => {
  const [addLatestChatMessage, setAddChatMessage] = useState([]);

  const listenLatestChatMessage = useCallback(() => {
    const messageQuery = query(
      collection(db, "chat", groupID, "message"),
      orderBy("registdate_at", "asc"),
      startAfter(FirebaseTimeStamp.now())
    );
    return onSnapshot(messageQuery, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          setAddChatMessage([...addLatestChatMessage, change.doc.data()]);
        }
      });
    });
  }, [addLatestChatMessage]);

  return { addLatestChatMessage, listenLatestChatMessage };
};

export default useListenLatestChatMessage;
