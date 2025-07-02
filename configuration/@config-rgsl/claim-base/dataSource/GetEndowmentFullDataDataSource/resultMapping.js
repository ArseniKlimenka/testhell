'use strict';

module.exports = function resultMapping(input) {

    const output = {};

    output.number = input.ENDOWMENT_NUMBER;
    output.body = JSON.parse(input.BODY);

    return output;
};
