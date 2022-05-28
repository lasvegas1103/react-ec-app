import React from "react";
import Button from "@mui/material/Button";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useQueryClient } from "react-query";
import { useAddCart } from "../../hooks/userMutationHooks";

const AddCartButton = (props) => {
  const queryClient = useQueryClient();
  const { addCart } = useAddCart();

  const handleAddCart = () => {
    // uid、productId取得
    const { uid } = queryClient.getQueryData("loginData");
    const { id } = queryClient.getQueryData("productDetail");

    const addCartData = {
      uid: uid,
      productId: id,
    };
    if (uid) addCart.mutate(addCartData);
  };

  return (
    <Button
      variant="contained"
      color="info"
      startIcon={<ShoppingCartIcon />}
      onClick={() => handleAddCart(props.productId)}
    >
      カートに入れる
    </Button>
  );
};

export default AddCartButton;
