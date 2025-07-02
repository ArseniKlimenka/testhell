'use strict';

module.exports = function mapping(input) {

    const output = {
        input: {
            data: {
                criteria: {
                    beneficiaryCode: input.recipientPartyCode,
                    contractNumber: input.contractNumber,
                    onlyPaid: true
                }
            },
            paging: {
                page: 0,
                pageSize: 15
            }
        }
    };

    return output;
};
