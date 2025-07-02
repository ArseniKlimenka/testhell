'use strict';

module.exports = function mapInput(input, sinkExchange) {

    const insuredPersonCode = input.insuredPerson?.partyCode;
    const policyHolderCode = input.policyHolder?.partyCode;

    return {
        input: {
            data: {
                criteria: {
                    policyHolderCode,
                    insuredPersonCode
                }
            }
        }
    };

};
