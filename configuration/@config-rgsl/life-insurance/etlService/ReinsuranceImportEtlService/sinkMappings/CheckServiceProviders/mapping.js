'use strict';

module.exports = function mapping(input, sinkExchange) {

    const currentRow = input.data;
    sinkExchange.currentRow = currentRow;
    sinkExchange.exceptionsByRow = [];

    return {
        input: {
            data: {
                criteria: {
                    partnerCode: currentRow.reinsurerCode?.toString(),
                    configurationCodeName: 'Reinsurer'
                }
            }
        }
    };

};
