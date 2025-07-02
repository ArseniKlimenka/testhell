'use strict';

module.exports = function mapping(input, sinkExchange) {

    return {
        input: {
            data: {
                criteria: {
                    contractNumbers: input.contracts.map(_ => _.contractNumber),
                }
            }
        }
    };
};
