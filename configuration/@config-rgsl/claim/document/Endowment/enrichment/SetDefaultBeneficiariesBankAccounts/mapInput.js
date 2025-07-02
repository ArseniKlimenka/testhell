'use strict';

module.exports = function mapping(input) {

    const beneficiaries = input.endowmentBeneficiaries ?? [];
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
