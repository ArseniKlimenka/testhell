'use strict';

module.exports = function mapping(lineInput, sinkExchange) {

    const output = {
        input: {
            data: {
                criteria: {
                    code: sinkExchange.productCode
                }
            }
        }
    };

    return output;
};
