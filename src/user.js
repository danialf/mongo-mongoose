const mongoose = require('mongoose');
const ArticleSchema = require('./article');
const ValidationMessages = require('./consts');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        validate: {
            validator: (name) => name.length > 2,
            message: ValidationMessages.minLength
        },
        required: [true, ValidationMessages.required]
    },
    articles: [ArticleSchema],
    likes: Number,
    posts: [{
        type: Schema.Types.ObjectId,
        ref: 'post'
    }]
});

// use function defenition to handle this binding to current object
UserSchema.virtual('articleCount').get(function () {
    return this.articles.length;
});

UserSchema.pre('remove', function (next) {
    // do not load post here
    const Post = mongoose.model('post');
    Post.deleteMany({ _id: { $in: this.posts } })
        .then(() => next());
});

const User = mongoose.model('user', UserSchema);

module.exports = User;
