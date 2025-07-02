'use strict';

const { LocalDateTime } = require('@js-joda/core');
const KPKHelper = require("@config-rgsl/party/lib/KPKHelper");
const constants = require('@config-rgsl/life-insurance/lib/sendEventConstant');
const { createSendEventRecords } = require('@config-rgsl/life-insurance/lib/sendEventHelper');

module.exports = function mapping(sinkInput, sinkExchange) {

    const body = sinkExchange.party.body;
    const partyPersonData = body.partyPersonData;
    const partyOrganisationData = body.partyOrganisationData;
    const partyFullName = partyPersonData ?
        (`${partyPersonData?.lastName} ${partyPersonData?.firstName} ${(partyPersonData?.middleName ? (` ${partyPersonData?.middleName}`) : "")}`) :
        partyOrganisationData.fullOrgName;

    const document = {
        role: "Клиент",
        entityId: sinkExchange.party.partyId,
        DocumentNumber: sinkExchange.holderCode,
        Representation: `Контрагент ${sinkExchange.holderCode}`,
        fullName: partyFullName,
        partyId: sinkExchange.party.partyId
    };

    const contractTechnicalInformation = {
        apiSender: null,
        creatorUsername: null
    };

    const records = [];
    sinkInput.allocationIds.forEach((id) => {

        const additionalData = {
            contractNumber: sinkInput.contractNumber,
            allocationId: id,
            holderCode: sinkExchange.holderCode
        };

        const requestData = getRequestData(body, document, sinkInput, additionalData, this);

        records.push(createSendEventRecords(requestData, sinkExchange.configurations, contractTechnicalInformation)[0]);
    });

    return {
        'BFX_IMPL.SEND_EVENT': records
    };
};

function getRequestData(partyBody, document, sinkInput, additionalData, self) {

    const request = {

        data: KPKHelper.prepareGetContractsRequestData(partyBody, document)
    };

    const requestData = {
        eventType: constants.eventType.AllocationFinished,
        documentNumber: sinkInput.contractNumber,
        policyHolderType: partyBody.policyHolder?.partyData.partyType,
        productGroup: partyBody.mainInsuranceConditions?.insuranceProduct.productGroup,
        environmentVariables: self.environmentVariables,
        requestBody: request,
        additionalData: JSON.stringify(additionalData)
    };

    return requestData;
}
