'use strict';

module.exports = function isBeneficiaryLookupEnabled(input) {

    const reason = input.rowContext?.beneficiaryReason?.code;
    return !!reason;
};
