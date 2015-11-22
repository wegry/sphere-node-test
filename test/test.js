import assert from 'assert'
import request from 'request'

describe('Landing page', function() {
  describe('#GET', function () {
    it('should not error out on request', function (done) {
      request('http://localhost:5000/', function (error, response, body) {
        assert.equal(response.statusCode, 200)
        done();
      })
    })
  })
})

describe('Products', function() {
  describe('#fetch', function () {
    it('should return a name, description, and picture', function (done) {
      request('http://localhost:5000/products', function (error, response, body) {
        assert.equal(response.statusCode, 200)
        done();
      })
    })
  })
})
