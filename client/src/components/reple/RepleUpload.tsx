import { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "../../Reducer/store";

const RepleUpload = ({ postId }: { postId: string }) => {
  const user = useSelector((state: RootState) => state.user);
  const [reple, setReple] = useState("");

  const submitHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    if (!reple) {
      return alert("댓글을 입력해주세요.");
    }

    let body = {
      reple: reple,
      uid: user.uid,
      postId: postId,
    };

    axios.post("/api/reple/submit", body).then((res) => {
      if (res.data.success) {
        setReple("");
        alert("댓글 작성이 성공하였습니다.");
      } else {
        alert("댓글 작성에 실패하였습니다.");
      }
    });
  };

  return (
    <div>
      <form>
        <input
          type="text"
          value={reple}
          onChange={(e) => {
            setReple(e.currentTarget.value);
          }}
        />
        <button
          onClick={(e) => {
            submitHandler(e);
          }}
        >
          등록
        </button>
      </form>
    </div>
  );
};

export default RepleUpload;
