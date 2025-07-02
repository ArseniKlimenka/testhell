'use strict';

const { businessRules } = require('@adinsure/runtime');
const { product, ePolicyReprintPrintoutType } = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');

module.exports = function mapping(sinkInput, sinkExchange) {

    const contractId = sinkExchange.resolveContext('contractId');
    const productCode = sinkExchange.resolveContext('productCode');
    const issueDate = sinkExchange.resolveContext('issueDate');
    const isEBMGRETVTB = [product.EBMGRETVTB, product.EBMGNRETVTB].includes(productCode);

    const fileId = sinkExchange.resolveContext('contractAttachmentFileId');
    const shouldSignAttachment = sinkExchange.resolveContext('shouldSignAttachment');
    const signedContractAttachmentId = sinkExchange.resolveContext('signedContractAttachmentId');
    const documentStateCode = sinkExchange.resolveContext('documentStateCode');
    const isActive = documentStateCode == 'Active';
    const issueFormCode = sinkExchange.resolveContext('issueFormCode');
    const isEPolicy = issueFormCode == 'ePolicy';

    if (!isActive) {
        return;
    }

    if (!isEPolicy) {
        return;
    }

    if (!fileId || !shouldSignAttachment || signedContractAttachmentId) {

        return;
    }

    const ePolicytConfiguration = businessRules.getRuleByVersion('EPolicytConfigurationRule', 1).rule;
    const conf = ePolicytConfiguration({ productCode, issueDate }).result;
    const printoutType = conf.policyPrintout;

    const reprintType = ePolicyReprintPrintoutType.includes(printoutType);
    if (!reprintType) {
        return;
    }

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
