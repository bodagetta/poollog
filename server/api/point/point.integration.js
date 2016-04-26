'use strict';

var app = require('../../../server');
import request from 'supertest';

var newPoint;

describe('Point API:', function() {

  describe('GET /api/points', function() {
    var points;

    beforeEach(function(done) {
      request(app)
        .get('/api/points')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          points = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      points.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/points', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/points')
        .send({
          name: 'New Point',
          info: 'This is the brand new point!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newPoint = res.body;
          done();
        });
    });

    it('should respond with the newly created point', function() {
      newPoint.name.should.equal('New Point');
      newPoint.info.should.equal('This is the brand new point!!!');
    });

  });

  describe('GET /api/points/:id', function() {
    var point;

    beforeEach(function(done) {
      request(app)
        .get('/api/points/' + newPoint._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          point = res.body;
          done();
        });
    });

    afterEach(function() {
      point = {};
    });

    it('should respond with the requested point', function() {
      point.name.should.equal('New Point');
      point.info.should.equal('This is the brand new point!!!');
    });

  });

  describe('PUT /api/points/:id', function() {
    var updatedPoint;

    beforeEach(function(done) {
      request(app)
        .put('/api/points/' + newPoint._id)
        .send({
          name: 'Updated Point',
          info: 'This is the updated point!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedPoint = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedPoint = {};
    });

    it('should respond with the updated point', function() {
      updatedPoint.name.should.equal('Updated Point');
      updatedPoint.info.should.equal('This is the updated point!!!');
    });

  });

  describe('DELETE /api/points/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/points/' + newPoint._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when point does not exist', function(done) {
      request(app)
        .delete('/api/points/' + newPoint._id)
        .expect(404)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

  });

});
