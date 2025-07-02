'use strict';

const { getRootEndowmentBody } = require('@config-rgsl/claim-base/lib/claimGeneralHelper');

module.exports = function mapping(input, sinkExchange) {
    if (sinkExchange.hasEndowmentRisks) {
        const { body, configurationCodeName, number } = input;
        return getRootEndowmentBody(body, configurationCodeName, number);
    }
};
