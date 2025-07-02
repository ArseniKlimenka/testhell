'use strict';

const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');

module.exports = function mapping(input) {

    const beneficiaries = getValue(input, "canellationRecipients", []);

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
