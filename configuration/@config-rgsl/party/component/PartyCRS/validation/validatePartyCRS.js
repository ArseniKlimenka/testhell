
'use strict';

const partyValidationHelper = require('@config-rgsl/party/lib/partyValidationHelper');

/**
* @errorCode {errorCode} statusCheckDateIsRequired
*/
module.exports = function validatePartyCRS(input, ambientProperties) {

    const validationErrors = [];
    const actor = this.applicationContext.actor;
    if (actor == 'SkipValidationIS') { return []; }

    const body = this.businessContext.rootData;
    const partyGeneralData = body?.partyGeneralData ?? body?.data?.partyGeneralData;

    const isCRSTaxResidenceExists = partyValidationHelper.isCRSTaxResidenceExists(partyGeneralData);

    const statusCheckDate = input?.statusCheckDate;

    if (isCRSTaxResidenceExists) {
        if (!statusCheckDate) {
            validationErrors.push({
                errorCode: "statusCheckDateIsRequired",
                errorDataPath: '/partyCRS/statusCheckDate',
            });
        }
    }

    return validationErrors;

};
