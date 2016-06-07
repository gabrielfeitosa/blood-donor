'use strict';

var request = require('supertest');
var should = require("should");
var agent = request.agent('http://localhost:8081');


describe('init', function() {
    it('clean database', function(done) {
        agent
            .delete('/api/donor')
            .set('Accept', 'application/json')
            .expect(200)
            .end(done);
    })

})

var _id;
describe('POST /donor', function() {


    it('create user with invalid email and contactNumber', function(done) {
        agent
            .post('/api/donor')
            .set('Accept', 'application/json')
            .send({
                'firstName': 'Gabriel',
                'lastName': 'Feitosa',
                'address': 'Test',
                'coords.lon': 1,
                'coords.lat': 1,
                'bloodGroup': 'A+',
                'email': 'testtest.com',
                'contactNumber': '+55555 5555 555'
            })
            .expect(400)
            .end(function(err, res) {
                res.body.errors.contactNumber.name.should.equal('ValidatorError');
                res.body.errors.email.name.should.equal('ValidatorError');
                done();
            });

    });

    it('create user with valid inputs', function(done) {
        agent
            .post('/api/donor')
            .set('Accept', 'application/json')
            .send({
                'firstName': 'Gabriel',
                'lastName': 'Feitosa',
                'address': 'Test',
                'coords.lon': 10,
                'coords.lat': 10,
                'bloodGroup': 'A+',
                'email': 'test@test.com',
                'contactNumber': '+55 555 5555 555'
            })
            .expect(200)
            .end(function(err, res) {
                _id = res.body._id;
                res.body.should.have.property('_id');
                res.body.should.have.property('ip');
                done();
            });

    });



});

describe('GET /donor', function() {
    it('list without params', function(done) {
        agent
            .get('/api/donor')
            .set('Accept', 'application/json')
            .expect(400, {
                message: 'Invalid parameters'
            })
            .end(done);
    });

    it('list with params', function(done) {
        agent
            .get('/api/donor?xmin=8&xmax=11&ymin=8&ymax=11')
            .set('Accept', 'application/json')
            .expect(200)
            .end(done);
    });

});

describe('GET /donor/:id', function() {

    it('find invalid id', function(done) {
        agent
            .get('/api/donor/1')
            .set('Accept', 'application/json')
            .expect(400)
            .end(done);
    });


    it('find valid id', function(done) {
        agent
            .get('/api/donor/' + _id)
            .set('Accept', 'application/json')
            .expect(200)
            .end(done);
    });
});

describe('PUT /donor/:id', function() {
    
    it('update withou id', function(done) {
        agent
            .put('/api/donor')
            .set('Accept', 'application/json')
            .expect(404)
            .end(done);
    });

    it('updated ', function(done) {
        agent
            .put('/api/donor/'+_id)
            .set('Accept', 'application/json')
            .send({
                'firstName': 'Gabriel',
                'lastName': 'Feitosa',
                'address': 'Test',
                'coords.lon': 10,
                'coords.lat': 10,
                'bloodGroup': 'O+',
                'email': 'test@test.com',
                'contactNumber': '+55 555 5555 555'
            })
            .expect(200)
            .end(done);
    });

});


describe('DELETE /donor/:id', function() {
    
    it('deleted invalid id', function(done) {
        agent
            .delete('/api/donor/1'+_id)
            .set('Accept', 'application/json')
            .expect(400)
            .end(done);
    });

    it('deleted valid id', function(done) {
        agent
            .delete('/api/donor/'+_id)
            .set('Accept', 'application/json')
            .expect(200)
            .end(done);
    });

});