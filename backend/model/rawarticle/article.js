var mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bossSchema = new Schema({
    articleId : {
        type : Number,
        required : true
    },
    articleContext : {
        type : String,
        required : true
    },
    createAt : {
        type : Date,
        default : Date.now()
    },
});

const Boss = mongoose.model('boss', bossSchema);

module.exports = Boss;