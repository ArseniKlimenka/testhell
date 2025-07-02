'use strict';

module.exports = function (input) {

    const output = {};
    output.parameters = {};

    const criteria = input?.data?.criteria;

    if (!criteria?.eventType && (!criteria?.eventTypes || criteria?.eventTypes?.length == 0)) {
        throw 'No criteria provided!';
    }

    output.parameters.eventType = criteria.eventType;
    output.parameters.eventTypes = criteria.eventTypes;
    output.parameters.subscriber = criteria.subscriber;

    return output;
};
