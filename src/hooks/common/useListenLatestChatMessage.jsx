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
const useListenLatestChatMessage = () => {
  const [addLatestChatMessage, setAddChatMessage] = useState([]);

  const listenLatestChatMessage = useCallback(() => {
    const q = query(
      collection(db, "chat", "t4MxssSHoO4bv4fmNYAv", "message"),
      orderBy("registdate_at", "asc"),
      startAfter(FirebaseTimeStamp.now())
    );
    return onSnapshot(q, (snapshot) => {
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
