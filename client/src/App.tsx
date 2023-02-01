import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Heading from "./components/header/Heading";
import Upload from "./components/post/Upload";
import Edit from "./components/post/Edit";

import Login from "./components/user/Login";
import Register from "./components/user/Register";
import { useDispatch } from "react-redux";
import { clearUser, loginUser } from "./Reducer/userSlice";
import firebase from "./firebase";
import PostArea from "./components/post/PostArea";
import MyPage from "./components/user/MyPage";
import MainPage from "./components/MainPage";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    firebase.auth().onAuthStateChanged((userInfo) => {
      if (userInfo !== null) {
        dispatch(loginUser(userInfo.multiFactor.user));
      } else {
        dispatch(clearUser());
      }
    });
  }, []);

  return (
    <>
      <Heading />
      <Routes>
        <Route path="/" element={<MainPage />}></Route>
        <Route path="/upload" element={<Upload />}></Route>
        <Route path="/post/:postNum" element={<PostArea />}></Route>
        <Route path="/edit/:postNum" element={<Edit />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/mypage" element={<MyPage />}></Route>
      </Routes>
    </>
  );
}

export default App;
