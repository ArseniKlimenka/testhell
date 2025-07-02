'use strict';

module.exports = function mapping(input) {

    const body = this.businessContext.rootData;
    const holder = body.tempTechnicalData.policyParties.holder;
    const insured = body.tempTechnicalData.policyParties.insuredPerson;
    const beneficiaries = body.endowmentBeneficiaries ?? [];

    let partyCodes = [];
    partyCodes.push(holder.personCode);
    partyCodes.push(insured.personCode);

    const beneficiariesCodes = beneficiaries.map(item => item.partyCode);
    partyCodes = partyCodes.concat(beneficiariesCodes);
    partyCodes = Array.from(new Set(partyCodes));

    return {
        data: {
            criteria: {
                partyCodes: partyCodes,
            }
        }
    };
};
