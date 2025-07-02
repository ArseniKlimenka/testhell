'use strict';

module.exports = function resultMapping(input) {

    const output = {};

    output.description = input.DESCRIPTION;
    output.code = input.CODE.toString();

    return output;
};
