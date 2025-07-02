"use strict";

module.exports = function dataSourceInputMapping(sinkInput, sinkExchange, additionalDataSourcesData) {

    return {
        data: {
            criteria: {
                claimNumber: sinkInput.claimNumber,
                claimId: sinkInput.claimId,
                contractNumber: sinkInput.contractNumber
            }
        }
    };
};
