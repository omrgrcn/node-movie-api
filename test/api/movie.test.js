const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const server = require('../../app');
const mongoose = require('mongoose');

chai.use(chaiHttp);

let token;

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
        })
    });

    describe('POST movie', () => {
        it('it should POST a movie', (done) => {
            const movie = {
                title: 'Game of Mochas',
                //director_id: ObjectId('5ca7bab64f040711ba9520ae').valueOf,
                test: 'test_value',
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
                    done();
                });
        });
    });
});