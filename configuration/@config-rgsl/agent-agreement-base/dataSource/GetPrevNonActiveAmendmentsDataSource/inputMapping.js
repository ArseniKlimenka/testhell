'use strict';

module.exports = function (input) {

    const output = {};

    output.parameters = {};
    output.parameters.originalAaNumber = undefined;
    output.parameters.currentAmendmentNumber = undefined;

    if (input.data.criteria.originalAaNumber) {

        output.parameters.originalAaNumber = input.data.criteria.originalAaNumber;
    }

    if (input.data.criteria.currentAmendmentNumber) {

        output.parameters.currentAmendmentNumber = input.data.criteria.currentAmendmentNumber;
    }

    if (!output.parameters.originalAaNumber || !output.parameters.currentAmendmentNumber) {

        throw 'No criteria provided!';
    }

    return output;
};
