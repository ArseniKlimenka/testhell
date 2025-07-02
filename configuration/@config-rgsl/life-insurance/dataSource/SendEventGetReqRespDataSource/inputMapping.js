'use strict';

module.exports = function (input) {

    const output = {};
    output.parameters = {};

    const criteria = input?.data?.criteria;

    if (!criteria?.eventType
        && (!criteria?.eventTypes || criteria?.eventTypes?.length == 0)
        && (!criteria?.subscribers || criteria?.subscribers?.length == 0)
        && !criteria?.subscriber
        && !criteria?.status
        && !criteria?.needToSend
        && !criteria?.documentNumber
    ) {
        throw 'No criteria provided!';
    }

    output.parameters.eventType = criteria.eventType;
    output.parameters.eventTypes = criteria.eventTypes;
    output.parameters.subscriber = criteria.subscriber;
    output.parameters.subscribers = criteria.subscribers;
    output.parameters.status = criteria.status;
    output.parameters.needToSend = criteria.needToSend;
    output.parameters.documentNumber = criteria.documentNumber;

    return output;
};
