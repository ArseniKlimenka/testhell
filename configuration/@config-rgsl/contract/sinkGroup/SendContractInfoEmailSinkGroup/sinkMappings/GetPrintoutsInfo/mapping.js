'use strict';

module.exports = function mapping(sinkInput, sinkExchange) {

    sinkExchange.mapContext('contractId', sinkInput.contractId);
    sinkExchange.mapContext('contractConfName', sinkInput.contractConfName);
    sinkExchange.mapContext('productCode', sinkInput.productCode);
    sinkExchange.mapContext('issueDate', sinkInput.issueDate);
    sinkExchange.mapContext('recipientEmail', sinkInput.recipientAddress);
    sinkExchange.mapContext('shouldSignAttachment', sinkInput.shouldSignAttachment);
    sinkExchange.mapContext('issueFormCode', sinkInput.issueFormCode);
    sinkExchange.mapContext('additionalServices', sinkInput.additionalServices);
    sinkExchange.mapContext('partnerBusinessCode', sinkInput.partnerBusinessCode);
    sinkExchange.mapContext('documentStateCode', sinkInput.documentStateCode);

    return {
        request: {
            configurationName: sinkInput.contractConfName
        }
    };
};
