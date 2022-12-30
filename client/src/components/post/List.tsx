import { useEffect, useState } from "react";
import axios from "axios";
import { Props } from "../../App";
import { ListDiv, ListItem } from "../../style/ListCSS";
import { Link } from "react-router-dom";

interface PostListType {
  id: string;
  title: string;
  content: string;
  postNum: number;
}

const List = (props: Props) => {
  const [postList, setPostList] = useState<PostListType[]>([]);

  useEffect(() => {
    axios
      .post("/api/post/list")
      .then((res) => {
        setPostList([...res.data.postList]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <ListDiv>
      {postList.map((post, idx) => {
        return (
          <ListItem key={idx}>
            <Link to={`/post/${post.postNum}`}>
              <p className="title">{post.title}</p>
              <p>{post.content}</p>
            </Link>
          </ListItem>
        );
      })}
    </ListDiv>
  );
};

export default List;
