'use strict';

module.exports = function mapping(input, sinkExchange) {

    const output = {
        input: {
            data: {
                criteria: {
                    code: sinkExchange.claimData?.riskCode ?? 'None'
                }
            }
        }
    };

    return output;
};
