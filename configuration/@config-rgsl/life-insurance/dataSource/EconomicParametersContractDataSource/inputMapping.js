'use strict';

module.exports = function (input) {

    const criteria = input?.data?.criteria;

    if (!criteria) {
        throw "Input criteria was not defined!";
    }

    if (!criteria.productCode && (!criteria.productGroups || criteria.productGroups.length === 0)) {
        throw 'Invalid input parameters!';
    }

    const output = {};

    output.parameters = {};
    output.parameters.productCode = null;

    if (criteria.productCode) {
        output.parameters.productCode = criteria.productCode;
    }

    if (criteria.selectedRules?.length > 0) {
        output.parameters.selectedRules = criteria.selectedRules;
    }

    if (criteria.contractNumbers?.length > 0) {
        output.parameters.contractNumbers = criteria.contractNumbers;
    }

    if (criteria.productGroups?.length > 0) {
        output.parameters.productGroups = criteria.productGroups;
    }

    return output;
};
