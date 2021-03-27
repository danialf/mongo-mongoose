const assert = require('assert');
const User = require('../src/user');

describe('Delete_user', () => {
    const name = 'James'

    let james;
    beforeEach((done) => {
        james = new User({ name: name })
        james.save()
            .then(() => done());
    })

    function assertName(operation, done) {
        operation.then(() => User.findOne({ name: name }))
            .then((user) => {
                assert(user === null)
                done();
            })
    }

    it('model instance remove', (done) => {
        assertName(james.remove(), done)
    })

    it('class method delete one', (done) => {
        assertName(User.findOneAndDelete({ name: name }), done)
    })

    it('class method findByIdandRemove', (done) => {
        assertName(User.findByIdAndDelete({ _id: james._id }), done)
    })

});