import React from "react";
import RepleList from "./RepleList";
import RepleUpload from "./RepleUpload";

const RepleArea = ({ postId }: { postId: string }) => {
  return (
    <div>
      <RepleUpload postId={postId} />
      <RepleList />
    </div>
  );
};

export default RepleArea;
