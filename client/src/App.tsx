import { Route, Routes } from "react-router-dom";
import "./App.css";
import Heading from "./components/Heading";
import List from "./components/post/List";
import Upload from "./components/post/Upload";
import Detail from "./components/post/Detail";
import Edit from "./components/post/Edit";

import Login from "./components/user/Login";
import Register from "./components/user/Register";

function App() {
  return (
    <>
      <Heading />
      <Routes>
        <Route path="/" element={<List />}></Route>
        <Route path="/upload" element={<Upload />}></Route>
        <Route path="/post/:postNum" element={<Detail />}></Route>
        <Route path="/edit/:postNum" element={<Edit />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
      </Routes>
    </>
  );
}

export default App;
