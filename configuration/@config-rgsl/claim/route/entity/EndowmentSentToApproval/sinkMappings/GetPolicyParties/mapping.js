'use strict';

module.exports = function mapping(input, sinkExchange, additionalDataSourcesResults) {

    const contractNumber = input.body.mainAttributes.contract.number;

    return {
        input: {
            data: {
                criteria: {
                    number: contractNumber,
                    isStrictNumber: true
                }
            },
            paging: {
                page: 0,
                pageSize: 15
            }
        }
    };
};
