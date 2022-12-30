import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { BtnDiv, Post, PostDiv } from "../../style/PostDetailCSS";

interface PostInfoType {
  id: string;
  title: string;
  content: string;
  postNum: number | null;
  image: string;
}

const Detail = () => {
  let params = useParams();
  const navigate = useNavigate();

  const [postInfo, setPostInfo] = useState<PostInfoType>({ id: "", title: "", content: "", postNum: null, image: "" });

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

  const DeleteHandler = () => {
    if (window.confirm("정말로 삭제하시겠습니까?")) {
      let body = {
        postNum: params.postNum,
      };

      axios
        .post("/api/post/delete", body)
        .then((res) => {
          if (res.data.success) {
            alert("게시글이 삭제되었습니다.");
            navigate("/");
          }
        })
        .catch((err) => {
          alert("게시글 삭제에 실패하였습니다.");
        });
    }
  };

  return (
    <PostDiv>
      <Post>
        <h1>{postInfo.title}</h1>
        {postInfo.image ? <img src={postInfo.image} style={{ width: "100%", height: "auto" }} /> : null}
        <p>{postInfo.content}</p>
      </Post>
      <BtnDiv>
        <Link to={`/edit/${postInfo.postNum}`}>
          <button className="edit">수정</button>
        </Link>
        <button className="delete" onClick={() => DeleteHandler()}>
          삭제
        </button>
      </BtnDiv>
    </PostDiv>
  );
};

export default Detail;
