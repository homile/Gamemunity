import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { BtnDiv, Post, PostDiv } from "../../style/PostDetailCSS";

interface PostInfoType {
  id: string;
  title: string;
  content: string;
  postNum: number | null;
}

const Detail = () => {
  let params = useParams();

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

  return (
    <PostDiv>
      <Post>
        <h1>{postInfo.title}</h1>
        <p>{postInfo.content}</p>
      </Post>
      <BtnDiv>
        <Link to={`/edit/${postInfo.postNum}`}>
          <button className="edit">수정</button>
        </Link>
        <Link to="">
          <button className="delete">삭제</button>
        </Link>
      </BtnDiv>
    </PostDiv>
  );
};

export default Detail;
