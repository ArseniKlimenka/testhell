'use strict';

module.exports = function (input) {

    const output = {};
    output.parameters = {};
    output.parameters.maxVersion = null;
    output.parameters.importDocumentId = null;
    output.parameters.productCode = null;
    output.parameters.strategyCode = null;
    output.parameters.issueDate = null;
    output.parameters.issueDateFrom = null;
    output.parameters.issueDateTo = null;
    output.parameters.insuranceTerms = null;
    output.parameters.currencyCode = null;
    output.parameters.guaranteedIncome = null;
    output.parameters.version = null;

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

    if (criteria.strategyCode) {
        output.parameters.strategyCode = criteria.strategyCode;
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

    if (criteria.insuranceTerms) {
        output.parameters.insuranceTerms = criteria.insuranceTerms;
    }

    if (criteria.currencyCode) {
        output.parameters.currencyCode = criteria.currencyCode;
    }

    if (criteria.guaranteedIncome) {
        output.parameters.guaranteedIncome = criteria.guaranteedIncome;
    }

    if (criteria.version) {
        output.parameters.version = criteria.version;
    }

    output.sort = {
        EXCEL_ROW_NUMBER: 'asc'
    };

    return output;
};
