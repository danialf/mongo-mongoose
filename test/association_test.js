const assert = require("assert");
const mongoose = require('mongoose');
const User = require('../src/user');
const Comment = require('../src/comment');
const Post = require('../src/post');

describe('Associations', () => {
    let jack, post, comment;
    beforeEach((done) => {
        jack = new User({
            name: 'Jack'
        });
        post = new Post({ title: 'post', content: 'some content' });
        comment = new Comment({ content: 'nice comment!' });

        jack.posts.push(post);
        post.comments.push(comment);
        comment.user = jack;

        Promise.all([
            jack.save(),
            post.save(),
            comment.save()
        ]).then(() => done());
    });

    it('saves a relation between a user and a post', (done) => {
        User.findOne({ name: 'Jack' })
            .populate('posts')
            .then((user) => {
                assert(user.posts[0].title === post.title)
                done();
            })
    });

    it('saves a full relation graph', (done) => {
        User.findOne({ name: 'Jack' })
            .populate({
                path: 'posts',
                populate: {
                    path: 'comments',
                    model: 'comment',
                    populate: {
                        path: 'user',
                        model: 'user'
                    }
                }
            })
            .then((user) => {
                assert(user.name === 'Jack')
                assert(user.posts[0].title === post.title)
                assert(user.posts[0].comments[0].content === comment.content)
                assert(user.posts[0].comments[0].user.name === user.name)
                done();
            })
    })
})