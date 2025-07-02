'use strict';

const { setPolicyMappingForRejectionMail } = require('@config-rgsl/claim-base/lib/claimPrintoutHelper');

module.exports = function mapping(input, dataSourceResponse) {

    if (!dataSourceResponse || !dataSourceResponse.data || dataSourceResponse.data.length === 0 || dataSourceResponse.data.length > 1) {

        return;
    }

    setPolicyMappingForRejectionMail(input, dataSourceResponse);
};
