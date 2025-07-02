'use strict';

const DateTimeUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');

module.exports = function mapping(messageContext, sinkExchange, additionalDataSourcesResults) {

    const cancellationWithoutPayment = additionalDataSourcesResults?.GetDocumentStateHistoryPolicyInfoDataSource?.data;
    if (!cancellationWithoutPayment || cancellationWithoutPayment.length == 0) { return; }

    const daysWithoutPayment = 5;
    const currentDate = new Date().toISOString();
    const cancellationWithoutPaymentMoreThan5Days = cancellationWithoutPayment.
        filter(i => DateTimeUtils.getDayDifference(i.resultData.changedOn, currentDate) > daysWithoutPayment);
    if (cancellationWithoutPaymentMoreThan5Days.length == 0) { return; }

    const contractsData = cancellationWithoutPaymentMoreThan5Days.map(i => {
        return {
            contractNumber: i.resultData.contractNumber,
            holderName: i.resultData.holderName
        };
    });

    const recipientsArray = this.environmentVariables["rgsl.groupEmails.cancellationWithoutPayment"]?.split(';').map(item => item.toLowerCase()) ?? [];

    const output = {
        entityType: "Contract",
        dataContext: {
            content: {
                contractsData: contractsData
            }
        },
        recipients: {
            ContactInformation: recipientsArray
        }
    };

    return output;

};
