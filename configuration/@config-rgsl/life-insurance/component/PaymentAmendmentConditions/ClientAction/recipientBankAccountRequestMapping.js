'use strict';

const { basicCtDropdownRequestMapping } = require('@config-rgsl/code-tables/lib/GeneralCodeTableHelper');

module.exports = function recipientBankAccountRequestMapping(input) {

    const validFrom = input.rootContext.Body.basicAmendmentConditions.validFrom;

    return {
        data: {
            criteria: {
                partyCode: input.data.partyCode || 'none',
                activeOnly: true,
                tillDate: validFrom
            }
        }
    };
};
