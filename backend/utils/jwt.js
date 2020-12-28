const jwt = require('jsonwebtoken');
require('dotenv').config();

// JWT 토큰과 리프레시 토큰 생성
const createToken = function(payload) {
    const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn : process.env.EXPIRE_TIME});
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {expiresIn : process.env.REFRESH_EXPIRE_TIME});
    return {"token" : token, "refreshToken" : refreshToken}
}

// JWT 토큰 검증
const verifyToken = function(inputToken, inputRefreshToken) {
    try {
        const result = jwt.verify(inputToken, process.env.JWT_SECRET); // JWT 토큰 검증에 성공하면 결과 반환
        return {"result" : result}
    } catch { // JWT 토큰 검증에 실패했다면
        try {
            const result = jwt.verify(inputRefreshToken, process.env.JWT_REFRESH_SECRET); // 리프레시 토큰을 검증
            const { _id, kakaoEmail, userNickname} = result;
            const payload = { "_id" : _id, "kakaoEmail" : kakaoEmail, "userNickname" : userNickname}; // 리프레시 토큰 결과로 페이로드를 만들고
            const { token, refreshToken } = createToken(payload) // 토큰 생성 및 반환
            return { "result" : result, "token" : token, "refreshToken" : refreshToken}
        } catch {
            return {"tokenError" : "Unvalid token error"} // 리프레시 토큰 검증에 실패하면 문제가 있는 것
        }
    }
}

const checkToken = function(req, res) {
    const requestToken = req.cookies.token; // 토큰은 쿠키에서
    const requestRefreshToken = req.headers.authorization; // 리프레시 토큰은 헤더에서
    const verifyResult = verifyToken(requestToken, requestRefreshToken)
    const resultObject = Object.keys(verifyResult);
    if (resultObject.includes("token")) { // 토큰이 있음 === 토큰이 만료되서 토큰을 새로 발급받음
        res.cookie("token", verifyResult["token"]);
    }
    return verifyResult
}

module.exports = { createToken, verifyToken, checkToken }