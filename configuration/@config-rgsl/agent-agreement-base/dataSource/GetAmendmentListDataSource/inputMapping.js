'use strict';

module.exports = function (input) {

    const output = {};

    output.parameters = {};
    output.parameters.originalDocumentId = input.data.criteria.originalDocumentId;

    return output;
};
