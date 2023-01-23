import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginDiv from "../../style/UserCSS";

import firebase from "../../firebase";

type ErrorType = {
  code: string;
};

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [PW, setPW] = useState("");

  const signInFunc = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (!(email && PW)) {
      return alert("이메일 또는 비밀번호를 입력해주세요");
    }
    try {
      await firebase.auth().signInWithEmailAndPassword(email, PW);
      navigate("/");
    } catch (error: unknown) {
      const err = error as ErrorType;

      if (err.code === "auth/user-not-found") {
        alert("존재하지 않는 이메일 입니다.");
      } else if (err.code === "auth/wrong-password") {
        alert("비밀번호가 일치하지 않습니다.");
      } else {
        alert("로그인에 실패하였습니다.");
      }
    }
  };

  return (
    <LoginDiv>
      <form>
        <label htmlFor="email">이메일</label>
        <input id="email" type="email" value={email} required onChange={(e) => setEmail(e.currentTarget.value)} />
        <label htmlFor="password">비밀번호</label>
        <input id="password" type="password" value={PW} onChange={(e) => setPW(e.currentTarget.value)} />
        <button onClick={(e) => signInFunc(e)}>로그인</button>
        <button
          onClick={(e) => {
            e.preventDefault();
            navigate("/register");
          }}
        >
          회원가입
        </button>
      </form>
    </LoginDiv>
  );
};

export default Login;
