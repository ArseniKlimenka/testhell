'use strict';

const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');

module.exports = function apply(sinkResult, sinkInput, sinkExchange) {

    const data = getValue(sinkResult, 'data');

    if (!data || data.length === 0) {

        return;
    }

    const claim = data.find(item => item.resultData.beneficiaryPartyCode === sinkInput.input.data.criteria.beneficiaryCode);
    sinkExchange.claimData = claim?.resultData;
};
