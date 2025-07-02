'use strict';

const { businessRules } = require('@adinsure/runtime');

module.exports = function mapping(sinkInput, sinkExchange) {

    const contractId = sinkExchange.resolveContext('contractId');
    const productCode = sinkExchange.resolveContext('productCode');
    const issueDate = sinkExchange.resolveContext('issueDate');
    const ePolicytConfiguration = businessRules.getRuleByVersion('EPolicytConfigurationRule', 1).rule;
    const conf = ePolicytConfiguration({ productCode, issueDate }).result;

    if (!conf.MemoCBProject) {

        return;
    }

    const attachmentType = 'memoCB';

    return {
        entityId: contractId,
        attachmentType: attachmentType
    };
};
