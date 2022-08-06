import { db } from "../firebase/index";
import {
  collection,
  query,
  orderBy,
  startAfter,
  limit,
  getDocs,
} from "firebase/firestore";

/* 
*チャットのメッセージを取得
*
*/
export const getChatMessageList = async ({ pageParam = 0 }) => {
    const { chatMessageData, lastVisible } = async () => {
        const chatRef = query(
            collection(db, "chat", "t4MxssSHoO4bv4fmNYAv", "message"),
            orderBy("registdate_at"),
            startAfter(pageParam),
            limit("10")
          );
          const docSnapShot = await getDocs(chatRef);
      
          // クエリカーソルに使用
          const lastVisible = docSnapShot.docs[docSnapShot.docs.length - 1];
      
          let productData = [];
          docSnapShot.forEach((doc) => {
            chatMessageData.push(doc.data());
          });
      
          return { productData, lastVisible };
    }

    return { chatMessageData, nextPage: lastVisible };
  };