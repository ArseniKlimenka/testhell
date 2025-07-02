'use strict';

module.exports = function mapInput(input, sinkExchange) {

    const currentDate = input.currentDate;
    const insuredPersonCode = input.insuredPerson?.partyCode;
    const policyHolderCode = input.policyHolder?.partyCode;
    const contractNumbers = sinkExchange.cumulationPolicies;

    return {
        input: {
            data: {
                criteria: {
                    currentDate,
                    policyHolderCode,
                    insuredPersonCode,
                    contractNumbers
                }
            }
        }
    };
};
