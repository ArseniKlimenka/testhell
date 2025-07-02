'use strict';

module.exports = function mapping(input, sinkExchange, additionalDataSourcesResults) {

    const body = input.body;
    const holder = sinkExchange.policyParties.holder;
    const insured = sinkExchange.policyParties.insuredPerson;
    const beneficiaries = body.endowmentBeneficiaries || [];

    let partyCodes = [];
    partyCodes.push(holder.personCode);
    partyCodes.push(insured.personCode);

    const beneficiariesCodes = beneficiaries.map(item => item.partyCode);
    partyCodes = partyCodes.concat(beneficiariesCodes);
    partyCodes = Array.from(new Set(partyCodes));

    return {
        input: {
            data: {
                criteria: {
                    partyCodesToInclude: partyCodes
                }
            },
            paging: {
                page: 0,
                pageSize: 15
            }
        }
    };
};
