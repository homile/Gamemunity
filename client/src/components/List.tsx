import { Props } from "../App";

const List = (props: Props) => {
  const { contentList } = props;

  return (
    <div>
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
