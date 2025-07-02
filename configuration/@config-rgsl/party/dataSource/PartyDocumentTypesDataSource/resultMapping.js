'use strict';

module.exports = function resultMapping(input) {

    const output = {};

    output.docTypeCode = input.CODE;
    output.docTypeDesc = input.DESCRIPTION;
    output.docTypeClass = input.CLASS_CODE;
    output.allowToSalers = !!input.ALLOW_TO_SALERS;

    return output;

};
