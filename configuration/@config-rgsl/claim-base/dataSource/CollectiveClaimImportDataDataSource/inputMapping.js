'use strict';

module.exports = function (input) {

    const output = {};

    output.parameters = {};
    output.parameters.claimNumber = input.data.criteria.claimNumber;
    output.parameters.claimId = input.data.criteria.claimId;
    output.parameters.contractNumber = input.data.criteria.contractNumber;

    return output;
};
