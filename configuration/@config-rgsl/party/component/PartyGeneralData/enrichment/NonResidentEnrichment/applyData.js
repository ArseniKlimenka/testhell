'use strict';

const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');

module.exports = function applyData(partyGeneralData) {

    const isNonResident = getValue(partyGeneralData, 'isNonResident');

    if (!isNonResident) {
        partyGeneralData.registrationCountry.countryShortName = "РОССИЯ";
        partyGeneralData.registrationCountry.countryCode = "643";
        partyGeneralData.registrationCountry.countryFullName = "Российская Федерация";
        partyGeneralData.registrationCountry.alfa2 = "RU";
        partyGeneralData.registrationCountry.alfa3 = "RUS";
        partyGeneralData.TIN = undefined;
    }

};
