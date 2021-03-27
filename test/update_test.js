const assert = require('assert');
const User = require('../src/user');

describe('Update_user', () => {
    let james = new User();
    const name = 'James';
    const updateName = 'Dave';
    beforeEach((done) => {
        james = new User({
            name: name,
            likes: 0
        });
        james.save()
            .then(() => done())
    });

    function assertName(operation, done) {
        operation
            .then(() => User.find({}))
            .then((users) => {
                assert(users.length === 1);
                assert(users[0].name === updateName);
                done();
            })
    }

    it('instance type using set & save', (done) => {
        james.set('name', updateName);
        assertName(james.save(), done)
    })

    it('A model instance can update', (done) => {
        assertName(james.updateOne({ name: updateName }), done)
    })

    it('A model class can update', (done) => {
        assertName(
            User.updateMany({ name }, { name: updateName }),
            done)
    })

    it('A model class can update one record', (done) => {
        assertName(
            User.findOneAndUpdate({ name }, { name: updateName })
            , done
        )
    })

    it('A model class can find and update record', (done) => {
        assertName(
            User.findByIdAndUpdate(james._id, { name: updateName })
            , done
        )

    })

    it('A user cn have their postcount incresed by 10', (done) => {
        User.updateMany(
            { name },
            {
                $inc: {
                    likes: 10
                }
            })
            .then(() => User.findOne({ name }))
            .then((user) => {
                assert(user.likes === 10)
                done();
            })
    })
})