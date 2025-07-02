'use strict';

module.exports = function mapping(input) {

    const beneficiaries = input.claimBeneficiaries ?? [];
    const partyCodes = beneficiaries.map(item => item.partyCode);

    if (partyCodes.length === 0) {

        return;
    }

    return {
        data: {
            criteria: {
                partyCodes: partyCodes
            }
        }
    };
};
