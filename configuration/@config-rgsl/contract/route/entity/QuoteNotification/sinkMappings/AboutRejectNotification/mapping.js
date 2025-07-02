'use strict';

const uriBuilder = require("@config-rgsl/infrastructure/lib/UriBuilder");
const { vtpProductCodesForNotification } = require('@config-rgsl/contract/lib/contractNotificationHelper');

module.exports = function mapping(messageContext, sinkExchange) {

    const currentProduct = messageContext.body.mainInsuranceConditions?.insuranceProduct?.productCode;

    if (vtpProductCodesForNotification.includes(currentProduct) && messageContext.state == "Rejected") {

        // for translation
        this.applicationContext.locale = "ru-RU";

        const configurationName = messageContext.configurationCodeName;
        const contractNumber = sinkExchange.contractNumber;
        const configurationVersion = 1;
        const clientBaseUrl = this.environmentVariables.clientBaseUrl;
        const contractUri = clientBaseUrl + '/' + uriBuilder.getContractUri(configurationName, configurationVersion, contractNumber);

        const userActualEmail = sinkExchange.initiator.actualEmail;
        const policyHolderFullName = sinkExchange.body.policyHolder.partyData.partyFullName;
        const insuredPersonFullName = sinkExchange.body.insuredPerson.partyData.partyFullName;

        return {
            entityType: messageContext.entityType,
            dataContext: {
                content: {
                    contractNumber: contractNumber,
                    contractUri: contractUri,
                    productGroup: sinkExchange.productGroupDescription,
                    policyHolderFullName: policyHolderFullName,
                    insuredPersonFullName: insuredPersonFullName,
                }
            },
            recipients: {
                ContactInformation: [userActualEmail]
            }
        };
    }
};
