'use strict';

module.exports = function (input) {

    const output = {};
    output.parameters = {};
    output.parameters.documentNumber = null;
    output.parameters.listName = null;
    output.parameters.listDate = null;
    output.parameters.documentDate = null;
    output.parameters.partyCodes = null;
    output.parameters.creationDate = null;

    const criteria = input.data.criteria;

    if (criteria.documentNumber) {
        output.parameters.documentNumber = `%${criteria.documentNumber}%`;
    }

    if (criteria.listDate) {
        output.parameters.listDate = criteria.listDate;
    }

    if (criteria.listName) {
        output.parameters.listName = criteria.listName;
    }

    if (criteria.listNames) {
        output.parameters.listNames = criteria.listNames;
    }

    if (criteria.partyCodes) {
        output.parameters.partyCodes = `%${criteria.partyCodes}%`;
    }

    if (criteria.foundCodes) {
        output.parameters.foundCodes = `%${criteria.foundCodes}%`;
    }

    if (criteria.creationDate) {
        output.parameters.creationDate = criteria.creationDate;
    }

    if (criteria.isNotCancelled) {
        output.parameters.isNotCancelled = criteria.isNotCancelled;
    }

    if (criteria.isNotDraft) {
        output.parameters.isNotDraft = criteria.isNotDraft;
    }

    return output;
};
