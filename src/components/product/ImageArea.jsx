import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { styled } from "@mui/material/styles";
import { IconButton } from "@mui/material";
import { storage } from "../../firebase";
import ImagePreview from "./ImagePreview";
import ResizeFile from "../../components/utils/ResizeFile";

const Cinput = styled("input")({
  display: "none",
});

const CimageArea = styled("div")({
  padding: "1rem 0 1rem 0",
  textAlign: "right",
});

const ImageArea = (props) => {
  const uploadImage = async (event) => {
    const file = event.target.files[0];

    // // 画像リサイズ
    // let blob = await ResizeFile({
    //   file: file,
    //   maxWidth: 300,
    //   maxHeight: 300,
    //   compressFormat: "JPEG",
    //   quality: 100,
    //   rotation: 0,
    //   outputType: "blob",
    // });
    // console.log(blob);
    let blob = new Blob(file, { type: "image/jpeg" });

    // Generate random 16 digits strings
    const S = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    const N = 16;
    const fileName = Array.from(crypto.getRandomValues(new Uint32Array(N)))
      .map((n) => S[n % S.length])
      .join("");

    const uploadRef = storage.ref().child("images").child(fileName);
    const uploadTask = uploadRef.put(blob);

    uploadTask.then(() => {
      uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
        const newImages = { id: fileName, path: downloadURL };
        props.setImages((prevState) => [...prevState, newImages]);
      });
    });
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
          <Cinput type="file" name="image" onChange={uploadImage} />
        </label>
      </IconButton>
    </CimageArea>
  );
};

export default ImageArea;
