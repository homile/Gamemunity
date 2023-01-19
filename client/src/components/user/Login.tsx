import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginDiv from "../../style/UserCSS";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [PW, setPW] = useState("");

  return (
    <LoginDiv>
      <form>
        <label htmlFor="email">이메일</label>
        <input id="email" type="email" value={email} onChange={(e) => setEmail(e.currentTarget.value)} />
        <label htmlFor="password">비밀번호</label>
        <input id="password" type="password" value={PW} onChange={(e) => setPW(e.currentTarget.value)} />
        <button>로그인</button>
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
