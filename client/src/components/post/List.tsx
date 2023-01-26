import { useEffect, useState } from "react";
import axios from "axios";
import { ListDiv, ListItem } from "../../style/ListCSS";
import { Link } from "react-router-dom";

interface AuthorType  {
  displayName: string;
  uid?: string;
}

interface PostListType {
  _id: string;
  title: string;
  content: string;
  postNum: number;
  author: AuthorType;
}

const List = () => {
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
              <p className="author">{post.author.displayName}</p>
              <p>{post.content}</p>
            </Link>
          </ListItem>
        );
      })}
    </ListDiv>
  );
};

export default List;
