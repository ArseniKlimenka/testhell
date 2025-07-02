'use strict';

module.exports = function mapping(input, sinkExchange, additionalDataSourcesResults) {

    const body = input.body;
    const contractNumber = body.mainAttributes.contract.number;

    return {
        input: {
            data: {
                criteria: {
                    refDocumentNo: contractNumber
                }
            },
            paging: {
                page: 0,
                pageSize: 15
            }
        }
    };
};
