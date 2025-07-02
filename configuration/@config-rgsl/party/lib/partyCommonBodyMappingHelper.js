const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');

module.exports = {

    /**
     * @desc party common body mapping
     * @param {object} commonBody party common body
     * @param {object} body party body
     */
    mapCommonBody: function (commonBody, body) {

        // natural person
        const dateOfBirth = getValue(body, 'partyPersonData.dateOfBirth');
        const lastName = getValue(body, 'partyPersonData.lastName');
        const firstName = getValue(body, 'partyPersonData.firstName');
        const middleName = getValue(body, 'partyPersonData.middleName');
        const personGender = getValue(body, 'partyPersonData.personGender');
        const soleProprietorHistory = getValue(body, 'partyPersonData.soleProprietorHistory', []);
        const duplicateMasterNumber = getValue(body, 'partyGeneralData.duplicateMasterNumber');

        // legal entity
        const fullOrgName = getValue(body, 'partyOrganisationData.fullOrgName');
        const shortOrgName = getValue(body, 'partyOrganisationData.shortOrgName');
        const partyOGRN = getValue(body, 'partyOrganisationData.partyOGRN', {});
        const KPP = getValue(body, 'partyOrganisationData.KPP');

        // common
        const fullName = fullOrgName ? fullOrgName : (lastName + ' ' + firstName + (middleName ? (' ' + middleName) : ''));
        let OGRNOGRNIP;

        if (soleProprietorHistory.length > 0) {

            const soleProprietorHistoryLast = soleProprietorHistory
                .filter(item => {

                    return item.partyOGRN && item.partyOGRN.OGRNOGRNIP && !item.partyOGRN.dateOfRecordingTermination;
                });

            if (soleProprietorHistoryLast.length > 0) {

                OGRNOGRNIP = soleProprietorHistoryLast[0].partyOGRN.OGRNOGRNIP;
            }
        }
        else {

            OGRNOGRNIP = partyOGRN.OGRNOGRNIP;
        }

        const bankAccounts = getValue(body, 'partyBankAccounts', []).map(item => { return { accountNumber: item.number }; });
        const INNKIO = getValue(body, 'partyGeneralData.INNKIO');
        const isNonResident = getValue(body, 'partyGeneralData.isNonResident');
        const nonResidentCode = getValue(body, 'partyGeneralData.nonResidentCode');

        // migration
        const isMigrated = getValue(body, 'partyMigrationAttributes.isMigrated', false);
        const addressNumberSAPAliceR = getValue(body, 'partyMigrationAttributes.addressNumberSAPAliceR');
        const addressNumberSAPAliceF = getValue(body, 'partyMigrationAttributes.addressNumberSAPAliceF');
        const addressNumberSAPAliceP = getValue(body, 'partyMigrationAttributes.addressNumberSAPAliceP');
        const partnerNumberSAPAlice = getValue(body, 'partyMigrationAttributes.partnerNumberSAPAlice');

        // fill
        commonBody.fullName = fullName;
        commonBody.dateOfBirth = dateOfBirth;
        commonBody.lastName = lastName;
        commonBody.firstName = firstName;
        commonBody.attributes = {
            middleName: middleName,
            personGender: personGender,
            fullOrgName: fullOrgName,
            shortOrgName: shortOrgName,
            OGRNOGRNIP: OGRNOGRNIP,
            INNKIO: INNKIO,
            KPP: KPP,
            isNonResident: isNonResident,
            nonResidentCode,
            isMigrated,
            addressNumberSAPAliceR,
            addressNumberSAPAliceF,
            addressNumberSAPAliceP,
            partnerNumberSAPAlice,
            duplicateMasterNumber: duplicateMasterNumber
        };
        commonBody.bankAccounts = bankAccounts;

    },

    /**
     * @desc party common body mapping for sole proprietor and natural person
     * @param {object} commonBody party common body
     * @param {object} body party body
     */
    mapCommonBodySPAndNP: function (commonBody, body) {

        const identityDocuments = getValue(body, 'partyDocuments', []).map(item => {
            return {
                identityDocumentType: item.docType.docTypeCode,
                documentSeries: item.docSeries,
                documentNumber: item.docNumber
            };
        });
        commonBody.identityDocuments = identityDocuments;

    }

};
