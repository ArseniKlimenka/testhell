'use strict';

module.exports = function (input) {

    const output = {};
    output.parameters = {};
    output.parameters.version = null;
    output.parameters.maxVersion = null;
    output.parameters.importDocumentId = null;
    output.parameters.productCode = null;
    output.parameters.issueDate = null;
    output.parameters.issueDateFrom = null;
    output.parameters.issueDateTo = null;

    const criteria = input.data.criteria;

    if (criteria.maxVersion) {
        output.parameters.maxVersion = criteria.maxVersion;
    }

    if (criteria.importDocumentId) {
        output.parameters.importDocumentId = criteria.importDocumentId;
    }

    if (criteria.productCode) {
        output.parameters.productCode = criteria.productCode;
    }

    if (criteria.issueDate) {
        output.parameters.issueDate = criteria.issueDate;
    }

    if (criteria.issueDateFrom) {
        output.parameters.issueDateFrom = criteria.issueDateFrom;
    }

    if (criteria.issueDateTo) {
        output.parameters.issueDateTo = criteria.issueDateTo;
    }

    if (criteria.partnerBusinessCode) {
        output.parameters.partnerBusinessCode = criteria.partnerBusinessCode;
    }

    if (criteria.version) {
        output.parameters.version = criteria.version;
    }

    if (criteria.productDescription) {
        output.parameters.productDescription = criteria.productDescription;
    }

    output.sort = {
        EXCEL_ROW_NUMBER: 'asc'
    };

    return output;
};
