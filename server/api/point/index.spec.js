'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var pointCtrlStub = {
  index: 'pointCtrl.index',
  show: 'pointCtrl.show',
  create: 'pointCtrl.create',
  update: 'pointCtrl.update',
  destroy: 'pointCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var pointIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './point.controller': pointCtrlStub
});

describe('Point API Router:', function() {

  it('should return an express router instance', function() {
    pointIndex.should.equal(routerStub);
  });

  describe('GET /api/points', function() {

    it('should route to point.controller.index', function() {
      routerStub.get
        .withArgs('/', 'pointCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/points/:id', function() {

    it('should route to point.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'pointCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/points', function() {

    it('should route to point.controller.create', function() {
      routerStub.post
        .withArgs('/', 'pointCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/points/:id', function() {

    it('should route to point.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'pointCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/points/:id', function() {

    it('should route to point.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'pointCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/points/:id', function() {

    it('should route to point.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'pointCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
