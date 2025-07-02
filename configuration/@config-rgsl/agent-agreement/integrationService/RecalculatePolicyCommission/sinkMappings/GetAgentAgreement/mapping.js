'use strict';

module.exports = function mapping(input, sinkExchange) {

    sinkExchange.mapContext('serviceInput', input);

    if (!input.agentAgreementNumber) {

        return;
    }

    return {
        input: {
            data: {
                criteria: {
                    documentCode: input.agentAgreementNumber,
                }
            }
        }
    };
};

