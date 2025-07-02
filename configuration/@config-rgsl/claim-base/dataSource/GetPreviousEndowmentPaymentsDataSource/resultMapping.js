'use strict';

module.exports = function resultMapping(input) {

    const output = {};

    output.partyCode = input.PARTY_CODE;
    output.partyFullName = input.FULL_NAME;
    output.sumDocCurrency = input.SUM_DOC;
    output.sumRubCurrency = input.SUM_RUB;
    return output;
};
