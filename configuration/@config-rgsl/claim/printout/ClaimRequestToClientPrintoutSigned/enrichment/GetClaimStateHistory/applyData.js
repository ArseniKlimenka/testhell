'use strict';

const { setStateMappingForClaimMail } = require('@config-rgsl/claim-base/lib/claimPrintoutHelper');

module.exports = function mapping(input, dataSourceResponse) {

    if (!dataSourceResponse || !dataSourceResponse.data || dataSourceResponse.data.length === 0) {

        return;
    }

    setStateMappingForClaimMail(input, dataSourceResponse);
};
