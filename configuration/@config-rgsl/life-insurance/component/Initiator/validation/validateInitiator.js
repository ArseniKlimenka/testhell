const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');
const { skipForMigrated } = require('@config-rgsl/life-insurance/lib/migrationValidationHelper');

/**
* @errorCode {errorCode} initiatorIsRequired
* @errorCode {errorCode} actualEmailIsEmpty
*/
module.exports = function validateInitiator(input, ambientProperties) {

    const validationErrors = [];
    const dataPath = this.businessContext.dataPath;

    const partyFullName = getValue(input, 'partyFullName');
    const actualEmail = getValue(this, 'businessContext.rootData.initiator.actualEmail');

    const skipMigrated = skipForMigrated(this.businessContext.rootData);
    if (!skipMigrated && !partyFullName) {
        if (actualEmail) {
            validationErrors.push({
                errorCode: "actualEmailIsEmpty",
                reference: {
                    email: actualEmail
                },
                errorDataPath: dataPath + '/partyFullName',
            });
        } else {
            validationErrors.push({
                errorCode: "initiatorIsRequired",
                errorDataPath: dataPath + '/partyFullName',
            });
        }

    }

    return validationErrors;

};
