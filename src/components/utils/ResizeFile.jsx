import Resizer from "react-image-file-resizer";

const ResizeFile = (fileData) => {
  return new Promise((resolve) => {
    Resizer.imageFileResizer(
      fileData.file,
      fileData.maxWidth,
      fileData.maxHeight,
      fileData.compressFormat,
      fileData.quality,
      fileData.rotation,
      (uri) => resolve(uri),
      fileData.outputType
    );
  });
};

export default ResizeFile;
