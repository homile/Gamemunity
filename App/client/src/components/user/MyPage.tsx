import axios from "axios";
import React, { useEffect, useState } from "react";
import Avatar from "react-avatar";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../Reducer/store";
import firebase from "../../firebase";

const MyPage = () => {
  const user = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();

  const [currentImage, setCurrentImage] = useState("");

  const ImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    let formData: any = new FormData();
    formData.append("file", e.target.files?.[0]);

    axios.post("/api/user/profile/img", formData).then((res) => {
      setCurrentImage(res.data.filePath);
    });
  };

  const saveProfile = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    try {
      await firebase?.auth()?.currentUser?.updateProfile({
        photoURL: currentImage,
      });
    } catch (error) {
      return alert("프로필 저장에 실패하였습니다.");
    }

    let body = {
      photoURL: currentImage,
      uid: user.uid,
    };

    axios.post("/api/user/profile/update", body).then((res) => {
      if (res.data.success) {
        alert("프로필 저장에 성공하였습니다.");
        window.location.reload();
      } else {
        return alert("프로필 저장에 실패하였습니다.");
      }
    });
  };

  useEffect(() => {
    if (!user.isLoading && !user.accessToken) {
      navigate("/login");
    } else {
      setCurrentImage(user.photoURL);
    }
  }, [user]);

  return (
    <div>
      <form
        style={{
          width: "50%",
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "2rem",
        }}
      >
        <label>
          <input type="file" accept="image/*" style={{ display: "none" }} onChange={(e) => ImageUpload(e)} />
          <Avatar
            size="100"
            round={true}
            src={currentImage}
            style={{ border: "1px solid #c6c6c6", cursor: "pointer" }}
          />
        </label>
        <button onClick={(e) => saveProfile(e)}>저장</button>
      </form>
    </div>
  );
};

export default MyPage;
