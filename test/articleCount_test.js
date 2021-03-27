const assert = require('assert');
const User = require('../src/user');

describe('ArticleCount Virtual proprty', () => {
    it('article Count returns number of posts', (done) => {
        const jack = new User({
            name: 'Jack',
            articles: [{ title: 'Article' }]
        });

        jack.save()
            .then(() => User.findOne({ name: 'Jack' }))
            .then((user) => {
                assert(user.articleCount === 1);
                done();
            })
    })
})