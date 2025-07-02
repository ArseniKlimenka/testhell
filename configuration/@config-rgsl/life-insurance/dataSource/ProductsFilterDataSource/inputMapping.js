'use strict';

module.exports = function (input) {

    const output = {};

    output.parameters = {};
    output.parameters.code = null;
    output.parameters.description = null;
    output.parameters.codes = null;
    output.parameters.productGroup = null;
    output.parameters.maxVersion = true;
    output.parameters.importDocumentId = null;
    output.parameters.productCode = null;
    output.parameters.issueDate = null;
    output.parameters.issueDateFrom = null;
    output.parameters.issueDateTo = null;

    if (input.data.criteria.code) {

        output.parameters.code = input.data.criteria.code;
    }

    if (input.data.criteria.codes) {

        output.parameters.codes = input.data.criteria.codes;
    }

    if (input.data.criteria.description) {

        output.parameters.description = '%' + input.data.criteria.description + '%';
    }

    if (input.data.criteria.productGroup) {

        output.parameters.productGroup = input.data.criteria.productGroup;
    }

    if (input.data.criteria.searchText) {

        output.parameters.searchText = '%' + input.data.criteria.searchText + '%';
    }

    if (input.data.criteria.importDocumentId) {
        output.parameters.importDocumentId = input.data.criteria.importDocumentId;
    }

    if (input.data.criteria.productCode) {
        output.parameters.productCode = input.data.criteria.productCode;
    }

    if (input.data.criteria.issueDate) {
        output.parameters.issueDate = input.data.criteria.issueDate;
    }

    if (input.data.criteria.issueDateFrom) {
        output.parameters.issueDateFrom = input.data.criteria.issueDateFrom;
    }

    if (input.data.criteria.issueDateTo) {
        output.parameters.issueDateTo = input.data.criteria.issueDateTo;
    }

    if (input.data.criteria.partnerBusinessCode) {
        output.parameters.partnerBusinessCode = input.data.criteria.partnerBusinessCode;
    }

    if (input.data.criteria.version) {
        output.parameters.version = input.data.criteria.version;
    }

    if (input.data.criteria.productDescription) {
        output.parameters.productDescription = input.data.criteria.productDescription;
    }

    output.sort = output.sort || {};
    output.sort['DESCRIPTION'] = 'asc';

    return output;
};
