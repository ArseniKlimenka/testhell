'use strict';

module.exports = function (input) {

    const output = {};
    output.parameters = {};

    output.parameters.originDocumentId = input.data.criteria.originDocumentId;

    return output;
};
