var mongoose = require('mongoose');
const Schema = mongoose.Schema;

const articleSchema = new Schema({
    articleId : {
        type : Number,
        required : true
    },
    articleContext : {
        type : String,
        required : true
    },
    createdUser : {
        type : String,
        required : true
    },
    createAt : {
        type : Date,
        default : Date.now()
    },
});

const Article = mongoose.model('article', articleSchema);

module.exports = Article;