import { useState } from "react";

const Test = () => {
  const [content, setContent] = useState("");
  const [contentList, setContentList] = useState<string[]>([]);

  const onSubmit = () => {
    let tempArr: string[] = [...contentList];
    tempArr.push(content);
    setContentList([...tempArr]);
    setContent("");
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
      {contentList.map((content, idx) => {
        return (
          <div key={idx} style={{ width: "100%", marginLeft: "1rem" }}>
            내용 : {content}
          </div>
        );
      })}
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

export default Test;
