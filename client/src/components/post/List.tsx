import { ListDiv, ListItem } from "../../style/ListCSS";
import { Link } from "react-router-dom";
import Avatar from "react-avatar";

import moment from "moment";
import "moment/locale/ko";

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
        console.log(post);
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
