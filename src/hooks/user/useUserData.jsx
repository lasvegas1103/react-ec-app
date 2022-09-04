import { db, auth } from "../../firebase/index";
import { getDoc, doc } from "firebase/firestore";
import useQueryWrapper from "../common/useQueryWrapper";
import { CacheName } from "../../config/constants";
/**
 * ユーザーデータ取得
 * @returns
 */
const useUserData = () => {
  const getUserData = useQueryWrapper({
    queryKey: CacheName.USERDATA,
    deps: [],
    func: () => getUserDataAction(),
    options: {},
    errText: "ユーザー情報を取得できませんでした",
  });

  const getUserDataAction = async () => {
    const userRef = doc(db, "users", auth.currentUser.uid);
    const docSnap = await getDoc(userRef);
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      throw new Error("ユーザー情報を取得できませんでした");
    }
  };

  return { getUserData };
};

export default useUserData;
