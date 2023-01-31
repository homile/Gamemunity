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

const sortData = ["최신순", "인기순"];

const MainPage = () => {
  const [postList, setPostList] = useState<PostListType[]>([]);
  const [sort, setSort] = useState("최신순");

  useEffect(() => {
    let body = {
      sort: sort,
    };

    axios
      .post("/api/post/list", body)
      .then((res) => {
        setPostList([...res.data.postList]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [sort]);

  return (
    <div>
      <select name="sortList" onChange={(e) => setSort(e.currentTarget.value)}>
        {sortData.map((sortType) => {
          return (
            <option key={sortType} value={sortType}>
              {sortType}
            </option>
          );
        })}
      </select>
      <List postList={postList} />
    </div>
  );
};

export default MainPage;
