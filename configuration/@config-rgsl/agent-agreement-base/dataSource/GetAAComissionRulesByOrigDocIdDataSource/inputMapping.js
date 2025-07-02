'use strict';

module.exports = function (input) {

    const output = {};

    output.parameters = {};
    output.parameters.originDocumentNum = input.data.criteria.originDocumentNum;

    return output;
};
