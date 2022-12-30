import LoginDiv from "../../style/UserCSS";

const Register = () => {
  return (
    <LoginDiv>
      <form>
        <label htmlFor="nick-name">닉네임</label>
        <input id="nick-name" type="name" />
        <label htmlFor="email">닉네임</label>
        <input id="email" type="email" />
        <label htmlFor="password">비밀번호</label>
        <input type="password" />
        <label htmlFor="password-check">비밀번호확인</label>
        <input id="password-check" type="password" />
        <button>회원가입</button>
      </form>
    </LoginDiv>
  );
};

export default Register;
