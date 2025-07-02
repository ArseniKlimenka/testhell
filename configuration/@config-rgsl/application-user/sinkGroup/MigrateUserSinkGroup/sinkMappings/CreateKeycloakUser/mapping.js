"use strict";

module.exports = function mapping(input, sinkExchange) {

    const adInsureUser = sinkExchange.resolveContext('adInsureUser');
    if (adInsureUser.ExternalId) {
        return;
    }

    const requestData = sinkExchange.resolveContext('keycloakUser');

    const output = {
        payload: requestData
    };

    return output;
};
