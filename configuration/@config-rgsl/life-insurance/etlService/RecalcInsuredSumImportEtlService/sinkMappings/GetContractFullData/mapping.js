'use strict';

module.exports = function mapping(input, sinkExchange) {

    return {
        input: {
            data: {
                criteria: {
                    contractNumber: input.data.contractNumber
                }
            }
        }
    };

};
