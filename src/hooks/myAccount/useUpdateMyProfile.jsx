import { db } from "../../firebase/index";
import { doc, updateDoc } from "firebase/firestore";
import { useQueryClient } from "react-query";
import useMutationWrapper from "../common/useMutationWrapper";
import { CacheName } from "../../config/constants";

/**
 * マイプロフィール更新
 * @returns
 */
export const useUpdateMyProfile = () => {
  const queryClient = useQueryClient();
  // カートの商品情報更新
  const updateMyProfile = useMutationWrapper({
    func: (updateMyProfileData) => updateMyProfileAction(updateMyProfileData),
    options: {
      onSuccess: () => {
        queryClient.invalidateQueries(CacheName.USERDATA);
      }
    },
    errText: "マイプロフィールの更新に失敗しました。",
  });

  //マイプロフィール更新
  const updateMyProfileAction = async (updateMyProfileData) => {
    try {
      const updateMyProfileRef = doc(db, "users", updateMyProfileData.uid);
      await updateDoc(updateMyProfileRef, updateMyProfileData.formData);
      return "更新完了！";
    } catch (error) {
      throw new Error(error);
    }
  };

  return { updateMyProfile };
};
