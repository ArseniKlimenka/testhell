'use strict';

module.exports = function mapping(sinkInput, sinkExchange) {
    const rsd = sinkExchange.resolveContext('rsd');
    const manualItems = sinkExchange.resolveContext('manualItems');
    const contractNumbers = manualItems.map(_ => _.contractNumber);

    return {
        input: {
            data: {
                criteria: {
                    contractNumbers: contractNumbers,
                    onDate: sinkInput.onDate ?? rsd.createdDate,
                }
            }
        }
    };
};
