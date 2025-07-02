'use strict';

module.exports = function (input) {

    const output = {};
    output.parameters = {};
    output.parameters.ruleNumber = null;
    output.parameters.ruleCode = null;
    output.parameters.ruleDescription = null;
    output.parameters.ruleDate = null;
    output.parameters.ruleLink = null;
    const criteria = input.data.criteria;

    if (criteria.maxVersion) {
        output.parameters.maxVersion = criteria.maxVersion;
    }

    if (criteria.ruleNumber) {
        output.parameters.ruleNumber = criteria.ruleNumber;
    }

    if (criteria.ruleCode) {
        output.parameters.ruleCode = criteria.ruleCode;
    }

    if (criteria.ruleDescription) {
        output.parameters.ruleDescription = criteria.ruleDescription;
    }

    if (criteria.ruleDate) {
        output.parameters.ruleDate = criteria.ruleDate;
    }

    if (criteria.ruleLink) {
        output.parameters.ruleLink = criteria.ruleLink;
    }

    output.sort = {
        EXCEL_ROW_NUMBER: 'asc'
    };

    return output;
};
