const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const server = require('../../app');

chai.use(chaiHttp);

let token, movieId;

describe('/api/movies tests', () => {
    before((done) => {
        chai.request(server)
            .post('/authenticate')
            .send({ username: 'sabri', password: 'obrx' })
            .end((err,res) => {
                token = res.body.token;
                console.log(token);
                done();
            });
    });

    describe('/GET moives', () => {
        it('should be GET all the movies', (done) => {
            chai.request(server)
                .get('/api/movies')
                .set('x-access-token', token)
                .end((err,res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    done();
                });
        });
    });

    describe('/POST movie', () => {
        it('it should POST a movie', (done) => {
            const movie = {
                title: 'Game of Mochas',
                //director_id: ObjectId('5ca7bab64f040711ba9520ae').valueOf,
                //test: 'test_value',
                category: 'Komedi',
                country: 'Turkey',
                year: 1991,
                imdb_score: 4
            };

            chai.request(server)
                .post('/api/movies')
                .send(movie)
                .set('x-access-token', token)
                .end((err,res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('title');
                    //res.body.should.have.property('director_id');
                    res.body.should.have.property('category');
                    res.body.should.have.property('country');
                    res.body.should.have.property('year');
                    res.body.should.have.property('imdb_score');
                    movieId = res.body._id;
                    done();
                });
        });
    });

    describe('/GET/:director_id movie', () => {
        it('should be GET a movie by the given id', (done) => {
            chai.request(server)
                .get('/api/movies/'+ movieId)
                .set('x-access-token', token)
                .end((err,res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('title');
                    res.body.should.have.property('category');
                    res.body.should.have.property('country');
                    res.body.should.have.property('year');
                    res.body.should.have.property('imdb_score');
                    res.body.should.have.property('_id').eql(movieId);
                    done();
                });
        });
    });

    describe('/PUT movie', () => {
        it('it should PUT a movie by the given id', (done) => {
            const movie = {
                title: 'Hayvan Mezarlığı',
                //director_id: ObjectId('5ca7bab64f040711ba9520ae').valueOf,
                category: 'Korku',
                country: 'USA',
                year: 2019,
                imdb_score: 9
            };

            chai.request(server)
                .put('/api/movies/'+ movieId)
                .send(movie)
                .set('x-access-token', token)
                .end((err,res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('title').eql(movie.title);
                    //res.body.should.have.property('director_id');
                    res.body.should.have.property('category').eql(movie.category);
                    res.body.should.have.property('country').eql(movie.country);
                    res.body.should.have.property('year').eql(movie.year);
                    res.body.should.have.property('imdb_score').eql(movie.imdb_score);
                    done();
                });
        });
    });
});