'use strict';

module.exports = function (input) {

    const output = {};
    output.parameters = {};
    output.parameters.productCode = null;
    output.parameters.productCodes = null;
    output.parameters.variantCode = null;
    output.parameters.variantCodes = null;
    output.parameters.variantDescription = null;

    if (input.data.criteria.productCode) {

        output.parameters.productCode = input.data.criteria.productCode;
    }

    if (input.data.criteria.productCodes) {

        output.parameters.productCodes = input.data.criteria.productCodes;
    }

    if (input.data.criteria.variantCode) {

        output.parameters.variantCode = input.data.criteria.variantCode;
    }

    if (input.data.criteria.variantCodes) {

        output.parameters.variantCodes = input.data.criteria.variantCodes;
    }

    if (input.data.criteria.variantDescription) {

        output.parameters.variantDescription = '%' + input.data.criteria.variantDescription + '%';
    }

    if (input.data.criteria.searchText) {

        output.parameters.searchText = '%' + input.data.criteria.searchText + '%';
    }

    return output;
};
