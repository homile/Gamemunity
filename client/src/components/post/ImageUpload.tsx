import axios from "axios";
import { ImageUploadDiv, ImageUploadInput } from "../../style/UploadCSS";

const ImageUpload = ({ setImage }: { setImage: React.Dispatch<React.SetStateAction<string>> }) => {
  const FileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    let formData: any = new FormData();
    formData.append("file", e.target.files?.[0]);

    axios.post("/api/post/image/upload", formData).then((res) => {
      setImage(res.data.filePath);
    });
  };

  return (
    <ImageUploadDiv>
      <label htmlFor="image-upload">사진 업로드하기</label>
      <ImageUploadInput id="image-upload" type="file" accept="image/*" onChange={(e) => FileUpload(e)} />
    </ImageUploadDiv>
  );
};

export default ImageUpload;
