import axios from "axios";

interface ImageType {
  setImage: React.Dispatch<React.SetStateAction<string>>;
}

const ImageUpload = (props: ImageType) => {
  const FileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    let formData: any = new FormData();
    formData.append("file", e.target.files?.[0]);

    axios.post("/api/post/image/upload", formData).then((res) => {
      props.setImage(res.data.filePath);
    });
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={(e) => FileUpload(e)} />
    </div>
  );
};

export default ImageUpload;
