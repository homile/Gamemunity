import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../Reducer/store";
import firebase from "../../firebase";
import { clearUser } from "../../Reducer/userSlice";
import { HeadingList, HeadingNav, HeadingUser, StlyedLink, StyledNavLink } from "./Heading.style";

const Heading = () => {
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandle = () => {
    firebase.auth().signOut();
    dispatch(clearUser);
    navigate("/");
  };

  return (
    <HeadingNav>
      <StlyedLink to="/">Gamemunity</StlyedLink>
      <HeadingList>
        <StyledNavLink to="/">Home</StyledNavLink>
        <StyledNavLink to="/upload">Upload</StyledNavLink>
      </HeadingList>
      <HeadingUser>
        {!user.accessToken ? (
          <StlyedLink to="/login">Login</StlyedLink>
        ) : (
          <>
            <StlyedLink to="/" onClick={() => logoutHandle()}>
              Logout
            </StlyedLink>
            <StyledNavLink to="/MyPage">MyPage</StyledNavLink>
          </>
        )}
      </HeadingUser>
    </HeadingNav>
  );
};

export default Heading;
