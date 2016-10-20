
var expect = require('chai').expect;

describe('HelloWorld', function() {
    var testObj = null;
    before(function() {
        testObj = {};
    });

    it('should not be null', function(done) {
        expect(testObj).to.exist;
        expect(testObj).to.not.equal(null);
        done();
    });

    xit('should fail', function(done) {
        expect(testObj).to.not.exist;
        done();
    });
});