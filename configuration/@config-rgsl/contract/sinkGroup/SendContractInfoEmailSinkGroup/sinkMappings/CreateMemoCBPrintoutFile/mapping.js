'use strict';

const { businessRules } = require('@adinsure/runtime');

module.exports = function mapping(sinkResult, sinkExchange) {

    const attachmentId = sinkExchange.resolveContext('memoCBAttachmentId');
    const contractId = sinkExchange.resolveContext('contractId');
    const productCode = sinkExchange.resolveContext('productCode');
    const issueDate = sinkExchange.resolveContext('issueDate');
    const ePolicytConfiguration = businessRules.getRuleByVersion('EPolicytConfigurationRule', 1).rule;
    const conf = ePolicytConfiguration({ productCode, issueDate }).result;

    if (attachmentId || !conf.MemoCBProject) {

        return;
    }

    const printoutsinfo = sinkExchange.resolveContext('printoutsInfo');
    const info = printoutsinfo.find(p => p.PrintoutName === 'MemoCBPPrintout');

    return {
        printoutRelations: [
            {
                codeName: info.AttachmentType,
                mode: 'WriteFile',
            }
        ],
        entity: {
            id: contractId
        }
    };
};
