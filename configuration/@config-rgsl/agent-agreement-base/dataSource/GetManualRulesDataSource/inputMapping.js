'use strict';

const dataProviderHelper = require('@config-rgsl/agent-agreement-base/lib/AAEvalDataProviderHelper');

module.exports = function (input) {

    const output = {};
    output.parameters = {};

    output.parameters.calculationDate = input.data.criteria.calculationDate;
    output.parameters.product = input.data.criteria.product;
    output.parameters.aaNumber = input.data.criteria.aaNumber;

    return output;
};
