'use strict';

module.exports = function mapping(input, sinkExchange, additionalDataSourcesResults) {

    const number = sinkExchange.body.contract.number;

    return {
        input: {
            data: {
                criteria: {
                    contractNumber: number
                }
            }
        }
    };
};
