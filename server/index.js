const express = require("express");
// 현재 경로와 상대 경로를 합쳐주는 라이브러리
const path = require("path");
const app = express();
const port = 5001;

// static으로 활용할 폴더 설정
app.use(express.static(path.join(__dirname, "../client/build")));

// server 실행
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});
