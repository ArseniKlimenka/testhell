'use strict';

const constants = require('@config-rgsl/life-insurance/lib/sendEventConstant');
const { createSendEventRecords } = require('@config-rgsl/life-insurance/lib/sendEventHelper');

module.exports = function mapping(sinkInput, sinkExchange) {

    const contractTechnicalInformation = {
        apiSender: sinkExchange.apiSender,
        creatorUsername: sinkExchange.creatorUsername
    };

    const requestData = getRequestData(sinkInput, this);
    const records = createSendEventRecords(requestData, sinkExchange.configurations, contractTechnicalInformation);

    return {
        'BFX_IMPL.SEND_EVENT': records
    };
};

function getRequestData(sinkInput, self) {

    const request = {
        eventType: constants.eventType.ModifyDocsStatus,
        documentNumber: sinkInput.number,
        recId: sinkInput.body.number,
        environmentVariables: self.environmentVariables
    };

    return request;
}
