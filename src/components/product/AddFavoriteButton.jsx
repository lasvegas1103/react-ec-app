import React, { useState } from "react";
import { pink, grey } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useQueryClient } from "react-query";
import useMutationUserData from "../../hooks/useMutationUserData";

/* お気に入り追加ボタン */
const AddFavoriteButton = () => {
  const queryClient = useQueryClient();
  const { addFavorite } = useMutationUserData();
  const [isFavorite, setIsFavorite] = useState(false);

  const handleAddFavorite = () => {
    // uid、productId取得
    const { uid } = queryClient.getQueryData("loginData");
    const { id } = queryClient.getQueryData("productDetail");

    const addFavoriteData = {
      uid: uid,
      productId: id,
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
      onclick={handleAddFavorite}
    />
  );
};

export default AddFavoriteButton;
