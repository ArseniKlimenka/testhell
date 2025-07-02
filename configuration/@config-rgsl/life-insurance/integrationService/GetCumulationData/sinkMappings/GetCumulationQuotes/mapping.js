'use strict';

module.exports = function mapInput(input, sinkExchange) {

    sinkExchange.cumulationContracts = [];

    const currentDate = input.currentDate;
    const insuredPersonCode = input.insuredPerson?.partyCode;
    const policyHolderCode = input.policyHolder?.partyCode;
    const contractNumbers = sinkExchange.cumulationQuotes;

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
