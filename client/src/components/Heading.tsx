import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { RootState } from "../Reducer/store";
import firebase from "../firebase";
import { clearUser } from "../Reducer/userSlice";

const Heading = () => {
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandle = () => {
    console.log(user)
    firebase.auth().signOut();
    dispatch(clearUser);
    navigate("/");
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
      <Link to="/">Gamemunity</Link>
      <div style={{ display: "flex", justifyContent: "space-between", width: "50%" }}>
        <Link to="/">Home</Link>
        <Link to="/upload">Upload</Link>
      </div>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        {!user.accessToken ? (
          <Link to="/login">Login</Link>
        ) : (
          <Link to="/" onClick={() => logoutHandle()}>
            Logout
          </Link>
        )}
      </div>
    </div>
  );
};

export default Heading;
