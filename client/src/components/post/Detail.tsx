import axios from "axios";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { RootState } from "../../Reducer/store";
import { BtnDiv, Post, PostDiv } from "../../style/PostDetailCSS";
import Avatar from "react-avatar";

interface AuthorType {
  displayName: string;
  uid?: string;
  photoURL: string;
}

interface PostInfoType {
  _id: string;
  title: string;
  content: string;
  postNum: number | null;
  image: string;
  author: AuthorType;
}

const Detail = ({ postInfo }: { postInfo: PostInfoType }) => {
  let params = useParams();
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.user);

  const DeleteHandler = () => {
    if (window.confirm("정말로 삭제하시겠습니까?")) {
      let body = {
        postNum: params.postNum,
      };

      axios
        .post("/api/post/delete", body)
        .then((res) => {
          if (res.data.success) {
            alert("게시글이 삭제되었습니다.");
            navigate("/");
          }
        })
        .catch((err) => {
          alert("게시글 삭제에 실패하였습니다.");
        });
    }
  };

  return (
    <PostDiv>
      <Post>
        <h1>{postInfo.title}</h1>
        <h3>
          <Avatar size="40" round={true} src={postInfo.author.photoURL} />
          {postInfo.author.displayName}
        </h3>
        {postInfo.image ? <img src={postInfo.image} style={{ width: "100%", height: "auto" }} /> : null}
        <p>{postInfo.content}</p>
      </Post>
      {user.uid === postInfo.author.uid && (
        <BtnDiv>
          <Link to={`/edit/${postInfo.postNum}`}>
            <button className="edit">수정</button>
          </Link>
          <button className="delete" onClick={() => DeleteHandler()}>
            삭제
          </button>
        </BtnDiv>
      )}
    </PostDiv>
  );
};

export default Detail;
