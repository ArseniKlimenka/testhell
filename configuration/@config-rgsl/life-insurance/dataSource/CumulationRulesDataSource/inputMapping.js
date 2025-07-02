'use strict';

module.exports = function (input) {

    const output = {};
    output.parameters = {};
    output.parameters.currentDate = null;
    output.parameters.productCode = null;
    output.parameters.cumulationProductGroup = null;

    const criteria = input.data.criteria;

    if (criteria.currentDate) {

        output.parameters.currentDate = criteria.currentDate;
    }

    if (criteria.productCode) {

        output.parameters.productCode = criteria.productCode;
    }

    if (criteria.cumulationProductGroup) {

        output.parameters.cumulationProductGroup = criteria.cumulationProductGroup;
    }

    return output;
};
