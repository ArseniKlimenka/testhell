'use strict';

module.exports = function mapping(input) {

    const output = {};
    output.contractNumber = input.contractNumber;

    return { request: output };
};
