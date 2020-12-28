var mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    userEmail : {
        type : String,
        required : true,
        unique : true,
        lowercase : true,
    },
    userNickname : {
        type : String,
        required : true,
        unique : true,
    },
    userPassword : {
        type : String,
        required : true,
    },
    joinProjects : {
        type : Array,
        default : [],
    },
    createAt : {
        type : Date,
        default : Date.now(),
    },
});

const User = mongoose.model('user', userSchema);

module.exports = User;