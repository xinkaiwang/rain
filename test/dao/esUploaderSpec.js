var expect = require('chai').expect;
var proxyquire = require('proxyquire').noCallThru();

describe('esUpload', function() {
    before(function() {
    });

    it('should able to create', function(done) {
        var esUploader = proxyquire('../../lib/dao/esUploader', {
            'request' : function mockRequest(opt) { }
        });
        expect(esUploader).to.exist;
        expect(esUploader).is.a('function');
        done();
    });

    it('should able to send 1 item', function(done) {
        function mockRequest(opt, cb) {
            expect(opt).to.exist;
            expect(opt.url).to.equal('http://es.xinkaiw.com/hb/hostAgent/_bulk');
            expect(opt.method).to.equal('POST');
            expect(opt.body).to.equal('{"index":{}}\n{"name":"foo","event":"bar"}\n')
            cb(null, {statusCode: 200});
        }
        var esUploader = proxyquire('../../lib/dao/esUploader', {
            'request' : mockRequest
        });
        esUploader([{name:'foo', event: 'bar'}])
        .then(function() {
            done();
        });
    });

    it('should able to send 2 item', function(done) {
        function mockRequest(opt, cb) {
            expect(opt).to.exist;
            expect(opt.url).to.equal('http://es.xinkaiw.com/hb/hostAgent/_bulk');
            expect(opt.method).to.equal('POST');
            expect(opt.body).to.equal('{"index":{}}\n{"name":"foo","event":"bar"}\n{"index":{}}\n{"name":"foo2","event":"bar2"}\n')
            //console.log(opt.body);
            cb(null, {statusCode: 200});
        }
        var esUploader = proxyquire('../../lib/dao/esUploader', {
            'request' : mockRequest
        });
        esUploader([{name:'foo', event: 'bar'}, {name:'foo2', event: 'bar2'}])
        .then(function() {
            done();
        });
    });

    xit('should fail', function(done) {
        expect(testObj).to.not.exist;
        done();
    });
});