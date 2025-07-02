'use strict';

module.exports = function mapping(input, sinkExchange) {

    const contractNumber = input.data.contractNumber;

    if (contractNumber) {

        return {
            input: {
                data: {
                    criteria: {
                        contractNumber: contractNumber
                    }
                }
            }
        };
    }
};
