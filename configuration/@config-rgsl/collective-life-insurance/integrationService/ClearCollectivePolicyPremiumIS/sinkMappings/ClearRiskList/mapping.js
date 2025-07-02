'use strict';

module.exports = function mapping(input) {

    const output = {};
    output.contractNumber = input.contractNumber;
    output.isNeedClearSummaryRiskData = input.isNeedClearSummaryRiskData;

    return { request: output };
};
