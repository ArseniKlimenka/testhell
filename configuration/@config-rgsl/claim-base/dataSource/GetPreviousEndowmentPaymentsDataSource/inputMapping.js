'use strict';

module.exports = function (input) {

    const output = {
        parameters: {
            contractNumber: undefined,
            currentEndowmentNumber: undefined
        }
    };

    if (input.data && input.data.criteria && input.data.criteria.contractNumber) {

        output.parameters.contractNumber = input.data.criteria.contractNumber;
    }

    if (input.data && input.data.criteria && input.data.criteria.currentEndowmentNumber) {

        output.parameters.currentEndowmentNumber = input.data.criteria.currentEndowmentNumber;
    }

    if (!output.parameters.contractNumber) {

        throw 'No criteria provided!';
    }

    return output;
};
