'use strict';

module.exports = function (input) {

    const output = {};
    output.parameters = {};
    output.parameters.productCode = input.data.criteria.productCode;
    output.parameters.riskCode = input.data.criteria.riskCode;

    return output;

};
