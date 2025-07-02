'use strict';

module.exports = function resultMapping(input) {

    const output = {};

    output.organisationalFormCode = input.CODE;
    output.organisationalFormDesc = input.DESCRIPTION;

    return output;

};
