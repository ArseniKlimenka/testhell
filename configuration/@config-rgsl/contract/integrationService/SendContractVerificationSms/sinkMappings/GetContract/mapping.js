'use strict';

module.exports = function mapping(input, sinkExchange) {

    sinkExchange.mapContext('contractNumber', input.contractNumber);

    return {
        input: {
            data: {
                criteria: {
                    contractNumber: input.contractNumber,
                    versionStateWithNull: 'Applied'
                }
            }
        }
    };
};
