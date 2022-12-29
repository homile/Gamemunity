import { useState } from "react";
import { Props } from "../App";

const Upload = (props: Props) => {
  const { contentList, setContentList } = props;
  const [content, setContent] = useState("");

  const onSubmit = () => {
    let tempArr: string[] = [...contentList];
    tempArr.push(content);
    setContentList([...tempArr]);
    setContent("");
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%", marginTop: "1rem" }}>
      <input
        type="text"
        value={content}
        onChange={(event) => {
          setContent(event.currentTarget.value);
        }}
      />
      <button
        style={{ marginTop: "1rem" }}
        onClick={() => {
          onSubmit();
        }}
      >
        제출!
      </button>
    </div>
  );
};

export default Upload;
