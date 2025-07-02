const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');
const partyValidationHelper = require('@config-rgsl/party/lib/partyValidationHelper');

/**
* @errorCode {errorCode} isEmptyPartnerNumberSAPAlice
* @errorCode {errorCode} isEmptySAPNonResidentCode
* @errorCode {errorCode} isSAPNonResidentCodeNotMasked
* @errorCode {errorCode} isSAPNonResidentCodeExcess
*/

module.exports = function validationPartyGeneralData(input, ambientProperties) {

    const validationErrors = [];

    const actor = this.applicationContext.actor;
    if (actor == 'SkipValidationIS') { return validationErrors; }

    const body = getValue(this, 'businessContext.rootData') || this.view.getContext().Body;
    const isMigrated = input.isMigrated;
    const partnerNumberSAPAlice = input.partnerNumberSAPAlice;
    const SAPNonResidentCode = input.SAPNonResidentCode;
    const isMasked = /^КН\d\d\d\d$/.test(SAPNonResidentCode);
    const isNonResident = getValue(body, 'partyGeneralData.isNonResident');
    const tin = getValue(body, 'partyGeneralData.TIN');

    if (isMigrated && !partnerNumberSAPAlice) {
        validationErrors.push({
            errorCode: "isEmptyPartnerNumberSAPAlice",
            errorDataPath: '/partyMigrationAttributes/isEmptyPartnerNumberSAPAlice'
        });
    }

    /*
    if (isMigrated && isNonResident && !tin && !isMasked) {
        validationErrors.push({
            errorCode: "isEmptySAPNonResidentCode",
            errorDataPath: '/partyMigrationAttributes/SAPNonResidentCode'
        });
    }

    if (isMigrated && isNonResident && tin && SAPNonResidentCode && !isMasked) {
        validationErrors.push({
            errorCode: "isSAPNonResidentCodeNotMasked",
            errorDataPath: '/partyMigrationAttributes/SAPNonResidentCode'
        });
    }

    if (isMigrated && !isNonResident && SAPNonResidentCode) {
        validationErrors.push({
            errorCode: "isSAPNonResidentCodeExcess",
            errorDataPath: '/partyMigrationAttributes/SAPNonResidentCode'
        });
    }
    */

    if (isMigrated && SAPNonResidentCode && !isMasked) {
        validationErrors.push({
            errorCode: "isSAPNonResidentCodeNotMasked",
            errorDataPath: '/partyMigrationAttributes/SAPNonResidentCode'
        });
    }

    return validationErrors;

};
