'use strict';

module.exports = function mapping(sinkInput, sinkExchange) {

    const contractId = sinkExchange.resolveContext('contractId');
    sinkExchange.mapContext('contractId', sinkInput.contractId);
    sinkExchange.mapContext('productCode', sinkInput.productCode);
    sinkExchange.mapContext('issueDate', sinkInput.issueDate);
    sinkExchange.mapContext('recipientEmail', sinkInput.recipientAddress);
    sinkExchange.mapContext('shouldSignAttachment', sinkInput.shouldSignAttachment);
    sinkExchange.mapContext('issueFormCode', sinkInput.issueFormCode);
    sinkExchange.mapContext('additionalServices', sinkInput.additionalServices);
    sinkExchange.mapContext('partnerBusinessCode', sinkInput.partnerBusinessCode);
    sinkExchange.mapContext('documentStateCode', sinkInput.documentStateCode);
    sinkExchange.mapContext('policyHolderFirstName', sinkInput.policyHolderFirstName);
    sinkExchange.mapContext('policyHolderMiddleName', sinkInput.policyHolderMiddleName);
    sinkExchange.mapContext('productDescription', sinkInput.productDescription);
    sinkExchange.mapContext('phoneNumber', sinkInput.phoneNumber);
    sinkExchange.mapContext('contractNumber', sinkInput.contractNumber);
    sinkExchange.mapContext('ruleCode', sinkInput.ruleCode);
    sinkExchange.mapContext('ruleDescription', sinkInput.ruleDescription);

    const attachmentType = 'ePolicy';

    return {
        entityId: contractId,
        attachmentType: attachmentType
    };
};
