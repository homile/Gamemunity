import { useEffect, useState } from "react";
import axios from "axios";
import { Props } from "../../App";

const List = (props: Props) => {
  const { contentList } = props;

  const [text, setText] = useState("");

  useEffect(() => {
    let body = { text: "Hello" };

    axios
      .post("/api/test", body)
      .then((res) => {
        console.log(res);
        setText(res.data.text);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <h3>List</h3>
      <h3>{text}</h3>
      {contentList.map((content, idx) => {
        return (
          <div key={idx} style={{ width: "100%", marginLeft: "1rem" }}>
            내용 : {content}
          </div>
        );
      })}
    </div>
  );
};

export default List;
