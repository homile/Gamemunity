import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../Reducer/store";
import { RepleAreaDiv } from "../../style/RepleCSS";
import RepleList from "./RepleList";
import RepleUpload from "./RepleUpload";

const RepleArea = ({ postId }: { postId: string }) => {
  const user = useSelector((state: RootState) => state.user);

  return (
    <RepleAreaDiv>
      {user.accessToken && <RepleUpload postId={postId} />}
      <RepleList postId={postId} />
    </RepleAreaDiv>
  );
};

export default RepleArea;
