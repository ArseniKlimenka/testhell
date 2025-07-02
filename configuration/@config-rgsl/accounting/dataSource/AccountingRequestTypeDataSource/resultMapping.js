'use strict';

module.exports = function resultMapping(input) {

    const output = {};

    output.code = input.REQUEST_TYPE_CODE;
    output.description = input.REQUEST_TYPE_DESCRIPTION;

    return output;
};
