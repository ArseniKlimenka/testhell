const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');
const partyValidationHelper = require('@config-rgsl/party/lib/partyValidationHelper');

/**
* @errorCode {errorCode} isEmptyOrganisationalForm
* @errorCode {errorCode} isErrorKPP
* @errorCode {errorCode} soleExecutiveAuthorityIsRequired
* @errorCode {errorCode} commentIsRequired
* @errorCode {errorCode} personRepresentativeIsRequired
*/

module.exports = function validationPartyOrganisationData(input, ambientProperties) {
    const validationErrors = [];

    const actor = this.applicationContext.actor;
    if (actor == 'SkipValidationIS') { return validationErrors; }

    const KPP = getValue(input, 'KPP');
    const isSoleExecutiveAuthority = getValue(input, 'isSoleExecutiveAuthority');
    const soleExecutiveAuthorityCode = getValue(input, 'soleExecutiveAuthority.partyCode');
    const unfulfilledObligationCB = getValue(input, 'unfulfilledObligationCB');
    const unfulfilledObligationCBComment = getValue(input, 'unfulfilledObligationCBComment');
    const licenseRevoked = getValue(input, 'licenseRevoked');
    const licenseRevokedComment = getValue(input, 'licenseRevokedComment');
    const bankruptcyProcedure = getValue(input, 'bankruptcyProcedure');
    const bankruptcyProcedureComment = getValue(input, 'bankruptcyProcedureComment');
    const unfulfilledObligationByGuarantee = getValue(input, 'unfulfilledObligationByGuarantee');
    const unfulfilledObligationByGuaranteeComment = getValue(input, 'unfulfilledObligationByGuaranteeComment');
    const anotherSign = getValue(input, 'anotherSign');
    const anotherSignComment = getValue(input, 'anotherSignComment');
    const isPersonRepresentative = input.isPersonRepresentative;
    const personRepresentativeCode = input.personRepresentative?.partyCode;

    if (KPP && partyValidationHelper.kppValidation(KPP) !== true) {
        validationErrors.push({
            errorCode: "isErrorKPP",
            errorDataPath: '/partyOrganisationData/KPP',
        });
    }

    if (isSoleExecutiveAuthority && !soleExecutiveAuthorityCode) {
        validationErrors.push({
            errorCode: "soleExecutiveAuthorityIsRequired",
            errorDataPath: '/partyOrganisationData/soleExecutiveAuthority/partyFullName',
        });
    }

    if (isPersonRepresentative && !personRepresentativeCode) {
        validationErrors.push({
            errorCode: "personRepresentativeIsRequired",
            errorDataPath: '/partyOrganisationData/personRepresentative/partyFullName',
        });
    }

    if (unfulfilledObligationCB && !unfulfilledObligationCBComment) {
        validationErrors.push({
            errorCode: "commentIsRequired",
            errorDataPath: '/partyOrganisationData/unfulfilledObligationCBComment',
        });
    }

    if (licenseRevoked && !licenseRevokedComment) {
        validationErrors.push({
            errorCode: "commentIsRequired",
            errorDataPath: '/partyOrganisationData/licenseRevokedComment',
        });
    }

    if (bankruptcyProcedure && !bankruptcyProcedureComment) {
        validationErrors.push({
            errorCode: "commentIsRequired",
            errorDataPath: '/partyOrganisationData/bankruptcyProcedureComment',
        });
    }

    if (unfulfilledObligationByGuarantee && !unfulfilledObligationByGuaranteeComment) {
        validationErrors.push({
            errorCode: "commentIsRequired",
            errorDataPath: '/partyOrganisationData/unfulfilledObligationByGuaranteeComment',
        });
    }

    if (anotherSign && !anotherSignComment) {
        validationErrors.push({
            errorCode: "commentIsRequired",
            errorDataPath: '/partyOrganisationData/anotherSignComment',
        });
    }

    return validationErrors;
};
