'use strict';

const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');

module.exports = function mapping(input) {

    const recipients = getValue(input, "canellationRecipients", []);

    const partyCodes = recipients.map(item => item.partyCode);

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
