'use strict';

const {
    getDataMappingForRequestToClientMail
} = require('@config-rgsl/claim-base/lib/claimPrintoutHelper');

module.exports = function mapping(input) {

    const claimNumber = this.businessContext.documentNumber;
    const claimState = this.businessContext.documentState;

    return getDataMappingForRequestToClientMail(input, claimNumber, claimState);
};
