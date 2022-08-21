import { db, auth } from "../firebase/index";
import {
  collection,
  query,
  orderBy,
  startAt,
  limit,
  getDocs,
  where,
  addDoc,
} from "firebase/firestore";
import { MessageCount } from "../config/constants";

/*
 *チャットのメッセージを取得
 *
 */
export const getChatMessageList = async ({ pageParam = 0, groupID }) => {
  let pageCount = pageParam?.pageCount ?? 1;
  let prevVisible = pageParam?.prevVisible ?? null;

  // 対象のmessageコレクション参照
  const chatRef = collection(db, "chat", groupID, "message");

  // 全体の件数が取得したい
  const docSnapShotAll = await getDocs(
    query(chatRef, orderBy("registdate_at"))
  );
  const allCount = docSnapShotAll.docs.length;

  // メッセージ取得
  prevVisible =
    prevVisible === null
      ? docSnapShotAll.docs[allCount - MessageCount]
      : prevVisible;
  const q = query(
    chatRef,
    orderBy("registdate_at"),
    startAt(prevVisible),
    limit(MessageCount)
  );
  const docSnapShotForMessage = await getDocs(q);

  // クエリカーソルに使用
  const cursor =
    allCount -
    (docSnapShotForMessage.docs.length - 1) -
    MessageCount * pageCount;
  prevVisible = cursor >= 0 ? docSnapShotAll.docs[cursor] : null;
  const chatMessageData = [];
  docSnapShotForMessage.forEach((doc) => {
    chatMessageData.push(doc.data());
  });

  return {
    chatMessageData,
    prevCursor: { prevVisible: prevVisible, pageCount: pageCount + 1 },
  };
};

/**
 * groupID取得
 *
 */
export const getGroupIDAction = async () => {
  const chatQuery = query(
    collection(db, "chat"),
    where("userIDList", "array-contains", auth.currentUser.uid)
  );
  const chatDocsSnap = await getDocs(chatQuery);

  let groupID = "";
  if (chatDocsSnap.docs.length > 0) {
    chatDocsSnap.forEach((doc) => {
      groupID = doc.id;
    });
  } else {
    // groupIDが存在しない場合、ドキュメント作成
    const chatData = {
      groupName: "botRomm",
      userIDList: [auth.currentUser.uid],
    };

    const chatRef = collection(db, "chat");
    const chatDocRef = await addDoc(chatRef, chatData);
    groupID = chatDocRef.id;
  }

  return groupID;
};
