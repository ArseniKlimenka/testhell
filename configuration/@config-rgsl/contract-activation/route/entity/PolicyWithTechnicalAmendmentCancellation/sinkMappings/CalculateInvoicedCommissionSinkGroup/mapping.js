'use strict';

module.exports = function mapping(input, sinkExchange) {

    const affectedContracts = sinkExchange.resolveContext('affectedContracts');

    const chunkSize = 1000;
    const result = [];

    if (affectedContracts) {
        for (let i = 0; i < affectedContracts.length; i += chunkSize) {
            const chunk = affectedContracts.slice(i, i + chunkSize);

            result.push({
                contracts: chunk.map(_ => ({
                    contractNumber: _.contractNumber,
                    repostFromDate: _.affectedDateFrom,
                })),
                premiumEvent: 'cancellation',
            });
        }
    }

    return result;
};
