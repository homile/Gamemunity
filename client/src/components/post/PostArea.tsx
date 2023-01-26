import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import RepleArea from "../reple/RepleArea";
import Detail from "./Detail";

interface AuthorType {
  displayName: string;
  uid?: string;
}

interface PostInfoType {
  _id: string;
  title: string;
  content: string;
  postNum: number | null;
  image: string;
  author: AuthorType;
}

const PostArea = () => {
  let params = useParams();
  const [postInfo, setPostInfo] = useState<PostInfoType>(Object);
  const [flag, setFlag] = useState(false);

  useEffect(() => {
    let body = {
      postNum: params.postNum,
    };

    axios
      .post("/api/post/detail", body)
      .then((res) => {
        if (res.data.success) {
          setPostInfo(res.data.post);
          setFlag(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      {flag ? (
        <>
          <Detail postInfo={postInfo} />
          <RepleArea postId={postInfo._id} />
        </>
      ) : null}
    </div>
  );
};

export default PostArea;
