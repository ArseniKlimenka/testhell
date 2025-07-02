'use strict';

module.exports = function resultMapping(input) {

    const output = {};

    output.code = input.RULE_CODE;
    output.description = input.RULE_DESCRIPTION;

    return output;
};
