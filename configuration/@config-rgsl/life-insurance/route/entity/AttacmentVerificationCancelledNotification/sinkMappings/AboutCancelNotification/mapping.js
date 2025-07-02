'use strict';

const uriBuilder = require("@config-rgsl/infrastructure/lib/UriBuilder");
const { vtpProductCodesForNotification } = require('@config-rgsl/contract/lib/contractNotificationHelper');

module.exports = function mapping(messageContext, sinkExchange) {

    const currentProduct = sinkExchange.body.mainInsuranceConditions.insuranceProduct.productCode;

    if (vtpProductCodesForNotification.includes(currentProduct)) {

        // for translation
        this.applicationContext.locale = "ru-RU";

        const clientBaseUrl = this.environmentVariables.clientBaseUrl;

        const contractConfigurationName = sinkExchange.configurationName;
        const contractNumber = sinkExchange.contractNumber;
        const contractCconfigurationVersion = 1;
        const contractUri = clientBaseUrl + '/' + uriBuilder.getContractUri(contractConfigurationName, contractCconfigurationVersion, contractNumber);

        const attachmentConfigurationName = messageContext.configurationCodeName;
        const attachmentNumber = messageContext.number;
        const attachmentUri = clientBaseUrl + '/' + uriBuilder.getUniverslaDocumentUri(attachmentNumber, attachmentConfigurationName);

        const policyHolderFullName = sinkExchange.body.policyHolder.partyData.partyFullName;
        const insuredPersonFullName = sinkExchange.body.insuredPerson.partyData.partyFullName;

        const attachmentErrors = messageContext.body.attachmentErrorArray
            ?.map(error => error.attachmentErrorDescriptionShort + ": " + error.attachmentErrorDescriptionFull + ".")
            ?.join("<br>");

        const attachmentErrorComment = messageContext.body.attachmentErrorComment;
        const userActualEmail = sinkExchange.initiator.actualEmail;

        return {
            entityType: messageContext.entityType,
            dataContext: {
                content: {
                    contractNumber: contractNumber,
                    contractUri: contractUri,
                    attachmentNumber: attachmentNumber,
                    attachmentUri: attachmentUri,
                    policyHolderFullName: policyHolderFullName,
                    insuredPersonFullName: insuredPersonFullName,
                    errorComment: attachmentErrorComment,
                    errors: attachmentErrors
                }
            },
            recipients: {
                ContactInformation: [userActualEmail]
            }
        };
    }
};

