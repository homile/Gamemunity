import { useState } from "react";
import LoginDiv from "../../style/UserCSS";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <LoginDiv>
      <form>
        <label htmlFor="email">이메일</label>
        <input id="email" type="email" value={email} onChange={(e) => setEmail(e.currentTarget.value)} />
        <label htmlFor="password">비밀번호</label>
        <input id="password" type="password" value={password} onChange={(e) => setPassword(e.currentTarget.value)} />
        <button>로그인</button>
        <button>회원가입</button>
      </form>
    </LoginDiv>
  );
};

export default Login;
