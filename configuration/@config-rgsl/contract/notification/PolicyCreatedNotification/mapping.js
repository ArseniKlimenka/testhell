'use strict';

const { businessRules } = require('@adinsure/runtime');
const contractNotificationHelper = require('@config-rgsl/contract/lib/contractNotificationHelper');
const { product, productGroupArray } = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');

module.exports = function mapping(input) {

    const output = {};

    const { businessNumber, commonBody, configuration } = input;

    const productCode = commonBody.productCode;
    const issueDate = commonBody.issueDate;

    const ePolicytConfiguration = businessRules.getRuleByVersion('EPolicytConfigurationRule', 1).rule;
    const conf = ePolicytConfiguration({ productCode, issueDate }).result;

    let contractAttachmentDescr;

    if (conf.kidPrintout || productGroupArray.REINVEST.includes(productCode) ||
        [product.IBI3BFKO, product.IBI5BFKO, product.IBI3BFKO17, product.IBI5BFKO17, product.IBI3ZENIT17, product.IBI5ZENIT17, product.EBMPFBFKO, product.EBMPYBFKO, product.WCENOAS, product.WCEN3OAS].includes(productCode)
    ) {
        contractAttachmentDescr = 'Проект договора страхования и приложения к нему';
    }
    else {

        contractAttachmentDescr = 'Проект договора страхования и приложения к нему, в том числе памятка к договору страхования жизни';
    }

    const attachmentItems = [];


    if (productGroupArray.REINVEST.includes(productCode)) {
        attachmentItems.push(contractNotificationHelper.getInvApplicationAttachmentlItem());
    }

    const policyAttachment = contractNotificationHelper.getDocAttachmentItem(contractAttachmentDescr);
    const ediAttachment = contractNotificationHelper.getConsentEDIAttachmentlItem();
    attachmentItems.push(policyAttachment);

    if (conf.MemoCBProject) {
        attachmentItems.push(contractNotificationHelper.getMemoCBAttachmentItem());
    }

    if (conf.kidPrintout) {
        attachmentItems.push(contractNotificationHelper.getKIDAttachmentlItem());
    }

    attachmentItems.push(ediAttachment);

    const attachmentSection = contractNotificationHelper.joinAttachmentItems(attachmentItems);

    output.attachmentsContent = attachmentSection;
    const isIDGZENIT = productGroupArray.IDG_ZENIT.includes(productCode);
    output.isIDGZENIT = isIDGZENIT;

    return output;
};
