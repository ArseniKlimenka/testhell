'use strict';

const partyDocumentLib = require('@config-rgsl/party/component/PartyDocument/lib/partyDocumentLib');

/**
 * @errorCode {errorCode} docTypeRequired
 * @errorCode {errorCode} issueDateRequired
 * @errorCode {errorCode} issueDateInFuture
 * @errorCode {errorCode} docSeriesFormatGeneral
 * @errorCode {errorCode} docNumberFormatGeneral
 * @errorCode {errorCode} docSeriesFormatRefugeeCertificate
 * @errorCode {errorCode} docNumberFormatRefugeeCertificate
 * @errorCode {errorCode} docSeriesFormatPassport
 * @errorCode {errorCode} docNumberFormatPassport
 * @errorCode {errorCode} issuerNameRequired
 * @errorCode {errorCode} issuerCodeFormatPassport
 * @errorCode {errorCode} docSeriesFormatMilitaryID
 * @errorCode {errorCode} docNumberFormatMilitaryID
 * @errorCode {errorCode} docSeriesFormatForeignTravelPassport
 * @errorCode {errorCode} docNumberFormatForeignTravelPassport
 * @errorCode {errorCode} docSeriesFormatDriverID
 * @errorCode {errorCode} docNumberFormatDriverID
 * @errorCode {errorCode} docSeriesFormatBirthCertificate
 * @errorCode {errorCode} docNumberFormatBirthCertificate
 * @errorCode {errorCode} issueDateMoreExpireDate
 * @errorCode {errorCode} expireDateLessIssueDate
 * @errorCode {errorCode} otherDocTypeDescIsRequired
 * @errorCode {errorCode} issuerNameShouldBeInCyrillic
 * @errorCode {errorCode} issueDateMoreDateOfBirth
 * @errorCode {errorCode} invalidAgePassport
 * @errorCode {errorCode} invalidAgePassport14
 * @errorCode {errorCode} invalidAgePassport20
 * @errorCode {errorCode} invalidAgePassport45
 */

module.exports = function validatePartyDocument(input) {

    const actor = this.applicationContext.actor;
    if (actor == 'SkipValidationIS') { return []; }

    return partyDocumentLib.documentValidation(input, this);

};
