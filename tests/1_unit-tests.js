const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function(){
  test('#Whole Number', function(done) {
    assert.equal(convertHandler.getNum('45kg'), '45', 'is a Number');
    done();
  });
  test('#Decimal', function(done) {
    assert.equal(convertHandler.getNum('4.6mi'), '4.6', 'is a Decimal');
    done();
  });
  test("#Fractional", function(done){
    assert.equal(convertHandler.getNum('1/2L'), '0.5', 'is a Fractional');
    done();
  });
  test("#Fractional + Decimal", function(done) {
    assert.equal(convertHandler.getNum('1/2.0kg'), '0.5', 'is a Fractional + Decimal');
    done();
  });
  test("#Double-Fraction", function(done) {
    assert.isFalse(convertHandler.getNum('3/2/3mi'), 'is a Double-Fraction');
    done();
  });
  test("#Default Number", function(done) {
    assert.equal(convertHandler.getNum('kg'), '1', 'is a Default Number');
    done();
  });
  test("#Valid Unit", function(done) {
    assert.isNotFalse(convertHandler.getUnit('mi'), 'is a Valid Unit');
    assert.isNotFalse(convertHandler.getUnit('L'), 'is a Valid Unit');
    assert.isNotFalse(convertHandler.getUnit('kg'), 'is a Valid Unit');
    assert.isNotFalse(convertHandler.getUnit('lbs'), 'is a Valid Unit');
    assert.isNotFalse(convertHandler.getUnit('km'), 'is a Valid Unit');
    assert.isNotFalse(convertHandler.getUnit('gal'), 'is a Valid Unit');
    done();
  });
  test("#Invalid Unit", function(done) {
    assert.isFalse(convertHandler.getUnit('mig'), 'is an Invalid Unit');
    done();
  });
  test("#Correct Return Unit", (done) => {
    assert.equal(convertHandler.getReturnUnit('l'), 'gal');
    assert.equal(convertHandler.getReturnUnit('gal'), 'L');
    assert.equal(convertHandler.getReturnUnit('mi'), 'km');
    assert.equal(convertHandler.getReturnUnit('km'), 'mi');
    assert.equal(convertHandler.getReturnUnit('kg'), 'lbs');
    assert.equal(convertHandler.getReturnUnit('lbs'), 'kg');
    done();
  });
  test("#Correct SpellOut Unit", (done) => {
    assert.equal(convertHandler.spellOutUnit('l'), 'liters');
    assert.equal(convertHandler.spellOutUnit('L'), 'liters');
    assert.equal(convertHandler.spellOutUnit('gal'), 'gallons');
    assert.equal(convertHandler.spellOutUnit('mi'), 'miles');
    assert.equal(convertHandler.spellOutUnit('km'), 'kilometers');
    assert.equal(convertHandler.spellOutUnit('kg'), 'kilograms');
    assert.equal(convertHandler.spellOutUnit('lbs'), 'pounds');
    done();
  });
  test("#Correct conversion Gal -> L", (done) => {
    assert.include(convertHandler.convert(1, 'gal'), { returnNum: 3.78541 });
    done();
  });
  test("#Correct conversion L -> gal", (done) => {
    assert.include(convertHandler.convert(1, 'l'), { returnNum: 0.26417 });
    done();
  });
  test("#Correct conversion mi -> km", (done) => {
    assert.include(convertHandler.convert(1, 'mi'), { returnNum: 1.60934  });
    done();
  });
  test("#Correct conversion km -> mi", (done) => {
    assert.include(convertHandler.convert(1, 'km'), { returnNum: 0.62137 });
    done();
  });
  test("#Correct conversion lbs -> kg", (done) => {
    assert.include(convertHandler.convert(1, 'lbs'), { returnNum: 0.45359 });
    done();
  });
  test("#Correct conversion kg -> lbs", (done) => {
    assert.include(convertHandler.convert(1, 'kg'), { returnNum: 2.20462 });
    done();
  });
});