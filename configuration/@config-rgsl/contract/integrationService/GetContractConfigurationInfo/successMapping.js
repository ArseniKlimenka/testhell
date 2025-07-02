'use strict';

const { businessRules } = require('@adinsure/runtime');

module.exports = function mapping({input, sinkExchange}) {

    const ePolicytConfiguration = businessRules.getRuleByVersion('EPolicytConfigurationRule', 1).rule;
    const conf = ePolicytConfiguration({ productCode: input.productCode, issueDate: input.atDate }).result;

    const policyPrintoutType = conf.policyPrintout ?? "";
    const memoCBPrintoutType = conf.MemoCBProject ? "MemoCBPPrintout" : "";

    return {
        ePolicyPrintoutName: policyPrintoutType,
        eMemoCBPrintoutName: memoCBPrintoutType
    };
};
