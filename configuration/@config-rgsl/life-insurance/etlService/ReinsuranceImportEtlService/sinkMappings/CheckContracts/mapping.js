'use strict';

module.exports = function mapping(input, sinkExchange) {

    const currentRow = sinkExchange.currentRow;

    return {
        input: {
            data: {
                criteria: {
                    contractNumberStrict: currentRow.contractNumber
                }
            }
        }
    };

};
