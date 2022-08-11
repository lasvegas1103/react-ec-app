import { db } from "../firebase/index";
import {
  collection,
  query,
  orderBy,
  startAt,
  limit,
  getDocs,
} from "firebase/firestore";
import { MessageCount } from "../config/constants";

/*
 *チャットのメッセージを取得
 *
 */
export const getChatMessageList = async ({ pageParam = 0 }) => {
  let pageCount = pageParam?.pageCount ?? 1;
  let prevVisible = pageParam?.prevVisible ?? null;

  const chatRef = collection(db, "chat", "t4MxssSHoO4bv4fmNYAv", "message");

  // 全体の件数が取得したい
  const docSnapShotAll = await getDocs(
    query(chatRef, orderBy("registdate_at"))
  );
  const allCount = docSnapShotAll.docs.length - 1;

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
