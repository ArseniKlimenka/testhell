'use strict';

const DateTimeUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');

module.exports = function resultMapping(input) {

    const output = {};

    output.modificationType = input.MODIFICATION_TYPE;
    output.contractNumber = input.CONTRACT_NUMBER;
    output.configurationName = input.CONFIGURATION_NAME;
    output.originalContractNumber = input.ORIGINAL_CONTRACT_NUMBER;
    output.executedByUser = input.EXECUTED_BY_USER;
    output.executedByParty = input.EXECUTED_BY_PARTY;
    output.executedOn = input.EXECUTED_ON ? DateTimeUtils.formatDate(input.EXECUTED_ON, DateTimeUtils.DateFormats.CALENDAR_TIME) : undefined;

    return output;
};
