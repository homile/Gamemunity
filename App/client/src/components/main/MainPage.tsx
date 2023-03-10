import axios from "axios";
import React, { useEffect, useState } from "react";
import { PostListType } from "../../types/types";
import List from "../post/List";
import { ButtonDiv, LoadButton, SearchDiv, SearchInput, SortSelect } from "./MainPage.style";

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
      <SearchDiv>
        <SortSelect name="sortList" onChange={(e) => setSort(e.currentTarget.value)}>
          {sortData.map((sortType) => {
            return (
              <option key={sortType} value={sortType}>
                {sortType}
              </option>
            );
          })}
        </SortSelect>
        <SearchInput
          type="text"
          value={searchTerm}
          placeholder="검색어를 입력해주세요"
          onChange={(e) => setSearchTerm(e.currentTarget.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") searchHandler();
          }}
        />
      </SearchDiv>
      <List postList={postList} />
      {loadMore && (
        <ButtonDiv>
          <LoadButton
            onClick={() => {
              getPostLoadMore();
            }}
          >
            더 불러오기
          </LoadButton>
        </ButtonDiv>
      )}
    </div>
  );
};

export default MainPage;
