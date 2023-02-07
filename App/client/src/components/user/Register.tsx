import { useEffect, useState } from "react";
import LoginDiv from "../../style/UserCSS";
import firebase from "../../firebase";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../Reducer/store";

const Register = () => {
  const user = useSelector((state: RootState) => state.user);
  const [nickName, setNickName] = useState("");
  const [email, setEmail] = useState("");
  const [PW, setPW] = useState("");
  const [PWConfirm, setPWComfirm] = useState("");
  const [flag, setFlag] = useState(false);
  const [nameCheck, setNameCheck] = useState(false);
  const [nameInfo, setNameInfo] = useState("");

  const navigate = useNavigate();

  const RegistrtFunc = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setFlag(true);
    if (!(nickName && email && PW && PWConfirm)) {
      return alert("모든 값을 채워주세요!");
    }
    if (PW !== PWConfirm) {
      return alert("비밀번호와 비밀번호 확인 값은 같아야 합니다.");
    }
    if (!nameCheck) {
      return alert("닉네임 중복검사를 진행해 주세요.");
    }
    let createdUser = await firebase.auth().createUserWithEmailAndPassword(email, PW);

    await createdUser?.user?.updateProfile({
      displayName: nickName,
      photoURL: "https://kr.object.ncloudstorage.com/gamemunity/user/user_profile.png",
    });

    const body = {
      email: createdUser?.user?.multiFactor.user.email,
      displayName: createdUser?.user?.multiFactor.user.displayName,
      uid: createdUser?.user?.multiFactor.user.uid,
      photoURL: "https://kr.object.ncloudstorage.com/gamemunity/user/user_profile.png",
    };
    axios.post("/api/user/register", body).then((res) => {
      setFlag(false);
      if (res.data.success) {
        navigate("/login");
      } else {
        return alert("회원가입이 실패하였습니다.");
      }
    });
  };

  const nameCheckFunc = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (!nickName) {
      return alert("닉네임을 입력해주세요.");
    }

    let body = {
      displayName: nickName,
    };
    axios.post("/api/user/namecheck", body).then((res) => {
      if (res.data.success) {
        if (res.data.check) {
          setNameCheck(true);
          setNameInfo("사용가능한 닉네임입니다.");
        } else {
          setNameInfo("사용 불가능한 닉네임입니다.");
        }
      }
    });
  };

  useEffect(() => {
    if (user.accessToken) {
      alert("로그인 하지 않은 회원만 접근할 수 있습니다.");
      navigate("/");
    }
  }, []);

  return (
    <LoginDiv>
      <form>
        <label htmlFor="nick-name">닉네임</label>
        <input id="nick-name" type="name" value={nickName} onChange={(e) => setNickName(e.currentTarget.value)} />
        {nameInfo}
        <button onClick={(e) => nameCheckFunc(e)}>닉네임 중복검사</button>
        <label htmlFor="email">이메일</label>
        <input id="email" type="email" value={email} minLength={8} onChange={(e) => setEmail(e.currentTarget.value)} />
        <label htmlFor="password">비밀번호</label>
        <input id="password" type="password" value={PW} minLength={8} onChange={(e) => setPW(e.currentTarget.value)} />
        <label htmlFor="password-check">비밀번호확인</label>
        <input
          id="password-check"
          type="password"
          value={PWConfirm}
          onChange={(e) => setPWComfirm(e.currentTarget.value)}
        />
        <button disabled={flag} onClick={(e) => RegistrtFunc(e)}>
          회원가입
        </button>
      </form>
    </LoginDiv>
  );
};

export default Register;
