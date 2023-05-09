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

    result = input.split(/(mi)(km)|(gal)|(L)|(lbs)|(kg)$/);
    if (err) {
      return false;
    }
    return result;
  };
  
  this.getUnit = function(input) {
    let result;
    // need to check input and validate
    
    result = input.match(/(mi)(km)|(gal)|(L)|(lbs)|(kg)$/);
    if (err) {
      return false;
    }
    return result;
  };
  
  this.getReturnUnit = function(initUnit) {
    let result;
    switch (initUnit){
      case 'gal':
        result = 'L';
        break;
      case 'L':
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
        result = 'liters';
        break;
      case 'L':
        result = 'gallons';
        break;
      case 'mi':
        result = 'kilometers';
        break;
      case 'km':
        result = 'miles';
        break;
      case 'kg':
        result = 'pounds';
        break;
      case 'lbs':
        result = 'kilograms';
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
      case 'L':
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
      initNum: initNum,
      initUnit: initUnit,
      returnNum: returnNum,
      returnUnit: this.getReturnUnit(initUnit),
      string: this.getString(initNum, initUnit, returnNum, this.getReturnUnit(initUnit)),
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
