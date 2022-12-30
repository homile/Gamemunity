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
// body에 담긴 내용을 볼 수 있게 해줌
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const { Post } = require("./Model/Post.js");
const { Counter } = require("./Model/Counter.js");

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

// 게시글 작성
app.post("/api/post/submit", (req, res) => {
  let temp = req.body;
  Counter.findOne({ name: "counter" })
    .exec()
    .then((counter) => {
      temp.postNum = counter.postNum;
      const CommunityPost = new Post(temp);
      CommunityPost.save().then(() => {
        Counter.updateOne({ name: "counter" }, { $inc: { postNum: 1 } }).then(() => {
          res.status(200).json({ success: true });
        });
      });
    })
    .catch((err) => {
      res.status(400).json({ success: false });
    });
});

// 게시글 리스트 보기
app.post("/api/post/list", (req, res) => {
  Post.find()
    .exec()
    .then((doc) => {
      res.status(200).json({ success: true, postList: doc });
    })
    .catch((err) => {
      res.status(400).json({ success: false });
    });
});

// 게시글 상세보기
app.post("/api/post/detail", (req, res) => {
  Post.findOne({ postNum: Number(req.body.postNum) })
    .exec()
    .then((doc) => {
      res.status(200).json({ success: true, post: doc });
    })
    .catch((err) => {
      res.status(400).json({ success: false });
    });
});

// 게시글 수정
app.post("/api/post/edit", (req, res) => {
  let temp = {
    title: req.body.title,
    content: req.body.content,
  };
  Post.updateOne({ postNum: Number(req.body.postNum) }, { $set: temp })
    .exec()
    .then(() => {
      res.status(200).json({ success: true });
    })
    .catch((err) => {
      res.status(400).json({ success: false });
    });
});

// 게시글 삭제
app.post("/api/post/delete", (req, res) => {
  Post.deleteOne({ postNum: Number(req.body.postNum) })
    .exec()
    .then(() => {
      res.status(200).json({ success: true });
    })
    .catch((err) => {
      res.status(400).json({ success: false });
    });
});
