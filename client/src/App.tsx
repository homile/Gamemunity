import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Heading from "./components/Heading";
import List from "./components/List";
import Upload from "./components/Upload";

export interface Props {
  contentList: string[];
  setContentList: React.Dispatch<React.SetStateAction<string[]>>;
}

function App() {
  const [contentList, setContentList] = useState<string[]>([]);

  return (
    <>
      <Heading />
      <Routes>
        <Route path="/" element={<List contentList={contentList} setContentList={setContentList} />}></Route>
        <Route path="/upload" element={<Upload contentList={contentList} setContentList={setContentList} />}></Route>
      </Routes>
    </>
  );
}

export default App;
