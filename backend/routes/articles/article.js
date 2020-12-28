var express = require('express');
var router = express.Router();
const Article = require('../models/article');
const { checkToken } = require('../utils/jwt');
const { hasResult } = require('../utils/index');

// 프로젝트 생성
router.post('/', function(req, res, next) {
    if (hasResult(checkToken(req, res))) {
      Article.create(req.body).then((article) => {
        res.status(200).json(article);
    }).catch((err) => {
      res.status(500).json({"error" : err});
    });
    }
  });
  
// 프로젝트 아이디 기준 업데이트
router.put('/', function(req, res, next) {
if (hasResult(checkToken(req, res))) {
    const articleId = req.body._id
    Article.findByIdAndUpdate(articleId, req.body).then((result) => {
    res.status(200).json(result);
    }).catch((err) => {
    res.status(500).json({"error" : err});
    });
}
});

// 프로젝트 아이디 기준 삭제
router.delete('/', function(req, res, next) {
if (hasResult(checkToken(req, res))) {
    const articleId = req.body._id
    Article.findByIdAndDelete(articleId).then((result) => {
    res.status(200).json(result);
    }).catch((err) => {
    res.status(500).json({"error" : err});
    }); 
}
});

// 임의 옵션 기준 검색
router.get('/option', function(req, res, next) {
if (hasResult(checkToken(req, res))) {
    Article.find(req.query).then((articles) => {
    res.status(200).json(articles);
    }).catch((err) => {
    res.status(500).json({"error" : err});
    }); 
}
});

// 프로젝트 전체 가져오기
router.get('/', function(req, res, next) {
if (hasResult(checkToken(req, res))) {
    Article.find().limit(30).then((articles) => {
    res.status(200).json(articles);
    }).catch((err) => {
    res.status(500).json({"error" : err});
    }); 
}
});

module.exports = router;