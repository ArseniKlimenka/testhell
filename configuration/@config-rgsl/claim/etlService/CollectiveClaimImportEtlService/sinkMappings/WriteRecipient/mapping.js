'use strict';

module.exports = function mapping(input, sinkExchange, additionalDataSourcesResults) {

    if (!sinkExchange.globalContext.importDocumentNumber) {

        sinkExchange.globalContext.importDocumentNumber = input.importDocumentNumber;
    }

    if (!sinkExchange.globalContext.claimNumber) {

        sinkExchange.globalContext.claimNumber = input.claimNumber;
    }

    if (!sinkExchange.globalContext.claimId) {

        sinkExchange.globalContext.claimId = input.claimId;
    }

    if (!sinkExchange.globalContext.contractNumber) {

        sinkExchange.globalContext.contractNumber = input.contractNumber;
    }

    const claimNumber = sinkExchange.globalContext.claimNumber;
    const contractInsured = additionalDataSourcesResults.CollectivePolicyInsuredDataSource.data.find(i => i.resultData.fullName === input.data.fullName);

    if (!contractInsured) {

        throw 'Insured not found on specified contract';
    }

    const recipientData = {
        claimNumber: claimNumber,
        partyCode: contractInsured.partyCode,
        fullName: input.data.fullName,
        birthDate: input.data.birthDate,
        amount: input.data.amount,
        franchise: input.data.franchise,
        totalAmount: input.data.totalAmount,
        serviceDescription: input.data.serviceDescription,
        serviceProviderName: input.data.serviceProviderName
    };

    const output = {
        request: {
            recipient: recipientData
        }
    };

    return output;
};
