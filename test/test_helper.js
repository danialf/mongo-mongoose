const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect("mongodb://localhost:27017/users_test", {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false
});

before((done) => {
    mongoose.connection
        .once('open', () => {
            done();
        })
        .on('error', (error) => {
            console.error(error);
        });
})



// define hooke cleanup
beforeEach((done) => {
    const { users, comments, posts } = mongoose.connection.collections;
    users.drop(() => {
        comments.drop(() => {
            posts.drop(() => {
                done();
            })
        })

    });
})