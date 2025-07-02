'use strict';

module.exports = function (input) {

    const criteria = input?.data?.criteria;

    if (!criteria) {
        throw "Input criteria was not defined!";
    }

    const output = {};

    output.parameters = {};
    output.parameters.productCode = null;
    output.parameters.documentNumber = null;
    output.parameters.isLatest = null;
    output.parameters.issueDateFrom = null;
    output.parameters.issueDateTo = null;

    if (criteria.documentNumber) {
        output.parameters.documentNumber = criteria.documentNumber;
    }

    if (criteria.insuranceProducts?.length > 0) {
        const productCodes = criteria.insuranceProducts.map(x => x.productCode);
        output.parameters.insuranceProducts = productCodes;
    }

    if (criteria.isLatest) {
        output.parameters.isLatest = criteria.isLatest;
    }

    if (criteria.issueDateFrom) {
        output.parameters.issueDateFrom = criteria.issueDateFrom;
    }

    if (criteria.issueDateTo) {
        output.parameters.issueDateTo = criteria.issueDateTo;
    }

    return output;
};
