import React, { useState } from "react";
import { pink, grey } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useQueryClient } from "react-query";
import useMutationUserData from "../../hooks/useMutationUserData";
import { CacheName } from "../../config/constants";

/* お気に入り追加ボタン */
const AddFavoriteButton = ({ productData }) => {
  const queryClient = useQueryClient();
  const currentFavoriteData = queryClient.getQueryData(CacheName.USERFAVORITE);
  const { addFavorite } = useMutationUserData();
  // すでにお気に入りに追加しているか
  const [isFavorite, setIsFavorite] = useState(
    currentFavoriteData.sizeType.includes(productData.sizeType)
  );

  const handleAddFavorite = () => {
    // すでにお気に入りに追加されている場合、処理しない
    if (isFavorite) return false;

    // uid、productId取得
    const { uid } = queryClient.getQueryData(CacheName.LOGINDATA);
    const { id } = queryClient.getQueryData(CacheName.PRODUCTDETAIL);

    const addFavoriteData = {
      uid: uid,
      productId: id,
      sizeType: productData.sizeType,
    };
    if (uid)
      addFavorite.mutate(addFavoriteData, {
        onSuccess: () => {
          // ボタンの色をグレーに切り替え
          setIsFavorite(true);
        },
      });
  };

  return (
    <FavoriteIcon
      fontSize="large"
      sx={{ color: isFavorite ? pink[500] : grey[500] }}
      onClick={handleAddFavorite}
    />
  );
};

export default AddFavoriteButton;
