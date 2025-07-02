'use strict';

module.exports = function mapping(input, sinkExchange) {

    sinkExchange.mapContext('contractNumber', input.contractNumber);
    sinkExchange.mapContext('shouldSignAttachment', input.shouldSignAttachment);

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
