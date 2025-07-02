'use strict';

module.exports = function resultMapping(input) {

    const output = {};

    output.code = input.CODE;
    output.description = input.DESCRIPTION;
    output.parentCode = input.PARENT_CODE;
    output.fullTextResult = input.FULL_TEXT_RESULT;

    return output;
};
