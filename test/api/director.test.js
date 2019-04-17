const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const server = require('../../app');

chai.use(chaiHttp);

let token, directorId;

describe('/api/directors tests', () => {
    before((done) => {
        chai.request(server)
            .post('/authenticate')
            .send({ username: 'sabri', password: 'obrx' })
            .end((err,res) => {
                token = res.body.token;
                //console.log(token);
                done();
            });
    });

    describe('/GET directors', () => {
        it('should be GET all the directors', (done) => {
            chai.request(server)
                .get('/api/directors')
                .set('x-access-token', token)
                .end((err,res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    done();
                });
        });
    });

    describe('/POST director', () => {
        it('it should POST a director', (done) => {
            const director = {
                name: 'test-username',
                surname: 'test-usersurname',
                bio: 'test-bio'
            };

            chai.request(server)
                .post('/api/directors')
                .send(director)
                .set('x-access-token', token)
                .end((err,res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('name');
                    res.body.should.have.property('surname');
                    res.body.should.have.property('bio');
                    directorId = res.body._id;
                    done();
                });
        });
    });

    describe('/GET/:director_id director', () => {
        it('should be GET a director by the given id', (done) => {
            chai.request(server)
                .get('/api/directors/'+ directorId)
                .set('x-access-token', token)
                .end((err,res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body[0].should.have.property('name');
                    res.body[0].should.have.property('surname');
                    res.body[0].should.have.property('bio');
                    res.body[0].should.have.property('movies');
                    res.body[0].should.have.property('_id').eql(directorId);
                    done();
                });
        });
    });

    describe('/PUT/:director_id director', () => {
        it('it should PUT a director by the given id', (done) => {
            const director = {
                name: 'new-test-username',
                surname: 'new-test-usersurname',
                bio: 'new-test-bio'
            };

            chai.request(server)
                .put('/api/directors/'+ directorId)
                .send(director)
                .set('x-access-token', token)
                .end((err,res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('name').eql(director.name);
                    res.body.should.have.property('surname').eql(director.surname);
                    res.body.should.have.property('bio').eql(director.bio);
                    done();
                });
        });
    });

    describe('/DELETE/:director_id director', () => {
        it('it should DELETE a director by the given id', (done) => {
            chai.request(server)
                .delete('/api/directors/'+ directorId)
                .set('x-access-token', token)
                .end((err,res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('status').eql(1);
                    done();
                });
        });
    });
});