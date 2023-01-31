import axios from "axios";
import { useEffect, useState } from "react";
import { RepleListDiv } from "../../style/RepleCSS";
import { RepleListType } from "../../types/types";
import RepleContent from "./RepleContent";

const RepleList = ({ postId }: { postId: string }) => {
  const [repleList, setRepleList] = useState<RepleListType[]>([]);

  useEffect(() => {
    let body = {
      postId: postId,
    };

    axios.post("/api/reple/getReple", body).then((res) => {
      if (res.data.success) {
        setRepleList([...res.data.repleList]);
      }
    });
  }, []);

  return (
    <RepleListDiv>
      {repleList.map((reple, idx) => {
        return <RepleContent key={idx} reple={reple} />;
      })}
    </RepleListDiv>
  );
};

export default RepleList;
