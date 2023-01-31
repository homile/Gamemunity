import axios from "axios";
import { useEffect, useRef, useState } from "react";
import Avatar from "react-avatar";
import { useSelector } from "react-redux";
import { RootState } from "../../Reducer/store";
import { RepleContentDiv, RepleUploadDiv } from "../../style/RepleCSS";
import { RepleListType } from "../../types/types";

const RepleContent = ({ reple }: { reple: RepleListType }) => {
  const user = useSelector((state: RootState) => state.user);
  const ref = useRef(null);

  const [ModalFlag, setModalFlag] = useState(false);
  const [editFlag, setEditFlag] = useState(false);
  const [editReple, setEditReple] = useState(reple.reple);

  useOnClickOutside(ref, () => setModalFlag(false));

  const submitHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    let body = {
      uid: user.uid,
      reple: editReple,
      postId: reple.postId,
      repleId: reple._id,
    };

    axios.post("/api/reple/edit", body).then((res) => {
      if (res.data.success) {
        alert("댓글 수정이 성공하였습니다.");
      } else {
        alert("댓글 수정이 실패하였습니다.");
      }
      return window.location.reload();
    });
  };

  const deleteHandler = (e: React.MouseEvent<HTMLParagraphElement, MouseEvent>) => {
    e.preventDefault();

    if (window.confirm("정말로 삭제하시겠습니까?")) {
      let body = {
        postId: reple.postId,
        repleId: reple._id,
      };

      axios
        .post("/api/reple/delete", body)
        .then((res) => {
          if (res.data.success) {
            alert("댓글이 삭제되었습니다.");
            window.location.reload();
          }
        })
        .catch((err) => {
          alert("댓글 삭제에 실패하였습니다.");
        });
    }
  };

  return (
    <RepleContentDiv>
      <div className="author">
        <p>
          <Avatar size="40" round={true} src={reple.author.photoURL} />
          {reple.author.displayName}
        </p>
        {reple.author.uid === user.uid && (
          <div className="modalControl">
            <span onClick={() => setModalFlag(true)}>...</span>
            {ModalFlag && (
              <div className="modalDiv" ref={ref}>
                <p
                  onClick={() => {
                    setEditFlag(true);
                    setModalFlag(false);
                  }}
                >
                  수정
                </p>
                <p
                  className="delete"
                  onClick={(e) => {
                    deleteHandler(e);
                  }}
                >
                  삭제
                </p>
              </div>
            )}
          </div>
        )}
      </div>
      {editFlag ? (
        <RepleUploadDiv>
          <form>
            <input
              type="text"
              value={editReple}
              onChange={(e) => {
                setEditReple(e.currentTarget.value);
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
          <button
            className="cancel"
            onClick={(e) => {
              e.preventDefault();
              setEditFlag(false);
            }}
          >
            취소
          </button>
        </RepleUploadDiv>
      ) : (
        <p>{reple.reple}</p>
      )}
    </RepleContentDiv>
  );
};

// 모달 외부 클릭시 모달 닫힘
function useOnClickOutside(ref: any, handler: any) {
  useEffect(() => {
    const listener = (event: any) => {
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      handler(event);
    };
    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler]);
}

export default RepleContent;
