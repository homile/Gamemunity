import { useState } from "react";
import { Props } from "../App";
import { UploadDiv, UploadForm, UploadButtonDiv } from "../style/UploadCSS";

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
    <UploadDiv>
      <UploadForm>
        <label htmlFor="title">제목</label>
        <input
          id="title"
          type="text"
          value={content}
          onChange={(event) => {
            setContent(event.currentTarget.value);
          }}
        />
        <label htmlFor="content">내용</label>
        <textarea
          id="content"
          value={content}
          onChange={(event) => {
            setContent(event.currentTarget.value);
          }}
        />
        <UploadButtonDiv>
          <button
            onClick={() => {
              onSubmit();
            }}
          >
            제출
          </button>
        </UploadButtonDiv>
      </UploadForm>
    </UploadDiv>
  );
};

export default Upload;
