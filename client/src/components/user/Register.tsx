import { useState } from "react";
import LoginDiv from "../../style/UserCSS";

const Register = () => {
  const [nickName, setNickName] = useState("");
  const [email, setEmail] = useState("");
  const [PW, setPW] = useState("");
  const [PWConfirm, setPWComfirm] = useState("");

  return (
    <LoginDiv>
      <form>
        <label htmlFor="nick-name">닉네임</label>
        <input id="nick-name" type="name" value={nickName} onChange={(e) => setNickName(e.currentTarget.value)} />
        <label htmlFor="email">닉네임</label>
        <input id="email" type="email" value={email} onChange={(e) => setEmail(e.currentTarget.value)} />
        <label htmlFor="password">비밀번호</label>
        <input id="password" type="password" value={PW} onChange={(e) => setPW(e.currentTarget.value)} />
        <label htmlFor="password-check">비밀번호확인</label>
        <input
          id="password-check"
          type="password"
          value={PWConfirm}
          onChange={(e) => setPWComfirm(e.currentTarget.value)}
        />
        <button>회원가입</button>
      </form>
    </LoginDiv>
  );
};

export default Register;
