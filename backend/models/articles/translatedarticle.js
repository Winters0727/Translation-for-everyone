var mongoose = require('mongoose');
const Schema = mongoose.Schema;

const translatedArticleSchema = new Schema({
    articleId : {
        type : Number,
        required : true
    },
    originArticleId : {
        type : Number,
        required : true
    },
    originArticleContext : {
        type : String,
        required : true
    },
    articleContext : {
        type : String,
    },
    createdUser : {
        type : String,
        required : true
    },
    joinUser : {
        type : Array
    },
    articleType : {
        type : String,
        required : true
    },
    createAt : {
        type : Date,
        default : Date.now()
    },
});

const TranslatedArticle = mongoose.model('translatedarticle', translatedArticleSchema);

module.exports = TranslatedArticle;