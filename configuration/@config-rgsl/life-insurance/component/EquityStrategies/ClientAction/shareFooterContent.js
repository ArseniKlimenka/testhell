const { round } = require('@config-system/infrastructure/lib/RoundingUtils');

module.exports = function shareFooterContent(input) {

    const body = input.context.Body;

    const equityStrategies = body?.equityStrategies || [];
    const usedShare = round(equityStrategies.reduce((acc, v) => acc += v.share, 0), 4);
    const restOfShare = round(1 - usedShare, 4);

    return {
        restOfShare: restOfShare
    };

};
