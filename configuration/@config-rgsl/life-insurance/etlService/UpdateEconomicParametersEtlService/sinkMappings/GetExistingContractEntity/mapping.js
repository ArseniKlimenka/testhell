'use strict';

module.exports = function mapping(input, sinkExchange) {

    const contractNumber = input.contractNumber;

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
