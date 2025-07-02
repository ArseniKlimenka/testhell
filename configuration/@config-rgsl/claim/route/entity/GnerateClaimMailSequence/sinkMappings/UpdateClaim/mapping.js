const { round } = require('@config-system/infrastructure/lib/RoundingUtils');

module.exports = function mapping(sinkInput, sinkExchange) {

    sinkInput.body.claimMailSequence = sinkExchange.claimMailSequence;

    return {
        body: sinkInput.body,
        number: sinkInput.number,
    };
};
