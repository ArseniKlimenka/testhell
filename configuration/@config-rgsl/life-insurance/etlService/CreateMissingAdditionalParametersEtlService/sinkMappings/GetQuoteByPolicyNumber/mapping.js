'use strict';

module.exports = function mapping(input, sinkExchange) {

    const documentNumber = input.contractNumber;

    return {
        input: {
            data: {
                criteria: {
                    documentNumber: documentNumber
                }
            }
        }
    };
};
