const assert = require('assert');
const User = require('../src/user');

describe('User_Create', () => {

    it('Saves a user', (done) => {
        // create new instance for user
        const user = new User({ name: 'James' })

        // persist user to database
        user.save()
            .then(() => {
                // User saved correctly?
                assert(!user.isNew);
                done();
            });

    })

    it('Save array of users', (done) => {

        const users = [
            new User({
                name: 'user 1'
            }),
            new User({
                name: 'user 2'
            })
        ]

        users.forEach((user) => {
            user.save().then(() => {
                assert(!users.isNew);

            })
        })

        done();

    })

});