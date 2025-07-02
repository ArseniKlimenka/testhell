'use strict';

const { createSendEventRecords } = require('@config-rgsl/life-insurance/lib/sendEventHelper');

module.exports = function mapping(sinkInput, sinkExchange) {

    const contractTechnicalInformation = {
        apiSender: sinkInput.body.technicalInformation.apiSender,
        creatorUsername: sinkInput.body.technicalInformation.creatorUsername
    };

    const requestData = getRequestData(sinkInput, sinkExchange, this);
    const records = createSendEventRecords(requestData, sinkExchange.configurations, contractTechnicalInformation);

    return {
        'BFX_IMPL.SEND_EVENT': records
    };
};

function getRequestData(sinkInput, sinkExchange, self) {

    const sinkInputBody = sinkInput?.body;
    const documentNumber = sinkInput?.number;
    const startDate = sinkInputBody?.policyTerms?.startDate;
    const endDate = sinkInputBody?.policyTerms?.endDate;
    const sportsmanBookNumber = sinkInputBody?.insuredPerson?.sportsmanBookNumber;
    const sinkPartyData = sinkInputBody?.policyHolder?.partyData;
    const sinkInsuranceProduct = sinkInputBody?.mainInsuranceConditions?.insuranceProduct;
    const currentEventType = sinkExchange?.eventType;

    const request = {
        eventType: currentEventType,
        bookNumber: sportsmanBookNumber,
        beginAt: startDate,
        endAt: endDate,
        externalId: documentNumber,
        productCode: sinkInsuranceProduct?.productCode,
        documentNumber: documentNumber,
        policyHolderType: sinkPartyData?.partyType,
        agentAgreementNumber: sinkInputBody?.commission?.agentAgreement?.manualNumber,
        productGroup: sinkInsuranceProduct?.productGroup,
        recId: sinkPartyData?.partyCode,
        environmentVariables: self?.environmentVariables
    };

    return request;
}
