'use strict';

const { businessRules } = require('@adinsure/runtime');

module.exports = function mapping(sinkResult, sinkExchange) {

    const attachmentId = sinkExchange.resolveContext('contractAttachmentId');
    const contractId = sinkExchange.resolveContext('contractId');
    const productCode = sinkExchange.resolveContext('productCode');
    const issueDate = sinkExchange.resolveContext('issueDate');

    if (attachmentId) {

        return;
    }

    const ePolicytConfiguration = businessRules.getRuleByVersion('EPolicytConfigurationRule', 1).rule;
    const conf = ePolicytConfiguration({ productCode, issueDate }).result;
    const printoutType = conf.policyPrintout;
    const printoutsinfo = sinkExchange.resolveContext('printoutsInfo');
    const info = printoutsinfo.find(p => p.PrintoutName === printoutType);

    if (!info) {

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
