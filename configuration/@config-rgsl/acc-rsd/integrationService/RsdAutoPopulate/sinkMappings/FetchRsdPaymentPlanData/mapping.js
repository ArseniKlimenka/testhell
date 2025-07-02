'use strict';

module.exports = function mapping(sinkInput, sinkExchange) {
    const rsd = sinkExchange.resolveContext('rsd');

    return {
        input: {
            data: {
                criteria: {
                    takeLatest: sinkInput.takeLatest,
                    contractNumber: sinkInput.contractNumber,
                    onDate: sinkInput.onDate ?? rsd.createdDate,
                }
            }
        }
    };
};
