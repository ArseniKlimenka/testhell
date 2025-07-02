'use strict';

const { getDataMappingForRejectionMail } = require('@config-rgsl/claim-base/lib/claimPrintoutHelper');

module.exports = function mapping(input) {

    const claimNumber = this.businessContext.documentNumber;
    const claimState = this.businessContext.documentState;

    return getDataMappingForRejectionMail(input, claimNumber, claimState);
};
