'use strict';

module.exports = function resultMapping(input) {

    const output = {};

    output.code = input.CODE;
    output.description = input.DESCRIPTION;
    output.typeCode = input.TYPE_CODE;

    return output;
};
