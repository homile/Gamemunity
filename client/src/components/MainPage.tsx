import axios from "axios";
import React, { useEffect, useState } from "react";
import List from "./post/List";

interface AuthorType {
  displayName: string;
  uid?: string;
  photoURL: string;
}

interface PostListType {
  _id: string;
  title: string;
  content: string;
  postNum: number;
  createdAt: Date;
  updatedAt: Date;
  author: AuthorType;
}

const MainPage = () => {
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
    <div>
      <List postList={postList} />
    </div>
  );
};

export default MainPage;
