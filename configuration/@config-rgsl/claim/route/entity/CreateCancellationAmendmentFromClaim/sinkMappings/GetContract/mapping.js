'use strict';

module.exports = function mapping(input, sinkExchange, additionalDataSourcesResults) {

    const body = input.body;
    const contractNumber = body.mainAttributes.contract.number;

    return {
        input: {
            data: {
                criteria: {
                    contractNumber: contractNumber,
                    versionState: 'Applied'
                }
            }
        }
    };
};
