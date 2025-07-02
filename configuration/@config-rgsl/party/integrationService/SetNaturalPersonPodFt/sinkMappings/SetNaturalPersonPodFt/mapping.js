'use strict';

module.exports = function mapping(sinkInput, sinkExchange) {

    const body = sinkExchange.party.body;
    body.partyGeneralData.isPodFt = true;

    return {
        body,
        code: sinkInput.partyCode
    };
};
