'use strict';

module.exports = function (input) {

    const output = {};

    output.parameters = {};

    if (input.data.criteria.requestIssuedDateFrom) {
        output.parameters.requestIssuedDateFrom = input.data.criteria.requestIssuedDateFrom;
    }

    if (input.data.criteria.requestIssuedDateTo) {
        output.parameters.requestIssuedDateTo = input.data.criteria.requestIssuedDateTo;
    }

    return output;

};
