'use strict';

var should = require('should'),
    request = require('supertest'),
    path = require('path'),
    mongoose = require('mongoose'),
    Place = mongoose.model('Place'),
    express = require(path.resolve('./config/lib/express'));

var agent;

describe('Places crud tests', function () {
    before(function (done) {
        agent = request.agent(express.init(mongoose));
        done();
    });

    it('should be able to create new place', function (done) {
        var request = {
            model: {
                title: 'Test title'
            }
        };

        agent.post('/api/v1/places')
            .send(request)
            .expect(200)
            .end(function (err, res) {

                should.not.exists(err);
                res.body.title.should.be.equal(request.model.title);

                return done();
            });
    });

    it('should return error if place name is empty', function (done) {
        var request = {
            model: {
                title: ''
            }
        };

        agent.post('/api/v1/places')
            .send(request)
            .expect(400)
            .end(function (err, res) {

                should.not.exists(err);
                res.body.message.should.be.equal('Title cannot be blank');

                return done();
            });
    });

    it('should return error if place name exist in database', function (done) {
        new Place({title: 'Unique title'}).save();
        var request = {
            model: {
                title: 'Unique title'
            }
        };

        agent.post('/api/v1/places')
            .send(request)
            .expect(400)
            .end(function (err, res) {

                should.not.exists(err);
                res.body.message.should.be.equal('Place name should be unique');

                return done();
            });
    });

    xit('should return list of places', function (done) {
        new Place({title: 'Place 1'}).save();
        new Place({title: 'Place 2'}).save();

        agent.get('/api/v1/places')
            .send()
            .expect(200)
            .end(function (err, res) {

                should.not.exists(err);
                res.body.should.eql([]);

                return done();
            });
    });

    it('should return error if id is invalid', function (done) {
        agent.get('/api/v1/places/invalid_id')
            .send()
            .expect(400)
            .end(function (err, res) {

                should.not.exists(err);
                res.body.message.should.be.equal('Place id is invalid');

                return done();
            });
    });


    afterEach(function (done) {
        Place.remove().exec(done);
    });
});
