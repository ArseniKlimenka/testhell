'use strict';

module.exports = function resultMapping(input) {

    const output = {};

    output.code = input.CODE;
    output.description = input.DESCRIPTION;

    return output;

};
