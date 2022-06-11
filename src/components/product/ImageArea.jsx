import { useController } from "react-hook-form";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { styled } from "@mui/material/styles";
import { IconButton, FormHelperText } from "@mui/material";
import { storage } from "../../firebase";
import ImagePreview from "./ImagePreview";
import imageCompression from "browser-image-compression";

const Cinput = styled("input")({
  display: "none",
});

const CimageArea = styled("div")({
  padding: "1rem 0 1rem 0",
  textAlign: "right",
});

const CformHelperText = styled(FormHelperText)({
  padding: "0",
  textAlign: "right",
});

const ImageArea = (props) => {
  const name = props.name;
  const uploadImage = async (event) => {
    const file = event.target.files[0];

    try {
      // 画像圧縮する
      const options = {
        maxSizeMB: 3,
        maxWidthOrHeight: 200,
        useWebWorker: true,
      };
      const compressedFile = await imageCompression(file, options);
      let blob = new Blob([compressedFile], { type: "image/jpeg" });

      // Generate random 16 digits strings
      const S =
        "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
      const N = 16;
      const fileName = Array.from(crypto.getRandomValues(new Uint32Array(N)))
        .map((n) => S[n % S.length])
        .join("");

      // firestorageでアップロード
      const uploadRef = storage.ref().child("images").child(fileName);
      const uploadTask = uploadRef.put(blob);

      uploadTask.then(() => {
        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
          const newImages = { id: fileName, path: downloadURL };
          props.setImages((prevState) => [...prevState, newImages]);
        });
      });
    } catch (error) {
      console.log(error);
    }
  };

  const deleteImage = (id) => {
    const ret = window.confirm("この画像を削除しますか？");
    if (!ret) {
      return false;
    } else {
      const newImages = props.images.filter((image) => image.id !== id);
      props.setImages(newImages);
      return storage.ref().child("images").child(id).delete();
    }
  };

  return (
    <CimageArea>
      <div>
        {props.images !== "" &&
          props.images?.length > 0 &&
          props.images.map((image) => (
            <ImagePreview
              id={image.id}
              path={image.path}
              key={image.id}
              delete={deleteImage}
            />
          ))}
      </div>
      <span>画像を選択</span>
      <IconButton>
        <label>
          <CameraAltIcon />
          <Cinput
            type="file"
            {...props.register("image", { required: true })}
            onChange={(e) => {
              props.register("image").onChange(e);
              uploadImage(e);
            }}
          />
        </label>
      </IconButton>
      {props["errors"]?.[name]?.["type"] === "required" && (
        <CformHelperText error={true}>
          画像をアップロードしてください。
        </CformHelperText>
      )}
    </CimageArea>
  );
};

export default ImageArea;
