import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UploadDiv, UploadForm, UploadButtonDiv } from "../../style/UploadCSS";

interface PostInfoType {
  id: string;
  title: string;
  content: string;
  postNum: number | null;
}

const Edit = () => {
  let params = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [postInfo, setPostInfo] = useState<PostInfoType>({ id: "", title: "", content: "", postNum: null });

  useEffect(() => {
    let body = {
      postNum: params.postNum,
    };

    axios
      .post("/api/post/detail", body)
      .then((res) => {
        if (res.data.success) {
          setPostInfo(res.data.post);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    setTitle(postInfo.title);
    setContent(postInfo.content);
  }, [postInfo]);

  const onSubmit = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    if (title === "" || content === "") {
      return alert("모든 항목을 채워주세요!");
    }

    let body = {
      title: title,
      content: content,
      postNum: params.postNum,
    };
    axios
      .post("/api/post/edit", body)
      .then((res) => {
        if (res.data.success) {
          alert("글 수정이 완료되었습니다.");
          navigate(`/post/${params.postNum}`);
        } else {
          alert("글 수정에 실패하였습니다.");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <UploadDiv>
      <UploadForm>
        <label htmlFor="title">제목</label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(event) => {
            setTitle(event.currentTarget.value);
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
            onClick={(event) => {
              event.preventDefault();
              navigate(-1);
            }}
          >
            취소
          </button>
          <button
            onClick={(event) => {
              onSubmit(event);
            }}
          >
            수정
          </button>
        </UploadButtonDiv>
      </UploadForm>
    </UploadDiv>
  );
};

export default Edit;
