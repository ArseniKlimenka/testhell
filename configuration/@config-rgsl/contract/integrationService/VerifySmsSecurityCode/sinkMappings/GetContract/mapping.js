'use strict';

module.exports = function mapping(input, sinkExchange) {

    sinkExchange.mapContext('contractNumber', input.contractNumber);
    sinkExchange.mapContext('securityCode', input.securityCode);

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
