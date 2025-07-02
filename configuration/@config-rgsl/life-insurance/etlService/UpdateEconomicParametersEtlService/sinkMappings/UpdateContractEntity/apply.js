'use strict';

module.exports = function apply(sinkResult, sinkInput, sinkExchange, additionalDataSourcesResults) {

    if (sinkResult) {

        if (!sinkExchange.globalContext.updatedContractEntities) {
            sinkExchange.globalContext.updatedContractEntities = [];
        }

        sinkExchange.globalContext.updatedContractEntities.push({
            contractNumber: sinkResult.body.policy.number,
            universalMasterEntityCode: sinkResult.code
        });
    }
};
