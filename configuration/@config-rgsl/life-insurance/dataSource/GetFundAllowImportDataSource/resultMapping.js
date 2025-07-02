'use strict';

module.exports = function resultMapping(input) {

    const output = {};

    output.id = input.ID;
    output.code = input.CODE;
    output.description = input.DESCRIPTION;

    return output;
};
