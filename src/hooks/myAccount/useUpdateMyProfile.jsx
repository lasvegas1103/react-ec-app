import { db } from "../../firebase/index";
import { doc, updateDoc } from "firebase/firestore";
import useMutationWrapper from "../common/useMutationWrapper";

/**
 * マイプロフィール更新
 * @returns
 */
export const useUpdateMyProfile = () => {
  // カートの商品情報更新
  const updateMyProfile = useMutationWrapper({
    func: (updateMyProfileData) => updateMyProfileAction(updateMyProfileData),
    errText: "マイプロフィールの更新に失敗しました。",
  });

  //マイプロフィール更新
  const updateMyProfileAction = async (updateMyProfileData) => {
    try {
      const updateMyProfileRef = doc(db, "users", updateMyProfileData.uid);
      await updateDoc(updateMyProfileRef, updateMyProfileData.formData);
      return "更新成功！";
    } catch (error) {
      throw new Error(error);
    }
  };

  return { updateMyProfile };
};
