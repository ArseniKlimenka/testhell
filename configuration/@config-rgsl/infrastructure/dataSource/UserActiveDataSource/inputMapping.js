'use strict';

module.exports = function (input) {

    const output = {
        parameters: {
            employeeCode: undefined,
            partyCode: undefined,
            isUserActive: undefined,
            showDuplicates: undefined
        }
    };

    const criteria = input.data.criteria;

    if (criteria.employeeCode) {
        output.parameters.employeeCode = criteria.employeeCode;
    }

    if (criteria.partyCode) {
        output.parameters.partyCode = criteria.partyCode;
    }

    if (criteria.isUserActive) {
        output.parameters.isUserActive = criteria.isUserActive;
    }

    if (criteria.showDuplicates) {
        output.parameters.showDuplicates = criteria.showDuplicates;
    }

    return output;

};
