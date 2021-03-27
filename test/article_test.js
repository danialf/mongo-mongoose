const assert = require('assert');
const User = require('../src/user');

describe('articles Subdocument', () => {
    it('can create a article', (done) => {
        const jack = new User({
            name: 'Jack',
            articles: [{
                title: 'PostTitle'
            }]
        });

        jack.save()
            .then(() => User.findOne({ name: 'Jack' }))
            .then((user) => {
                assert(user.articles[0].title === 'PostTitle');
                done();
            })
    })

    it('Can add a article to existing user', (done) => {
        const jack = new User({
            name: 'Jack',
            articles: []
        });

        jack.save()
            .then(() => User.findOne({ name: 'Jack' }))
            .then((user) => {
                user.articles.push({
                    title: 'article1'
                });
                return user.save();  
            })
            .then(() => User.findOne({ name: 'Jack' }))
            .then((user) => {
                assert(user.articles[0].title === 'article1')
                done();
            });
    })

    it('Can remove an existing article', (done) => {
        const jack = new User({
            name: 'Jack',
            articles: [
                {
                    title: 'article1'
                }
            ]
        })

        jack.save()
            .then(() => User.findOne({ name: 'Jack' }))
            .then((user) => {
                const article = user.articles[0];
                article.remove();

                return user.save();
            })
            .then(() => User.findOne({ name: 'Jack' }))
            .then((user) => {
                assert(user.articles.length === 0)
                done();
            });
    })
})