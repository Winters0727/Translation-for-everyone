const bcrypt = require('bcrypt');

const hashPassword = function(password) {
    return bcrypt.hash(password, 10)
}

const hasResult = function(result) {
    const resultKeys = Object.keys(result);
    if (resultKeys.includes("result")) {
        return true
    } else {
        return false
    }
}

module.exports = { hashPassword, hasResult }