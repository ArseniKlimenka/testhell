'use strict';

const { productGroupArray } = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');

module.exports = function mapping(sinkResult, sinkExchange) {

    const documentStateCode = sinkExchange.resolveContext('documentStateCode');
    const isActive = documentStateCode == 'Active';

    if (!isActive) {

        return;
    }

    const InvApplicationSignedAttachmentId = sinkExchange.resolveContext('InvApplicationSignedAttachmentId');
    const productCode = sinkExchange.resolveContext('productCode');
    const isInvReinvest = productGroupArray.REINVEST.includes(productCode);

    if (InvApplicationSignedAttachmentId || !isInvReinvest) {

        return;
    }

    const contractId = sinkExchange.resolveContext('contractId');
    const issueDate = sinkExchange.resolveContext('issueDate');
    const productConf = sinkExchange.productConfiguration ?? {};
    const applicationPrintout = productConf.applicationPrintout;
    const printoutsinfo = sinkExchange.resolveContext('printoutsInfo');
    const info = printoutsinfo.find(p => p.PrintoutName === applicationPrintout);

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
