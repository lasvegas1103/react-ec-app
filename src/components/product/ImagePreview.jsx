import React from "react";
import { styled } from "@mui/material/styles";

const C_imagekoma = styled("img")({
  margin: "1rem 5rem",
  width: "15rem",
});

const ImagePreview = (props) => {
  return (
    <div onClick={() => props.delete(props.id)}>
      <C_imagekoma alt="プレビュー画像" src={props.path} />
    </div>
  );
};

export default ImagePreview;
