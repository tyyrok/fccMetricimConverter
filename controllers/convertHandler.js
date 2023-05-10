function ConvertHandler() {
  
  this.getResult = function(input) {
    if (!this.getNum(input)) {
      if (!this.getUnit(input)){
        return 'invalid number and unit';
      }
      return 'invalid number';
    } else if (!this.getUnit(input)) {
      return 'invalid unit';
    }
    
    return this.convert(this.getNum(input), this.getUnit(input));
  };
  
  this.getNum = function(input) {
    let result;
    // need to check input and validate
    result = input.toLowerCase().split(/[a-zA-Z]/)[0];
    if (result == '') {
      result = '1';
    } else if (!result) {
      return false;
    } else if (result.match(/\d+(\.){0,1}\d*(\/){0,1}\d*\.*\d*/)[0] != result) {
      return false;
    } 
    //console.log("getNum = " + eval(result));
    return eval(result);
  };
  
  this.getUnit = function(input) {
    let result;
    // need to check input and validate

    result = input.toLowerCase().match(/(mi)$|(km)$|(gal)$|(l)$|(lbs)$|(kg)$/);
    if (!result) {
      return false;
    }
    //console.log("getUnit = " + result[0]);
    return result[0];
  };
  
  this.getReturnUnit = function(initUnit) {
    let result;
    switch (initUnit){
      case 'gal':
        result = 'L';
        break;
      case 'l':
        result = 'gal';
        break;
      case 'mi':
        result = 'km';
        break;
      case 'km':
        result = 'mi';
        break;
      case 'kg':
        result = 'lbs';
        break;
      case 'lbs':
        result = 'kg';
        break;
    }
    return result;
  };

  this.spellOutUnit = function(unit) {
    let result;
    switch (unit) {
      case 'gal':
        result = 'gallons';
        break;
      case 'L':
        result = 'liters';
        break;
      case 'l':
        result = 'liters';
        break;
      case 'mi':
        result = 'miles';
        break;
      case 'km':
        result = 'kilometers';
        break;
      case 'kg':
        result = 'kilograms';
        break;
      case 'lbs':
        result = 'pounds';
        break;
    }
    return result;
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;
    let returnNum;
    // Convert here
    switch (initUnit) {
      case 'gal':
        returnNum = initNum * galToL;
        break;
      case 'l':
        returnNum = initNum / galToL;
        break;
      case 'lbs':
        returnNum = initNum * lbsToKg;
        break;
      case 'kg':
        returnNum = initNum / lbsToKg;
        break;
      case 'mi':
        returnNum = initNum * miToKm;
        break;
      case 'km':
        returnNum = initNum / miToKm;
        break;
    }
    
    result = {
      initNum: +initNum,
      initUnit: (initUnit == 'l') ? initUnit.toUpperCase() : initUnit,
      returnNum: +returnNum.toFixed(5),
      returnUnit: this.getReturnUnit(initUnit),
      string: this.getString(initNum, initUnit, returnNum.toFixed(5), this.getReturnUnit(initUnit)),
    };
    return result;
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    let result;
    result = `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
    return result;
  };
  
}

module.exports = ConvertHandler;
