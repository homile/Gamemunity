import { Route, Routes } from "react-router-dom";
import "./App.css";
import Heading from "./components/Heading";
import List from "./components/post/List";
import Upload from "./components/post/Upload";
import Detail from "./components/post/Detail";

function App() {

  return (
    <>
      <Heading />
      <Routes>
        <Route path="/" element={<List />}></Route>
        <Route path="/upload" element={<Upload />}></Route>
        <Route path="/post/:postNum" element={<Detail />}></Route>
      </Routes>
    </>
  );
}

export default App;
