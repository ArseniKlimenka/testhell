'use strict';

module.exports = function mapping(input, sinkExchange) {

    const relationInfo = sinkExchange.resolveContext('relationInfo');
    if (relationInfo.mainStateCode !== 'Activated') {
        return {
            input: {
                data: {
                    criteria: {
                        contractNumberStrict: input.contractNumber,
                    }
                }
            }
        };
    }
};
