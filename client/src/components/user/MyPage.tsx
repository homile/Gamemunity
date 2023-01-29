import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../Reducer/store";

const MyPage = () => {
  const user = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    console.log(user);
    if (!user.isLoading && !user.accessToken) {
      navigate("/login");
    }
  }, [user]);

  return <div>MyPage</div>;
};

export default MyPage;
