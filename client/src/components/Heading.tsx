import { Link } from "react-router-dom";

const Heading = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
      <h1>Hello, React</h1>
      <div style={{ display: "flex", justifyContent: "space-between", width: "50%" }}>
        <Link to="/">Home</Link>
        <Link to="/upload">Upload</Link>
        <Link to="/list">List</Link>
      </div>
    </div>
  );
};

export default Heading;