'use strict';

module.exports = function (input) {

    const output = {
        parameters: {
            endowmentNumber: undefined
        }
    };

    if (input.data && input.data.criteria && input.data.criteria.endowmentNumber) {

        output.parameters.endowmentNumber = input.data.criteria.endowmentNumber;
    }

    if (!output.parameters.endowmentNumber) {

        throw 'No criteria provided!';
    }

    return output;
};
