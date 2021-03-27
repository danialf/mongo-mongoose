const assert = require('assert');
const User = require('../src/user');

describe('Reading_Users', () => {
    let james, mary, dave, mack;
    beforeEach((done) => {
        james = new User({ name: 'james' });
        mary = new User({ name: 'mary' });
        dave = new User({ name: 'dave' });
        mack = new User({ name: 'mack' });

        Promise.all([james.save(), mary.save(), dave.save(), mack.save()])
            .then(() => done());

    })

    it('finds all users with a name of james', (done) => {
        User.find({ name: 'james' })
            .then((users) => {
                assert(users[0]._id.toString() === james._id.toString())
                done();
            })
    })

    it('find a user with particular id', (done) => {
        User.findOne({ _id: james._id })
            .then((user) => {
                assert(user.name === james.name);
                done();
            })
    })

    it('can skip and limit the result set', (done) => {
        User.find({})
            .sort({ name: 1 })
            .skip(1)
            .limit(2)
            .then((users) => {
                assert(users.length === 2);
                assert(users[0].title === mary.title);
                assert(users[1].title === dave.title);
                done();
            })
    })

});
