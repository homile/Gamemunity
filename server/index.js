const express = require("express");
// 현재 경로와 상대 경로를 합쳐주는 라이브러리
const path = require("path");
// mongodb 사용하기 쉽도록 해주는 라이브러리
const mongoose = require("mongoose");
const app = express();
const port = 5001;

// mongodb+srv://admin:ghalf1234@cluster0.ee48oao.mongodb.net/?retryWrites=true&w=majority

// static으로 활용할 폴더 설정
app.use(express.static(path.join(__dirname, "../client/build")));

// server 실행
app.listen(port, () => {
  mongoose
    .connect("")
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
