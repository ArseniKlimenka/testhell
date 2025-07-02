'use strict';

const { businessRules } = require('@adinsure/runtime');

module.exports = function mapping(sinkResult, sinkExchange) {

    const kidAttachmentId = sinkExchange.resolveContext('kidAttachmentId');
    const contractId = sinkExchange.resolveContext('contractId');
    const productCode = sinkExchange.resolveContext('productCode');
    const issueDate = sinkExchange.resolveContext('issueDate');
    const ePolicytConfiguration = businessRules.getRuleByVersion('EPolicytConfigurationRule', 1).rule;
    const conf = ePolicytConfiguration({ productCode, issueDate }).result;
    const kidPrintout = conf.kidPrintout;
    const printoutsinfo = sinkExchange.resolveContext('printoutsInfo');
    const info = printoutsinfo.find(p => p.PrintoutName === kidPrintout);

    if (kidAttachmentId || !kidPrintout) {
        return;
    }

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
