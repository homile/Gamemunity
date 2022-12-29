import { useEffect, useState } from "react";
import axios from "axios";
import { Props } from "../../App";
import { ListDiv, ListItem } from "../../style/ListCSS";

interface PostListType {
  id: string;
  title: string;
  content: string;
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
      {postList.map((content, idx) => {
        return (
          <ListItem key={idx} style={{ width: "100%", marginLeft: "1rem" }}>
            <p className="title">{content.title}</p>
            <p>{content.content}</p>
          </ListItem>
        );
      })}
    </ListDiv>
  );
};

export default List;
