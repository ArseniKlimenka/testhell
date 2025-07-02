
'use strict';

const partyValidationHelper = require('@config-rgsl/party/lib/partyValidationHelper');

/**
* @errorCode {errorCode} confirmationDateIsRequired
* @errorCode {errorCode} residenceStatusCheckDateIsRequired
*/
module.exports = function validatePartyFatca(input, ambientProperties) {

    const validationErrors = [];
    const actor = this.applicationContext.actor;
    if (actor == 'SkipValidationIS') { return validationErrors; }

    const body = this.businessContext.rootData;
    const partyGeneralData = body?.partyGeneralData ?? body?.data?.partyGeneralData;

    const isFATCATaxResidenceExists = partyValidationHelper.isFATCATaxResidenceExists(partyGeneralData);

    const confirmationDate = input?.confirmationDate;
    const statusCheckDate = input?.statusCheckDate;
    const skipForMigratedByAPI = partyValidationHelper.isSkipForMigratedByAPI(body, this);

    if (isFATCATaxResidenceExists) {
        if (!confirmationDate && !skipForMigratedByAPI) {
            validationErrors.push({
                errorCode: "confirmationDateIsRequired",
                errorDataPath: '/partyFatca/confirmationDate',
            });
        }
        if (!statusCheckDate) {
            validationErrors.push({
                errorCode: "residenceStatusCheckDateIsRequired",
                errorDataPath: '/partyFatca/statusCheckDate',
            });
        }
    }

    return validationErrors;

};
