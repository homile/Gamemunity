const express = require("express");
// 현재 경로와 상대 경로를 합쳐주는 라이브러리
const path = require("path");
// mongodb 사용하기 쉽도록 해주는 라이브러리
const mongoose = require("mongoose");
const app = express();
const port = 5001;
const config = require("./config/key.js");

// static으로 활용할 폴더 설정
app.use(express.static(path.join(__dirname, "../client/build")));
// 이미지 사용할 수 있게 설정
app.use("/image", express.static("./image"));
// body에 담긴 내용을 볼 수 있게 해줌
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/post", require("./Router/post.js"));
app.use("/api/user", require("./Router/user.js"));

// server 실행
app.listen(port, () => {
  mongoose
    .connect(config.mongoURI)
    .then(() => {
      console.log(`Example app listening on port ${port}`);
      console.log("Connecting MongoDB...");
    })
    .catch((err) => {
      console.log(`${err}`);
    });
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

// 모든 url에서 반응
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});
