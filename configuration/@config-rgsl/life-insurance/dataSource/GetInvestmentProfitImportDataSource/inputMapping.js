'use strict';

module.exports = function (input) {

    const output = {};
    output.parameters = {};
    output.parameters.maxVersion = null;
    output.parameters.importDocumentId = null;
    output.parameters.contractNumber = null;
    output.parameters.contractNumberByMaxVersion = null;

    output.sort = { CONTRACT_NUMBER: 'ASC' };

    const criteria = input.data.criteria;

    if (criteria.maxVersion) {
        output.parameters.maxVersion = criteria.maxVersion;
    }

    if (criteria.importDocumentId) {
        output.parameters.importDocumentId = criteria.importDocumentId;
    }

    if (criteria.contractNumber) {
        output.parameters.contractNumber = criteria.contractNumber;
    }

    if (criteria.contractNumberByMaxVersion) {
        output.parameters.contractNumberByMaxVersion = criteria.contractNumberByMaxVersion;
        output.sort = { LOAD_DATE: 'DESC' };
    }

    return output;
};
