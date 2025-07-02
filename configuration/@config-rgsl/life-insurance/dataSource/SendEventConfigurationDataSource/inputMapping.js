'use strict';

module.exports = function (input) {

    const output = {};
    output.parameters = {};

    const eventType = input?.data?.criteria?.eventType;

    if (!eventType) {
        throw 'No criteria provided!';
    }

    if (eventType) {
        output.parameters.eventType = eventType;
    }

    return output;
};
