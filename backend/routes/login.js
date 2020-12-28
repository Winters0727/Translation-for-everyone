var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/user');
const { createToken } = require('../utils/jwt')

router.post('/login', function(req, res, next) {
  const reqObject = Object.keys(req.body);
  if (reqObject.includes("kakaoEmail") && reqObject.includes("userPassword")) {
    User.findOne({"kakaoEmail" : req.body.kakaoEmail}).select(["_id", "kakaoEmail", "userNickname", "userPassword"]).then((resResult) => {
    if (resResult !== null && Object.keys(resResult).length) {
    bcrypt.compare(req.body.userPassword, resResult.userPassword, function(err, result) {
        try {
          if (result === true) {
            const payload = {
              "_id" : resResult._id,
              "kakaoEmail" : resResult.kakaoEmail,
              "userNickname" : resResult.userNickname
            };
            const { token, refreshToken } = createToken(payload);
            res.cookie("token", token);
            res.json({"loginResult" : result, "token" : token, "refreshToken" : refreshToken});
          } else {
            res.json({"loginResult" : result});
          }
        } catch {
          res.json({"hashedPasswordError" : err});
        }
    });
    } else {
        res.json({"findUserError" : "No user info"});
    }

    }).catch(() => {
        res.status(500).json({"processError" : "Error occured during process"});
      });
  } else {
      res.status(400).json({"requestError" : "Bad Request"});
  }
});
module.exports = router;