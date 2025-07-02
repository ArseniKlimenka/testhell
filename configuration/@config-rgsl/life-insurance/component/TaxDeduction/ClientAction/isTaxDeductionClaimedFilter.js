'use strict';

const amendmentConstants = require('@config-rgsl/life-insurance/lib/amendmentConstants');

module.exports = function isTaxDeductionClaimedFilter(input) {

    const hasCertificate = input.rowContext.hasCertificate;

    let filteredItems = [];

    if (hasCertificate === amendmentConstants.hasTaxDeductionCertificateValues.yes) {

        filteredItems = input.items.filter(item => amendmentConstants.taxDeductionClaimedValuesWithCertificate.includes(item));
    }
    else if (hasCertificate === amendmentConstants.hasTaxDeductionCertificateValues.no) {

        filteredItems = input.items.filter(item => amendmentConstants.taxDeductionClaimedValuesWithoutCertificate.includes(item));
    }

    return filteredItems;
};
