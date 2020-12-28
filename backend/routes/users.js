var express = require('express');
var router = express.Router();
const User = require('../models/user');
const { checkToken } = require('../utils/jwt');
const { hashPassword, hasResult } = require('../utils/index');

// 유저 회원가입
router.post('/', async function(req, res, next) {
  let userInfo = req.body;
  const hash = await hashPassword(userInfo.userPassword);
  userInfo.userPassword = hash;
  User.create(userInfo).then((user) => {
    res.status(200).json(user);
  }).catch((err) => {
    res.status(500).json({"error" : err});
  });
});

// 유저 정보 아이디 기준 업데이트
router.put('/', function(req, res, next) {
  if (hasResult(checkToken(req, res))) {
    const userId = checkToken(req, res)["result"]["_id"]
    User.findByIdAndUpdate(userId, req.body).then((result) => {
      res.status(200).json(result);
    }).catch((err) => {
      res.status(500).json({"error" : err});
    });
  }
});

// 유저 아이디 기준 삭제
router.delete('/', function(req, res, next) {
  if (hasResult(checkToken(req, res))) {
    const userId = checkToken(req, res)["result"]["_id"]
    User.findByIdAndDelete(userId).then((result) => {
      res.status(200).json(result);
    }).catch((err) => {
      res.status(500).json({"error" : err});
    }); 
  }
});

// 이메일 기준 검색
router.get('/email/:kakaoEmail', function(req, res, next) {
  if (hasResult(checkToken(req, res))) {
    User.findOne({"userEmail" : req.params.userEmail}).then((user) => {
      res.status(200).json(user);
    }).catch((err) => {
      res.status(500).json({"error" : err});
    }); 
  }
});


// 닉네임 기준 검색
router.get('/usernickname/:userNickname', function(req, res, next) {
  if (hasResult(checkToken(req, res))) {
    User.findOne({"userNickname" : req.params.userNickname}).then((user) => {
      res.status(200).json(user);
    }).catch((err) => {
      res.status(500).json({"error" : err});
    }); 
  }
});


// 임의 옵션 기준 검색
router.get('/option', function(req, res, next) {
  if (hasResult(checkToken(req, res))) {
    User.find(req.query).then((users) => {
      res.status(200).json(users);
    }).catch((err) => {
      res.status(500).json({"error" : err});
    }); 
  }
});

// 유저 전체 가져오기
router.get('/', function(req, res, next) {
  if (hasResult(checkToken(req, res))) {
    User.find().limit(30).then((users) => {
      res.status(200).json(users);
    }).catch((err) => {
      res.status(500).json({"error" : err});
    }); 
  }
});

module.exports = router;