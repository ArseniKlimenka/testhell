const { equityLifeInsuranceAmendments } = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');

module.exports = function mapping(sinkInput, sinkExchange) {

    if (!sinkExchange.createdAmendmentNumber || sinkExchange.createdAmendmentConfigurationCodeName !== equityLifeInsuranceAmendments.EquityLifeInsuranceFinChange) {
        return;
    }

    const result = {
        businessNumber: sinkExchange.createdAmendmentNumber
    };

    return result;
};
