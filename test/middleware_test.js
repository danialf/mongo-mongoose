const mongoose = require('mongoose');
const assert = require('assert');
const User = require('../src/user');
const Post = require('../src/post');

describe('Middleware', () => {
    let jack, post;

    beforeEach((done) => {
        jack = new User({
            name: 'Jack'
        });
        post = new Post({ title: 'post', content: 'some content' });

        jack.posts.push(post);

        Promise.all([
            jack.save(),
            post.save(),
        ]).then(() => done());
    });

    it('users cleanup dangling posts on delete',(done) =>{
        jack.remove()
        .then(() => Post.countDocuments())
        .then((count) =>{
            assert(count ===0)
            done();
        })
    })
});