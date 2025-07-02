'use strict';

module.exports = function resultMapping(input) {

    const output = {};

    output.code = input.CODE;
    output.typeCode = input.TYPE_CODE;
    output.description = input.DESCRIPTION;

    return output;
};
