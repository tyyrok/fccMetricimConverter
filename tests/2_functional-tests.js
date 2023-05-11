const chaiHttp = require('chai-http');
const chai = require('chai');
let assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {
  this.timeout(5000);
  suite('Tests with Chai http', function() {
    test('#1 Convert a valid input such as 10L: GET request to /api/convert.', (done) => {
      chai.request(server)
          .keepOpen()
          .get('/api/convert?input=10L')
          .end((err, res) => {
            assert.equal(res.status, 200);
            assert.equal(res.type, "application/json");
            assert.notEqual(res.body, 'invalid unit');
            done();
          })
    });

    test('#2 Convert an invalid input such as 32g: GET request to /api/convert.', (done) => {
      chai.request(server)
          .keepOpen()
          .get('/api/convert?input=32g')
          .end((err, res) => {
            assert.equal(res.status, 200);
            assert.equal(res.type, "application/json");
            assert.equal(res.body, 'invalid unit');
            done();
          })
    });

    test('#3 Convert an invalid number such as 3/7.2/4kg: GET request to /api/convert.', (done) => {
      chai.request(server)
          .keepOpen()
          .get('/api/convert?input=3/7.2/4kg')
          .end((err, res) => {
            assert.equal(res.status, 200);
            assert.equal(res.type, "application/json");
            assert.equal(res.body, 'invalid number');
            done();
          })
    });

    test('#4 Convert an invalid number AND unit such as 3/7.2/4kilomegagram: GET request to /api/convert.', (done) => {
      chai.request(server)
          .keepOpen()
          .get('/api/convert?input=3/7.2/4kilomegagram')
          .end((err, res) => {
            assert.equal(res.status, 200);
            assert.equal(res.type, "application/json");
            assert.equal(res.body, 'invalid number and unit');
            done();
          })
    });

    test('#5 Convert with no number such as kg: GET request to /api/convert', (done) => {
      chai.request(server)
          .keepOpen()
          .get('/api/convert?input=kg')
          .end((err, res) => {
            assert.equal(res.status, 200);
            assert.equal(res.type, "application/json");
            assert.equal(res.body.returnNum, 2.20462 );
            done();
          })
    });
  });
});
