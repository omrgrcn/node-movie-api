const mongoose = require('mongoose');

module.exports = () => {
    mongoose.connect('mongodb://movie_user:abcd1234@ds131296.mlab.com:31296/movie-api', { useNewUrlParser: true });

    mongoose.connection.on('open',() => {
        console.log('Connected MongoDB');
    });
    
    mongoose.connection.on('error',(err) => {
        console.log('Connection Error', err);
    });

    mongoose.Promise = global.Promise;
};