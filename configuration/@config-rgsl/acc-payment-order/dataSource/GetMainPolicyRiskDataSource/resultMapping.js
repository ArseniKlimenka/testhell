'use strict';

module.exports = function resultMapping(input) {

    const output = {
        contractNumber: input.CONTRACT_NUMBER,
        mainRiskCode: input.MAIN_RISK_CODE,
    };

    return output;
};
