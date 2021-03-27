const assert = require('assert');
const User = require('../src/user');
const validationMessages = require('../src/consts');

describe('Validation records', () => {
    it('requires a user name', (done) => {
        const user = new User({ name: undefined });

        user.validate((validationResult) => {
            const { message } = validationResult.errors.name;

            assert(message === validationMessages.required);
            done();
        });

    })

    it('requires a user\'s name longer than 2 characters ', (done) => {
        const user = new User({ name: 'AI' });

        user.validate((validationResult) => {
            const { message } = validationResult.errors.name;

            assert(message === validationMessages.minLength)
            done();
        })
    })

    it('disallows invalid records from being saved', (done) => {
        const user = new User({ name: 'AI' });
        user.save()
            .catch((validationResult) => {
                const { message } = validationResult.errors.name;

                assert(message === validationMessages.minLength)
                done();
            })
    })
})