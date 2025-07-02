'use strict';

module.exports = function (input) {

    const output = {
        parameters: {}
    };

    if (input.data && input.data.criteria && input.data.criteria.contractNumber) {

        output.parameters.contractNumber = input.data.criteria.contractNumber;
    }

    return output;
};
