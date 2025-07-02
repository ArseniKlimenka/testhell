'use strict';

module.exports = function resultMapping(input) {

    const output = {};

    output.phoneTypeCode = input.CODE;
    output.phoneTypeDesc = input.DESCRIPTION;

    return output;

};
