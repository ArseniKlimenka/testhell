'use strict';

const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');
const constants = require('@config-rgsl/life-insurance/lib/sendEventConstant');
const { createSendEventRecords } = require('@config-rgsl/life-insurance/lib/sendEventHelper');

module.exports = function mapping(sinkInput, sinkExchange) {

    const contractTechnicalInformation = {
        apiSender: sinkInput.body.technicalInformation.apiSender,
        creatorUsername: sinkInput.body.technicalInformation.creatorUsername
    };

    const requestData = getRequestData(sinkInput, this);
    const records = createSendEventRecords(requestData, sinkExchange.configurations, contractTechnicalInformation);

    return {
        'BFX_IMPL.SEND_EVENT': records
    };
};

function getRequestData(sinkInput, self) {

    const request = {
        eventType: constants.eventType.PartnerIsPolicyholder,
        productCode: sinkInput.body.mainInsuranceConditions.insuranceProduct.productCode,
        documentNumber: sinkInput.number,
        policyHolderType: getValue(sinkInput, 'body.policyHolder.partyData.partyType'),
        agentAgreementNumber: getValue(sinkInput, 'body.commission.agentAgreement.manualNumber'),
        productGroup: getValue(sinkInput, 'body.mainInsuranceConditions.insuranceProduct.productGroup'),
        recId: sinkInput.body.policyHolder.partyData.partyCode,
        environmentVariables: self.environmentVariables
    };

    return request;
}
