'use strict';

module.exports = function mapping(input) {

    const output = {};
    output.contractNumber = this.businessContext.etlServiceInput.contractNumber;

    return { request: output };
};
