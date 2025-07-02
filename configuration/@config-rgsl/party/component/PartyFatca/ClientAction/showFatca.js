'use strict';

const partyValidationHelper = require('@config-rgsl/party/lib/partyValidationHelper');

module.exports = function showFatca(input, ambientProperties) {

    const body = input.context?.Body;
    const partyGeneralData = body?.partyGeneralData ?? body?.data?.partyGeneralData;

    return partyValidationHelper.isFATCATaxResidenceExists(partyGeneralData);

};
