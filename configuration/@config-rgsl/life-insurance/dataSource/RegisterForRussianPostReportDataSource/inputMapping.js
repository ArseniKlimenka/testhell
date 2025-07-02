'use strict';

module.exports = function (input) {

    const output = {};

    output.parameters = {};

    if (input.data.criteria.russianPostRegisterInclusionDateFrom) {
        output.parameters.russianPostRegisterInclusionDateFrom = input.data.criteria.russianPostRegisterInclusionDateFrom;
    }

    if (input.data.criteria.russianPostRegisterInclusionDateTo) {
        output.parameters.russianPostRegisterInclusionDateTo = input.data.criteria.russianPostRegisterInclusionDateTo;
    }

    return output;

};
