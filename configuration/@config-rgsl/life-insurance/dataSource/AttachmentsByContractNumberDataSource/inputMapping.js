'use strict';

module.exports = function (input) {

    const output = {
        parameters: {
            contractNumber: undefined,
            includePersons: false
        }
    };

    if (input.data && input.data.criteria && input.data.criteria.contractNumber) {

        output.parameters.contractNumber = input.data.criteria.contractNumber;
    }

    if (input.data && input.data.criteria && input.data.criteria.includePersons) {

        output.parameters.includePersons = input.data.criteria.includePersons;
    }

    if (!output.parameters.contractNumber) {

        throw 'No criteria provided!';
    }

    return output;
};
