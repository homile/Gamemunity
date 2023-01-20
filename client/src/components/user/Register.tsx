import { useState } from "react";
import LoginDiv from "../../style/UserCSS";
import firebase from "../../firebase";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [nickName, setNickName] = useState("");
  const [email, setEmail] = useState("");
  const [PW, setPW] = useState("");
  const [PWConfirm, setPWComfirm] = useState("");

  const navigate = useNavigate();

  const RegistrtFunc = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (!(nickName && email && PW && PWConfirm)) {
      return alert("모든 값을 채워주세요!");
    }
    if (PW !== PWConfirm) {
      return alert("비밀번호와 비밀번호 확인 값은 같아야 합니다.");
    }
    let createdUser = await firebase.auth().createUserWithEmailAndPassword(email, PW);

    await createdUser.user?.updateProfile({
      displayName: nickName,
    });

    console.log(createdUser.user);
    let body = {
      email: createdUser.user?.multiFactor.user.email,
      displayName: createdUser.user?.multiFactor.user.displayName,
      uid: createdUser.user?.multiFactor.user.uid,
    };
    axios.post("/api/user/register", body).then((res) => {
      if (res.data.success) {
        navigate("/login");
      } else {
        return alert("회원가입이 실패하였습니다.");
      }
    });
  };

  return (
    <LoginDiv>
      <form>
        <label htmlFor="nick-name">닉네임</label>
        <input id="nick-name" type="name" value={nickName} onChange={(e) => setNickName(e.currentTarget.value)} />
        <label htmlFor="email">이메일</label>
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
        <button onClick={(e) => RegistrtFunc(e)}>회원가입</button>
      </form>
    </LoginDiv>
  );
};

export default Register;
