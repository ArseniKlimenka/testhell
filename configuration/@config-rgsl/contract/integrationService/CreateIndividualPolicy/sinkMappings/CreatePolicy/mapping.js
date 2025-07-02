"use strict";

module.exports = function mapping(input, sinkExchange) {
    const validationErrors = sinkExchange.resolveContext('validationErrors');
    const configurationName = sinkExchange.resolveContext('configurationName');
    const body = sinkExchange.resolveContext('body');

    if (validationErrors?.length > 0) {
        return;
    }

    const request = [
        {
            configuration: {
                name: configurationName,
                version: '1',
            },
            body: body
        }
    ];

    return request;
};
