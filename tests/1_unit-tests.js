const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function(){
  test('#Whole Number', function() {
    assert.equal(convertHandler.getNum % 1, '0', 'is a Number');
  });
  test('#Decimal', function() {
    assert.notEqual(convertHandler.getNum % 1, '0', 'is a Decimal');
  });
  
});