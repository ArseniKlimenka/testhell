'use strict';

module.exports = function mapping(input, sinkExchange) {

    const policyData = sinkExchange.resolveContext('policyData');

    if (policyData.dimensions.amendmentType === 'Technical') {
        return {
            contractNumber: input.originalDocumentNumber,
        };
    }
};
