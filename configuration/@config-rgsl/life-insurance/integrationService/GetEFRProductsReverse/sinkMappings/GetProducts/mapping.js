'use strict';

module.exports = function mapping(input, sinkExchange) {

    return {
        input: {
            data: {
                criteria: {
                    contracts: input.contracts
                }
            }
        }
    };

};
