'use strict';

module.exports = function mapping(input, sinkExchange) {

    const contractNumber = input.data?.documentNumber;
    sinkExchange.currentRow = input.data;

    return {
        input: {
            data: {
                criteria: {
                    contractNumber: contractNumber
                }
            }
        }
    };
};
