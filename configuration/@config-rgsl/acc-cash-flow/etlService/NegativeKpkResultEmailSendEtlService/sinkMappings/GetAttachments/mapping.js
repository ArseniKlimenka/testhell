'use strict';

module.exports = function mapping(lineInput, sinkExchange) {

    return {
        input: {
            data: {
                criteria: {
                    entitiesIds: [`${sinkExchange.partyId}`],
                    documentNumber: sinkExchange.additionalData.contractNumber
                }
            },
            paging: {
                page: 0,
                pageSize: 15
            }
        }
    };
};
