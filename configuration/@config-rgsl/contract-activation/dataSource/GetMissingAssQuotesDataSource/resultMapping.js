'use strict';

module.exports = function resultMapping(input) {

    const output = {
        contractNumber: input.CONTRACT_NUMBER,
        configurationName: input.CONFIGURATION_NAME
    };

    return output;
};
