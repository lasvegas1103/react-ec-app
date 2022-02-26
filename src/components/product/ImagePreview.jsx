import React from "react";
import { styled } from "@mui/material/styles";

const C_imagekoma = styled("div")({
  margin: "5rem",
  width: "calc(50% - 1rem)",
});

const ImagePreview = (props) => {
  return (
    <C_imagekoma onClick={() => props.delete(props.id)}>
      <img alt="プレビュー画像" src={props.path} />
    </C_imagekoma>
  );
};

export default ImagePreview;
