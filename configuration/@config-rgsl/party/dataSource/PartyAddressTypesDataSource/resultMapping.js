'use strict';

module.exports = function resultMapping(input) {

    const output = {};

    output.addressTypeCode = input.CODE;
    output.addressTypeDesc = input.DESCRIPTION;

    return output;

};
