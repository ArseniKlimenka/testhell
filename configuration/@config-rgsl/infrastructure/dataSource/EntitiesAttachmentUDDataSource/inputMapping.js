'use strict';

module.exports = function (input) {

    const output = {
        parameters: {
            universalDocumentNumber: undefined
        }
    };

    if (input.data && input.data.criteria && input.data.criteria.universalDocumentNumber) {
        output.parameters.universalDocumentNumber = input.data.criteria.universalDocumentNumber;
    }

    if (!output.parameters.universalDocumentNumber) {
        throw 'No criteria provided!';
    }

    return output;

};
