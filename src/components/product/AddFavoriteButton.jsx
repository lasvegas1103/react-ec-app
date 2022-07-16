import React, { useState } from "react";
import { pink, grey } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PopperCm from "../MaterialUI/PopperCm";
import { useQueryClient } from "react-query";
import { useAddFavorite } from "../../hooks/userMutationHooks";
import { CacheName } from "../../config/constants";

/* お気に入り追加ボタン */
const AddFavoriteButton = ({ productData }) => {
  const queryClient = useQueryClient();
  const currentFavoriteData = queryClient.getQueryData([
    CacheName.USERFAVORITE,
    productData.productId,
  ]);
  const { addFavorite } = useAddFavorite();
  // popperの制御
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  // すでにお気に入りに追加しているか
  let favorited = currentFavoriteData
    ? currentFavoriteData.find((data) => data.sizeType === productData.sizeType)
    : false;
  const [isFavorite, setIsFavorite] = useState(favorited);

  const handleAddFavorite = (event) => {
    // すでにお気に入りに追加されている場合、処理しない
    if (isFavorite) return false;

    // uid取得
    const { uid } = queryClient.getQueryData(CacheName.LOGINDATA);

    const addFavoriteData = {
      uid: uid,
      productId: productData.productId,
      sizeType: productData.sizeType,
    };
    if (uid)
      addFavorite.mutate(addFavoriteData, {
        onSuccess: () => {
          // ボタンの色をグレーに切り替え
          setIsFavorite(true);
        },
      });

    // popper制御
    setAnchorEl(event.currentTarget);
    setOpen((previousOpen) => !previousOpen);
    // popperを１秒後に非表示
    setTimeout(() => {
      setOpen(false);
    }, 1000);
  };

  //popper制御
  const canBeOpen = open;
  const popperId = canBeOpen ? "transition-popper" : undefined;

  return (
    <div>
      <FavoriteIcon
        aria-describedby={popperId}
        fontSize="large"
        sx={{ color: isFavorite ? pink[500] : grey[500] }}
        onClick={handleAddFavorite}
      />
      <PopperCm
        poperId={popperId}
        open={open}
        anchorEl={anchorEl}
        text={"お気に入りに追加しました"}
      />
    </div>
  );
};

export default AddFavoriteButton;
