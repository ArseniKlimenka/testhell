'use strict';

const { setApplicantMappingForClaimMail } = require('@config-rgsl/claim-base/lib/claimPrintoutHelper');

module.exports = function mapping(input, dataSourceResponse) {

    if (dataSourceResponse?.data?.length === 0) {

        return;
    }

    const party = dataSourceResponse.data[0].resultData;
    setApplicantMappingForClaimMail(input, party);
};
