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
  const [searchTerm, setSearchTerm] = useState("");
  const [skip, setSkip] = useState(0);
  const [loadMore, setLoadMore] = useState(true);

  const getPostLoadMore = () => {
    let body = {
      sort: sort,
      searchTerm: searchTerm,
      skip: skip,
    };

    axios
      .post("/api/post/list", body)
      .then((res) => {
        if (res.data.success) {
          setPostList([...postList, ...res.data.postList]);
          setSkip(res.data.postList.length);

          if (res.data.postList.length < 5) {
            setLoadMore(false);
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getPostList = () => {
    setSkip(0);

    let body = {
      sort: sort,
      searchTerm: searchTerm,
      skip: 0,
    };

    axios
      .post("/api/post/list", body)
      .then((res) => {
        if (res.data.success) {
          setPostList([...res.data.postList]);
          setSkip(res.data.postList.length);

          if (res.data.postList.length < 5) {
            setLoadMore(false);
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const searchHandler = () => {
    getPostList();
  };

  useEffect(() => {
    getPostList();
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
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.currentTarget.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") searchHandler();
        }}
      />
      <List postList={postList} />
      {loadMore && (
        <button
          onClick={() => {
            getPostLoadMore();
          }}
        >
          더 불러오기
        </button>
      )}
    </div>
  );
};

export default MainPage;
