'use strict';

const { productGroup, sportProducts, product } = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');
const { insuranceRulesConfiguration } = require('@config-rgsl/life-insurance/lib/insuranceRulesConfiguration');

module.exports = function mapping(messageContext, sinkExchange) {

    const body = messageContext.body;
    const productGroupCode = body?.productConfiguration?.productGroupCode;
    if (productGroupCode != productGroup.NS.descriptionRU) {
        return;
    }

    if (messageContext.state == "Active") {

        // for translation
        this.applicationContext.locale = "ru-RU";

        const body = messageContext.body;

        const currentProduct = body.mainInsuranceConditions?.insuranceProduct?.productCode;
        if (!sportProducts.includes(currentProduct)) {
            return;
        }

        const partyEmails = body.policyHolder?.partyData?.partyBody?.partyEmails;
        if (!partyEmails || partyEmails?.length < 1) {
            throw "Cannot find email to send notification about sport policy creation.";
        }
        const preferableEmail = partyEmails.find(r => r?.isPreferable == true);
        const emailToSend = preferableEmail ? preferableEmail?.email : partyEmails[0]?.email;
        const attachmentsToSend = [];

        const newContractFileId = sinkExchange.resolveContext('newConstractAttachmentId');
        const existedContractAttachmentId = sinkExchange.resolveContext('existedContractAttachmentId');
        const contractAttachmentId = newContractFileId ?? existedContractAttachmentId;

        if (contractAttachmentId) {

            attachmentsToSend.push({ attachment: { id: contractAttachmentId } });
        }

        const newKidFileId = sinkExchange.resolveContext('newKidAttachmentId');
        const existedKidAttachmentId = sinkExchange.resolveContext('existedKidAttachmentId');
        const kidAttachmentId = newKidFileId ?? existedKidAttachmentId;

        if (kidAttachmentId) {

            attachmentsToSend.push({ attachment: { id: kidAttachmentId } });
        }

        const newInsuranceRulesAttachmentFileId = sinkExchange.resolveContext('newInsuranceRulesAttachmentFileId');
        const existedInsuranceRulesAttachmentId = sinkExchange.resolveContext('existedInsuranceRulesAttachmentId');
        const ruleAttachmentId = newInsuranceRulesAttachmentFileId ?? existedInsuranceRulesAttachmentId;

        if (ruleAttachmentId) {

            attachmentsToSend.push({ attachment: { id: ruleAttachmentId } });
        }

        const contractNumber = messageContext.number;
        const ruleCode = body?.productConfiguration?.ruleCode;
        const ruleConf = insuranceRulesConfiguration({ ruleCode }) || {};
        const ruleDescription = ruleConf.ruleDescription;

        return {
            entityType: messageContext.entityType,
            dataContext: {
                content: {
                    contractNumber: contractNumber,
                    issueDate: body?.basicConditions?.issueDate,
                    ruleDescription: ruleDescription,
                    productDescription: body?.mainInsuranceConditions?.insuranceProduct?.productDescription,
                    isACCIDPC: currentProduct === product.ACCIDPC
                }
            },
            recipients: {
                ContactInformation: [emailToSend]
            },
            attachments: attachmentsToSend
        };
    }
};
