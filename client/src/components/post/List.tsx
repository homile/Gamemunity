import { ListDiv, ListItem } from "../../style/ListCSS";
import { Link } from "react-router-dom";
import Avatar from "react-avatar";

import moment from "moment";
import "moment/locale/ko";
import { PostListType } from "../../types/types";

const List = ({ postList }: { postList: PostListType[] }) => {
  const setTime = (a: Date, b: Date) => {
    if (a !== b) {
      return moment(b).format("YYYY년 MMMM Do, HH:mm") + " (수정됨)";
    } else {
      return moment(a).format("YYYY년 MMMM Do, HH:mm");
    }
  };

  return (
    <ListDiv>
      {postList.map((post, idx) => {
        return (
          <ListItem key={idx}>
            <Link to={`/post/${post.postNum}`}>
              <p className="title">{post.title}</p>
              <p className="author">
                <Avatar size="40" round={true} src={post.author.photoURL} />
                {post.author.displayName}
              </p>
              <p>{post.content}</p>
              <p>{setTime(post.createdAt, post.updatedAt)}</p>
            </Link>
          </ListItem>
        );
      })}
    </ListDiv>
  );
};

export default List;
