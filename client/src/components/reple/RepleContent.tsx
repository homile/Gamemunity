import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../Reducer/store";
import { RepleContentDiv } from "../../style/RepleCSS";
import { RepleListType } from "./RepleList";

const RepleContent = ({ reple }: { reple: RepleListType }) => {
  const user = useSelector((state: RootState) => state.user);
  const ref = useRef(null);

  const [ModalFlag, setModalFlag] = useState(false);

  useOnClickOutside(ref, () => setModalFlag(false));

  return (
    <RepleContentDiv>
      <div className="author">
        <p>{reple.author.displayName}</p>
        {reple.author.uid === user.uid && (
          <div className="modalControl">
            <span onClick={() => setModalFlag(true)}>...</span>
            {ModalFlag && (
              <div className="modalDiv" ref={ref}>
                <p>수정</p>
                <p className="delete">삭제</p>
              </div>
            )}
          </div>
        )}
      </div>
      <p>{reple.reple}</p>
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
