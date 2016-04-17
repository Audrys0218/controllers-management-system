'use strict';

var should = require('should'),
    request = require('supertest'),
    path = require('path'),
    mongoose = require('mongoose'),
    MicroController = mongoose.model('MicroController'),
    express = require(path.resolve('./config/lib/express'));

var agent;

describe('MicroController crud tests', function () {
    before(function (done) {
        agent = request.agent(express.init(mongoose));
        done();
    });

    it('should be able to create new microcontroller', function (done) {
        var request = {
            title: 'Test',
            place: '5712a9c1618929fe0d7e4106',
            ip: '192.1680.25'
        };

        agent.post('/api/v1/microcontroller')
            .send(request)
            .expect(200)
            .end(function (err, res) {

                should.not.exists(err);
                res.body.title.should.be.equal('Test');
                res.body.place.should.be.equal('5712a9c1618929fe0d7e4106');
                res.body.ip.should.be.equal('192.1680.25');

                return done();
            });
    });

    it('should return microcontroller by id', function (done) {
        new MicroController({
            title: 'Test',
            place: '5712a9c1618929fe0d7e4106',
            ip: '192.1680.25'
        }).save(function (err, microController) {

            should.not.exists(err);

            agent.get('/api/v1/microcontroller/' + microController._id)
                .send()
                .expect(200)
                .end(function (err, res) {

                    should.not.exists(err);
                    res.body.title.should.be.equal('Test');
                    res.body.place.should.be.equal('5712a9c1618929fe0d7e4106');
                    res.body.ip.should.be.equal('192.1680.25');

                    return done();
                });
        });
    });

    it('should be able to update microcontroller', function (done) {
        var request = {
            title: 'Test2',
            place: '5712a9c1618929fe0d7e4107',
            ip: '192.1680.26'
        };

        new MicroController({
            title: 'Test',
            place: '5712a9c1618929fe0d7e4106',
            ip: '192.1680.25'
        }).save(function (err, microController) {

            should.not.exists(err);

            agent.put('/api/v1/microcontroller/' + microController._id)
                .send(request)
                .expect(200).end(function () {
                MicroController.findById({_id: microController._id}, function (err, mc) {

                    should.not.exists(err);
                    mc.title.should.be.equal(request.title);
                    // mc.place.should.be.equal(request.place);
                    mc.ip.should.be.equal(request.ip);

                    return done();
                });
            });
        });
    });

    it('should remove microcontroller', function (done) {
        new MicroController({
            title: 'Test',
            place: '5712a9c1618929fe0d7e4106',
            ip: '192.1680.25'
        }).save(function (err, microController) {

            should.not.exists(err);

            agent.delete('/api/v1/microcontroller/' + microController._id)
                .send()
                .expect(200).end(function () {
                MicroController.findById({_id: microController._id}, function (err, mc) {

                    should.not.exists(err);
                    should.not.exists(mc);

                    return done();
                });
            });
        });
    });

    afterEach(function (done) {
        MicroController.remove().exec(done);
    });
});
