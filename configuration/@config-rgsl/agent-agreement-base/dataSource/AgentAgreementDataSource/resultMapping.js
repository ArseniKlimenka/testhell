'use strict';

const { nullCheck } = require('@config-rgsl/infrastructure/lib/ObjectUtils');

module.exports = function resultMapping(input) {

    const output = {};

    output.number = nullCheck(input.AGENT_AGREEMENT_NUMBER);
    output.manualNumber = nullCheck(input.MANUAL_NUMBER);
    output.externalNumber = nullCheck(input.EXTERNAL_NUMBER);
    output.mvzNumber = nullCheck(input.MVZ_NUMBER);
    output.conclusionDate = nullCheck(input.CONCLUSION_DATE);
    output.bankAccountNumber = nullCheck(input.BANK_ACCOUNT_NUMBER);
    output.useNds = nullCheck(input.USE_NDS);

    return output;
};
