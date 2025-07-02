'use strict';

module.exports = function (input) {

    const output = {
        parameters: {
            state: input.data.criteria.state,
            partyCode: input.data.criteria.partyCode,
            productCode: input.data.criteria.productCode,
            insuredPersonPartyCode: input.data.criteria.insuredPersonPartyCode,
            startDate: input.data.criteria.startDate,
            endDate: input.data.criteria.endDate,
            currentContractNumber: input.data.criteria.currentContractNumber
        }
    };

    return output;
};
