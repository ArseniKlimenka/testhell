'use strict';

module.exports = function mapping(input, sinkExchange) {

    const output = {
        input: {
            data: {
                criteria: {
                    code: sinkExchange.endowmentData?.riskCode ?? 'None'
                }
            }
        }
    };

    return output;
};
