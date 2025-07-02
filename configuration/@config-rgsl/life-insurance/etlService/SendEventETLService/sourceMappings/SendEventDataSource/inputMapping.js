'use strict';

module.exports = function mapSinkToDataSource(input) {

    const data = {};
    data.criteria = {};

    if (!input.eventType && (!input.eventTypes || input.eventTypes.length == 0)) {
        throw new Error(`E: Необходимо заполнить eventType или eventTypes.`);
    }

    data.criteria.eventType = input.eventType;
    data.criteria.eventTypes = input.eventTypes;
    data.criteria.subscriber = input.subscriber;

    return { data };
};
