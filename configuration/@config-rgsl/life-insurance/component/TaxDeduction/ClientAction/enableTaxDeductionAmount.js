'use strict';

const amendmentConstants = require('@config-rgsl/life-insurance/lib/amendmentConstants');

module.exports = function enableTaxDeductionAmount(input) {

    const isClaimed = input.rowContext.isClaimed;
    const hasCertificate = input.rowContext.hasCertificate;

    if (isClaimed === amendmentConstants.isTaxDeductionClaimedValues.no ||
        isClaimed === amendmentConstants.isTaxDeductionClaimedValues.noInfo ||
        isClaimed === amendmentConstants.isTaxDeductionClaimedValues.thirdParty ||
        !isClaimed ||
        !hasCertificate) {

        return false;
    }


    return true;

};
