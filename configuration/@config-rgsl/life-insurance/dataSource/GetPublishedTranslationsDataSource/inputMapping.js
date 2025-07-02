'use strict';

module.exports = function (input) {

    const output = {};
    output.parameters = {};

    if (input.data.criteria.subString) {
        output.parameters.subString = input.data.criteria.subString;
    }

    if (input.data.criteria.subStringArr && input.data.criteria.subStringArr.length > 0) {
        output.parameters.subStringArr = input.data.criteria.subStringArr;
    }

    return output;

};
