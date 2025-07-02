'use strict';

const printoutsConstant = require("@config-rgsl/life-insurance/lib/printoutsConstant");
const { productGroup } = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');

module.exports = function mapping(sinkResult, sinkExchange) {

    const body = sinkResult.body;
    const productGroupCode = body?.productConfiguration?.productGroupCode;
    if (productGroupCode != productGroup.NS.descriptionRU) {
        return;
    }

    const newInsuranceRulesFilesIds = sinkExchange.resolveContext('newInsuranceRulesFileIds');
    const existedInsuranceRulesAttachmentId = sinkExchange.resolveContext('existedInsuranceRulesAttachmentId');

    if ((!newInsuranceRulesFilesIds && newInsuranceRulesFilesIds?.length == 0) ||
        (existedInsuranceRulesAttachmentId && existedInsuranceRulesAttachmentId?.length > 0)) {

        return;
    }

    const contractId = sinkResult.id;

    const InsuranceRulesAttachments = newInsuranceRulesFilesIds?.map(item => {
        return {
            fileId: item.fileId,
            entity: {
                entityId: contractId
            },
            fileName: printoutsConstant.printoutMemoName.InsuranceRulesPrintout,
            attachmentName: printoutsConstant.printoutMemoName.InsuranceRulesPrintout,
        };
    });

    return InsuranceRulesAttachments;
};
